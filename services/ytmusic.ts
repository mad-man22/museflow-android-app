/**
 * MuseFlow YouTube Music InnerTube Client
 *
 * Architecture mirrors OpenTune's approach:
 * - Direct InnerTube API calls (no CORS proxy — breaks POST body)
 * - Multi-client fallback chain for stream resolution
 * - Dynamic signatureTimestamp fetched from player JS
 * - Deciphering pipeline for cipher-protected clients
 * - Proxy used ONLY for stream URL routing (optional, user-controlled)
 *
 * Client chain ordering (tested against YouTube Music exclusive tracks):
 * 1. MWEB        — Works for music tracks, most audio formats
 * 2. WEB_REMIX   — Works for music tracks, requires sig deciphering
 * 3. ANDROID_VR  — Works for standard YouTube videos, direct URL
 * 4. TVHTML5     — Fallback for non-music YouTube content
 */

import { Parser } from './parser';
import { AuthService } from './auth';
import { Decipherer } from './decipherer';
import { Innertube, Platform } from 'youtubei.js/web';

Platform.shim.eval = async (data: any, env: any) => {
  try {
    // Replace new.target with (new.target || this.constructor) to fix Hermes constructor issues
    let patchedCode = data.output.replace(/new\.target/g, '(new.target || this.constructor)');
    // Name all anonymous class expressions to work around Hermes class parser bugs
    patchedCode = patchedCode.replace(/class\s*\{/g, 'class TempClass {');
    patchedCode = patchedCode.replace(/class\s*extends/g, 'class TempClass extends');
    const fn = new Function('env', patchedCode);
    return fn(env);
  } catch (err: any) {
    console.error('[eval error] stack:', err?.stack || err);
    throw err;
  }
};

let cachedYt: Innertube | null = null;
let cachedCookieString: string | null = null;

async function getInnertube() {
  const cookies = await AuthService.getCookies();
  if (cachedYt && cachedCookieString === cookies) {
    return cachedYt;
  }
  cachedCookieString = cookies;
  cachedYt = await Innertube.create({
    cookie: cookies || undefined,
  });
  return cachedYt;
}
// NOTE: ProxyService is intentionally NOT used for stream URLs.
// YouTube CDN URLs (googlevideo.com) are IP-signed — routing through a
// CORS proxy (different IP) always causes 403 Forbidden.
// If YouTube is blocked in your region, use a VPN at the OS level.

// YouTube InnerTube API key (public, same as YT Music web client)
const API_KEY = 'AIzaSyAO_FJ2yn1Z2W8eP0sZz49E1a8';

// Base URLs
const INNERTUBE_MUSIC_BASE = 'https://music.youtube.com/youtubei/v1';
const INNERTUBE_BASE = 'https://youtubei.googleapis.com/youtubei/v1';

// Chrome 125 UA for browse/search calls
const WEB_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

export interface Track {
  track_id: string;
  title: string;
  artists: string;
  album: string;
  thumbnail: string;
  duration?: number; // seconds
  category?: string;
}

export interface Artist {
  artist_id: string;
  name: string;
  thumbnail: string;
}

export interface Album {
  album_id: string;
  title: string;
  artist: string;
  thumbnail: string;
  year?: string;
  tracks: Track[];
}

export interface ResolvedStream {
  url: string;
  headers?: Record<string, string>;
}

/**
 * Core InnerTube POST caller for browse/search/next endpoints.
 *
 * IMPORTANT: We do NOT route these through a CORS proxy.
 * Direct fetch works fine in React Native (no CORS restriction in native runtime).
 */
async function callInnerTube(
  endpoint: string,
  payload: any,
  clientName = 'WEB_REMIX',
  clientVersion = '1.20260114.01.00'
): Promise<any> {
  const url = `${INNERTUBE_MUSIC_BASE}/${endpoint}?key=${API_KEY}`;

  const body = {
    context: {
      client: {
        clientName,
        clientVersion,
        hl: 'en',
        gl: 'US',
        utcOffsetMinutes: 0,
      },
    },
    ...payload,
  };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': WEB_UA,
    'Referer': 'https://music.youtube.com/',
    'Origin': 'https://music.youtube.com',
    'X-YouTube-Client-Name': '67',
    'X-YouTube-Client-Version': clientVersion,
  };

  // Inject stored user session cookies if authenticated
  const cookies = await AuthService.getCookies();
  if (cookies) {
    headers['Cookie'] = cookies;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`InnerTube HTTP ${res.status} for ${endpoint}`);
  }

  return res.json();
}

// ─── Client Definitions ───────────────────────────────────────────────────────
// Verified by live testing against YouTube Music exclusive tracks:
//
//  MWEB      → OK (6 audio formats) for both music-exclusive and standard YT videos
//  WEB_REMIX → OK (4 audio formats) for both music-exclusive and standard YT videos
//  ANDROID_VR → OK for standard YouTube only; LOGIN_REQUIRED for music-exclusive
//  TVHTML5   → OK for standard YouTube only; LOGIN_REQUIRED for music-exclusive

interface ClientConfig {
  name: string;
  clientName: string;
  clientVersion: string;
  playerHostname: string;
  userAgent: string;
  extraHeaders: Record<string, string>;
  contextExtras?: Record<string, any>;
  needsDecipher: boolean;
  useSts: boolean;
}

const CLIENT_CHAIN: ClientConfig[] = [
  /**
   * MWEB — Mobile web client.
   * Best overall: works for YouTube Music exclusive tracks AND standard YT videos.
   * Returns the most audio formats (6). Uses WEB-style cipher deciphering.
   */
  {
    name: 'MWEB',
    clientName: 'MWEB',
    clientVersion: '2.20240726.01.00',
    playerHostname: INNERTUBE_BASE,
    userAgent:
      'Mozilla/5.0 (Linux; Android 13; Pixel 6 Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/112.0.0.0 Mobile Safari/537.36',
    extraHeaders: {
      Origin: 'https://www.youtube.com',
      Referer: 'https://www.youtube.com/',
    },
    needsDecipher: true,
    useSts: true,
  },

  /**
   * WEB_REMIX — YouTube Music web client.
   * Works for YouTube Music exclusive tracks. Uses cipher deciphering.
   */
  {
    name: 'WEB_REMIX',
    clientName: 'WEB_REMIX',
    clientVersion: '1.20260114.01.00',
    playerHostname: INNERTUBE_MUSIC_BASE,
    userAgent: WEB_UA,
    extraHeaders: {
      Origin: 'https://music.youtube.com',
      Referer: 'https://music.youtube.com/',
    },
    needsDecipher: true,
    useSts: true,
  },

  /**
   * ANDROID_VR (Oculus Quest 3) — fallback for standard YouTube videos.
   * Returns direct audio URLs (no cipher). LOGIN_REQUIRED for music-exclusive tracks.
   */
  {
    name: 'ANDROID_VR',
    clientName: 'ANDROID_VR',
    clientVersion: '1.61.48',
    playerHostname: INNERTUBE_BASE,
    userAgent:
      'com.google.android.apps.youtube.vr.oculus/1.61.48 (Linux; U; Android 12; en_US; Quest 3; Build/SQ3A.220605.009.A1; Cronet/132.0.6808.3)',
    extraHeaders: {},
    contextExtras: {
      osName: 'Android',
      osVersion: '12',
      deviceMake: 'Oculus',
      deviceModel: 'Quest 3',
      androidSdkVersion: '32',
    },
    needsDecipher: false,
    useSts: true,
  },

  /**
   * TVHTML5 — Smart TV client. Last resort for standard YouTube content.
   */
  {
    name: 'TVHTML5',
    clientName: 'TVHTML5',
    clientVersion: '7.20260114.00.00',
    playerHostname: INNERTUBE_BASE,
    userAgent:
      'Mozilla/5.0 (SMART-TV; Linux; Tizen 6.0) AppleWebKit/538.1 (KHTML, like Gecko) Version/6.0 TV Safari/538.1',
    extraHeaders: {
      Origin: 'https://www.youtube.com',
      Referer: 'https://www.youtube.com/tv',
    },
    needsDecipher: true,
    useSts: true,
  },
];

// ─── YTMusic API ──────────────────────────────────────────────────────────────

export const YTMusic = {
  /**
   * Search YouTube Music for tracks, albums, or artists
   */
  async search(
    query: string,
    filter: 'songs' | 'albums' | 'artists' | 'all' = 'all'
  ): Promise<any[]> {
    const filterParams: Record<string, string | undefined> = {
      songs: 'egWKAQIIAWoKEAASCBAMZABqChAA',
      albums: 'egWKAQIIAWoKEAMQBBAFMAg4CEoA',
      artists: 'egWKAQIIAWoKEAISBBAMZABqChAA',
      all: undefined,
    };

    const params = filterParams[filter];
    const data = await callInnerTube('search', { query, params });
    const allResults = Parser.parseSearch(data);

    if (filter === 'all') return allResults;
    return allResults.filter((item: any) => item.category === filter);
  },

  /**
   * Fetch trending/charts tracks
   */
  async getTrending(): Promise<Track[]> {
    try {
      const data = await callInnerTube('browse', { browseId: 'FEmusic_charts' });
      const tracks = Parser.parseTrending(data);
      if (tracks.length > 0) return tracks.slice(0, 20);
    } catch (e) {
      console.warn('[YTMusic] Charts failed, falling back to search:', e);
    }

    const fallback = await this.search('top songs 2025', 'songs');
    return fallback.slice(0, 15);
  },

  /**
   * Fetch artist details including top tracks and albums
   */
  async getArtistDetails(
    artistId: string
  ): Promise<{ name: string; thumbnail: string; description: string; topTracks: Track[]; albums: Album[] }> {
    const data = await callInnerTube('browse', { browseId: artistId });
    return Parser.parseArtistDetails(data);
  },

  /**
   * Fetch album details and track list
   */
  async getAlbumDetails(albumId: string): Promise<Album> {
    const data = await callInnerTube('browse', { browseId: albumId });
    return Parser.parseAlbumDetails(data, albumId);
  },

  /**
   * Fetch algorithmically recommended related tracks
   *
   * Root cause of previous failure:
   *   music.youtube.com/next requires BOTH videoId AND playlistId.
   *   Without playlistId, the singleColumnMusicWatchNextResultsRenderer
   *   returns no playlistPanelRenderer contents — always empty.
   *   Fix: use the RDAMVM auto-mix playlist ID format, then fall back
   *   to youtubei.js getUpNext() which handles all context internally.
   */
  async getRelatedTracks(trackId: string, limit = 15): Promise<Track[]> {
    // Attempt 1: callInnerTube with playlistId — the missing piece
    try {
      const data = await callInnerTube('next', {
        videoId: trackId,
        playlistId: `RDAMVM${trackId}`,   // YouTube auto-mix format
        isAudioOnly: true,
      });
      const tracks = Parser.parseWatchNext(data, trackId);
      if (tracks.length > 0) {
        console.log(`[getRelatedTracks] Got ${tracks.length} tracks via next+playlistId`);
        return tracks.slice(0, limit);
      }
    } catch (err) {
      console.warn('[getRelatedTracks] next+playlistId failed:', err);
    }

    // Attempt 2: youtubei.js getUpNext — handles auth/context internally
    try {
      const yt = await getInnertube();
      const upNext = await yt.music.getUpNext(trackId);
      const contents: Track[] = [];
      for (const item of (upNext?.contents || [])) {
        const id = (item as any)?.id || (item as any)?.video_id;
        const title = (item as any)?.title?.text || (item as any)?.name || '';
        const artists = (item as any)?.author?.name || (item as any)?.artists?.[0]?.name || 'Unknown Artist';
        const thumb = (item as any)?.thumbnails?.[0]?.url || '';
        if (id && id !== trackId && title) {
          contents.push({ track_id: id, title, artists, album: 'Related', thumbnail: thumb, category: 'songs' });
        }
      }
      if (contents.length > 0) {
        console.log(`[getRelatedTracks] Got ${contents.length} tracks via youtubei getUpNext`);
        return contents.slice(0, limit);
      }
    } catch (err) {
      console.warn('[getRelatedTracks] youtubei getUpNext failed:', err);
    }

    return [];
  },


  /**
   * Resolves a high-quality audio stream URL for a YouTube Music track.
   *
   * Strategy:
   * 1. Fetch the current signatureTimestamp from YouTube's player JS (cached)
   * 2. Try each client in CLIENT_CHAIN in order:
   *    MWEB → WEB_REMIX → ANDROID_VR → TVHTML5
   * 3. For clients with direct URLs: decipher n-parameter to prevent throttling
   * 4. For clients with cipher URLs: fully decipher signature then n-parameter
   *
   * Key: NO params field in player requests — it converts LOGIN_REQUIRED → ERROR
   * Key: API calls are always direct (no proxy) — proxies break POST bodies
   * Key: Proxy is only applied to the final stream CDN URL (GET request, optional)
   */
  async resolveStream(videoId: string): Promise<ResolvedStream> {
    const yt = await getInnertube();
    
    // We try a client fallback chain to ensure we get a valid stream
    const clients = ['ANDROID_VR', 'YTMUSIC_ANDROID', 'YTMUSIC', 'ANDROID', 'MWEB', 'TV'] as const;
    let lastError: any = null;
    
    for (const client of clients) {
      try {
        console.log(`[resolveStream] Trying client: ${client} via youtubei.js`);
        const info = await yt.getInfo(videoId, { client });
        
        // Find best audio format
        const format = info.chooseFormat({ type: 'audio', quality: 'best' });
        if (!format) {
          throw new Error(`No audio format found for client ${client}`);
        }
        
        // Decipher the URL using the player instance
        const url = await format.decipher(yt.session.player);
        if (!url) {
          throw new Error(`Decipher returned an empty URL for client ${client}`);
        }
        
        console.log(`[resolveStream] ✓ Resolved stream using client: ${client} — ${format.mime_type} @ ${Math.round((format.bitrate || 0) / 1000)}kbps`);
        return {
          url,
          headers: {
            'User-Agent': yt.session.context.client.userAgent || '',
          }
        };
      } catch (err: any) {
        console.warn(`[resolveStream] ✗ Client ${client} failed:`, err?.message || err);
        lastError = err;
      }
    }
    
    throw lastError || new Error('Failed to resolve stream with all clients');
  },
};
