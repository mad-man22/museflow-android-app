import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LyricsResponse {
  track_id: string;
  synced: boolean;
  source: string;
  lyrics: string;
}

// In-memory cache for the current session
const MEMORY_LYRICS_CACHE = new Map<string, LyricsResponse>();

// Timing-sync official plain lyrics into .lrc format using a weighted text density pacing algorithm
function plainLyricsToLrc(rawLyrics: string, durationSeconds: number): string {
  const lines = rawLyrics.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) {
    return "[00:00.00] ♫ Instrumental ♫";
  }

  const numLines = lines.length;
  const introDelay = Math.min(15, Math.max(4, durationSeconds * 0.08));
  const outroDelay = Math.min(10, Math.max(3, durationSeconds * 0.05));
  const usableDuration = durationSeconds - introDelay - outroDelay;

  if (usableDuration <= 0) {
    return lines.map((line, idx) => {
      const time = (durationSeconds / numLines) * idx;
      const m = Math.floor(time / 60);
      const s = Math.floor(time % 60);
      const h = Math.floor((time % 1) * 100);
      return `[${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(h).padStart(2, '0')}] ${line}`;
    }).join("\n");
  }

  const charCounts = lines.map(line => line.replace(/\s+/g, "").length);
  const totalChars = charCounts.reduce((a, b) => a + b, 0) || 1;

  const lrcLines: string[] = [];
  let currentTime = introDelay;

  for (let i = 0; i < numLines; i++) {
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const hundredths = Math.floor((currentTime % 1) * 100);

    const timestamp = `[${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}]`;
    lrcLines.push(`${timestamp} ${lines[i]}`);

    const lineProportion = charCounts[i] / totalChars;
    const lineDuration = Math.max(1.6, lineProportion * usableDuration);
    currentTime += lineDuration;
  }

  return lrcLines.join("\n");
}

// Cleans track and artist names to match LRCLIB search rules
function cleanName(name: string): string {
  if (!name) return "";
  return name
    .replace(/[\(\[][^\]\)]*(?:official|video|audio|lyric|remaster|edit|feat|ft|with|prod|single)[^\]\)]*[\)\]]/gi, "")
    .replace(/[\(\[][^\]\)]*\bfrom\b[^\]\)]*[\)\]]/gi, "") // E.g., (From "Movie")
    .replace(/\b(?:official\s+(?:video|audio|lyrics?)|feat\.?|ft\.?)\b.*$/gi, "")
    .replace(/\bfrom\b.*$/gi, "") // E.g., - From "Movie"
    .replace(/\s*-\s*$/g, "") // Clean trailing dash
    .trim();
}

export const LyricsService = {
  /**
   * Retrieves synced lyrics in .lrc format
   */
  async getLyrics(trackId: string, title: string, artist: string, durationSeconds = 180): Promise<LyricsResponse> {
    const cacheKey = `lyrics_cache_${trackId}`;
    
    // 1. Check local memory cache
    if (MEMORY_LYRICS_CACHE.has(trackId)) {
      return MEMORY_LYRICS_CACHE.get(trackId)!;
    }

    // 2. Check AsyncStorage cache
    try {
      const cached = await AsyncStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as LyricsResponse;
        MEMORY_LYRICS_CACHE.set(trackId, parsed);
        return parsed;
      }
    } catch (e) {
      console.warn("AsyncStorage lyrics lookup failed:", e);
    }

    const cleanedTitle = cleanName(title);
    // Strip legacy category prefixes (Song, Video, etc.) that might have been saved in history/favorites
    const cleanArtist = artist.replace(/^(Song|Video|Artist|Album|Single|Playlist)\s*/i, '');
    // Extract the primary artist only (splitting by commas, &, or feat) to maximize LRCLIB matches
    const primaryArtist = cleanArtist.split(/,|\bfeat\b|&/gi)[0] || cleanArtist;
    const cleanedArtist = cleanName(primaryArtist);

    const cacheAndReturn = async (res: LyricsResponse): Promise<LyricsResponse> => {
      MEMORY_LYRICS_CACHE.set(trackId, res);
      try {
        await AsyncStorage.setItem(cacheKey, JSON.stringify(res));
      } catch (e) {
        console.warn("Failed to cache lyrics in AsyncStorage:", e);
      }
      return res;
    };

    // 3. Try LRCLIB Search with fuzzy matching
    try {
      const hasArtist = cleanedArtist && cleanedArtist.toLowerCase() !== 'unknown artist';
      const searchUrl = hasArtist
        ? `https://lrclib.net/api/search?track_name=${encodeURIComponent(cleanedTitle)}&artist_name=${encodeURIComponent(cleanedArtist)}`
        : `https://lrclib.net/api/search?track_name=${encodeURIComponent(cleanedTitle)}`;

      const response = await fetch(searchUrl, {
        headers: { "User-Agent": "MuseFlow/1.0 (https://github.com/museflow)" }
      });

      if (response.ok) {
        const results = await response.json();
        if (Array.isArray(results) && results.length > 0) {
          const syncedCandidates = results
            .filter(r => r.syncedLyrics && r.syncedLyrics.includes("["))
            .map(r => {
              const diff = r.duration ? Math.abs(r.duration - durationSeconds) : 999;
              return { diff, match: r };
            });

          if (syncedCandidates.length > 0) {
            syncedCandidates.sort((a, b) => a.diff - b.diff);
            const best = syncedCandidates[0];
            if (best.diff <= 25) {
              return await cacheAndReturn({
                track_id: trackId,
                synced: true,
                source: "LRCLIB Search (Timestamped)",
                lyrics: best.match.syncedLyrics
              });
            }
          }
        }
      }
    } catch (err) {
      console.warn("LRCLIB Search failed:", err);
    }

    // 4. Try strict LRCLIB Get secondary lookup (only if we have a valid artist)
    const hasArtist = cleanedArtist && cleanedArtist.toLowerCase() !== 'unknown artist';
    if (hasArtist) {
    try {
      const getUrl = `https://lrclib.net/api/get?artist_name=${encodeURIComponent(cleanedArtist)}&track_name=${encodeURIComponent(cleanedTitle)}&duration=${durationSeconds}`;
      const response = await fetch(getUrl, {
        headers: { "User-Agent": "MuseFlow/1.0 (https://github.com/museflow)" }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.syncedLyrics && data.syncedLyrics.includes("[")) {
          return await cacheAndReturn({
            track_id: trackId,
            synced: true,
            source: "LRCLIB Get (Timestamped)",
            lyrics: data.syncedLyrics
          });
        }
        if (data.plainLyrics) {
          return await cacheAndReturn({
            track_id: trackId,
            synced: true,
            source: "LRCLIB Get (Weighted Synced)",
            lyrics: plainLyricsToLrc(data.plainLyrics, durationSeconds)
          });
        }
      }
    } catch (err) {
      console.warn("LRCLIB Get strict failed:", err);
    }
    }

    // 5. Fallback: Ambient placeholder
    const ambientLrc = [
      "[00:00.00] ♫ Music is playing ♫",
      `[00:08.00] ${title}`,
      `[00:16.00] — ${artist}`,
      "[00:28.00] (Lyrics not available for this track)",
      "[00:44.00] ♫ Enjoy the music ♫",
      `[01:10.00] ♫ ${title} ♫`,
      "[01:50.00] (Music Playing)",
      "[02:30.00] ♫ ♫ ♫",
    ].join("\n");

    return await cacheAndReturn({
      track_id: trackId,
      synced: true,
      source: "MuseFlow Ambient",
      lyrics: ambientLrc
    });
  }
};
