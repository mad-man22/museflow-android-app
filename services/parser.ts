import { Track, Artist, Album } from './ytmusic';

// Helper to get thumbnail url from array of thumbnails
export const getThumbnailUrl = (thumbnails: any): string => {
  if (!thumbnails) return 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300';
  if (Array.isArray(thumbnails)) {
    return thumbnails[thumbnails.length - 1]?.url || thumbnails[0]?.url || '';
  }
  if (thumbnails.url) return thumbnails.url;
  return 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300';
};

// Helper to convert time strings (e.g. "3:23", "10:14") into seconds
function parseDurationString(str: string): number | undefined {
  if (!str) return undefined;
  const parts = str.split(':');
  if (parts.length === 2) {
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    if (!isNaN(minutes) && !isNaN(seconds)) {
      return minutes * 60 + seconds;
    }
  } else if (parts.length === 3) {
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);
    if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
      return hours * 3600 + minutes * 60 + seconds;
    }
  }
  return undefined;
}

/**
 * Validate that an ID is a real YouTube video ID.
 * Video IDs are exactly 11 characters: [a-zA-Z0-9_-]
 * Playlist/browse IDs start with VL, PL, MP, RD, UC, FEmusic, etc.
 */
function isValidVideoId(id: string | null | undefined): id is string {
  if (!id) return false;
  // Must be 11 chars and only alphanumeric + dash/underscore
  return /^[a-zA-Z0-9_-]{11}$/.test(id);
}

/**
 * Extracts a video ID from an endpoint tree, checking all known locations.
 * Returns null if no valid video ID is found (never falls back to browse IDs).
 */
function extractVideoId(renderer: any): string | null {
  const candidates = [
    // Primary: playlist item data (used in album/queue contexts)
    renderer?.playlistItemData?.videoId,
    // Primary: direct watch endpoint on the item
    renderer?.navigationEndpoint?.watchEndpoint?.videoId,
    // From the overlay menu
    renderer?.overlay?.musicItemThumbnailOverlayRenderer?.content?.musicPlayButtonRenderer?.playNavigationEndpoint?.watchEndpoint?.videoId,
    // From flexColumn title run's watchEndpoint
    renderer?.flexColumns?.[0]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.[0]?.navigationEndpoint?.watchEndpoint?.videoId,
    // From the onTap endpoint
    renderer?.onTap?.watchEndpoint?.videoId,
    // From menu item
    renderer?.menu?.menuRenderer?.items?.[0]?.menuNavigationItemRenderer?.navigationEndpoint?.watchEndpoint?.videoId,
  ];

  for (const id of candidates) {
    if (isValidVideoId(id)) return id;
  }
  return null;
}

/**
 * Parsers to extract data from YouTube Music InnerTube API responses.
 * Matching the extraction pipeline pattern used by OpenTune/ViMusic.
 */
export const Parser = {
  /**
   * Parse a single music responsive list item (used in searches, charts, list views).
   * Returns null for any item that doesn't have a real playable video ID.
   */
  parseMusicResponsiveListItem(renderer: any): Track | Artist | Album | null {
    if (!renderer) return null;

    const flexColumns = renderer.flexColumns || [];
    if (flexColumns.length === 0) return null;

    // Title
    const titleColumn = flexColumns[0]?.musicResponsiveListItemFlexColumnRenderer;
    const titleRun = titleColumn?.text?.runs?.[0];
    const title = titleRun?.text || '';
    if (!title) return null;

    // Attempt to extract a real video ID
    const videoId = extractVideoId(renderer);

    // Browse ID (for artists/albums only — NEVER used as a track_id)
    const browseId =
      renderer.navigationEndpoint?.browseEndpoint?.browseId ||
      titleRun?.navigationEndpoint?.browseEndpoint?.browseId;

    // Thumbnail
    const thumbnail = getThumbnailUrl(
      renderer.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails
    );

    // Subtitle / Flex Column 1 (Artists, Albums, Metadata)
    let artists = 'Unknown Artist';
    let album = 'Single';
    let runs: any[] = [];

    if (flexColumns[1]) {
      const subtitleColumn = flexColumns[1].musicResponsiveListItemFlexColumnRenderer;
      runs = subtitleColumn?.text?.runs || [];

      // Skip category run (e.g. "Song", "Video") and the separator " • " if present at start
      let startIdx = 0;
      if (runs[0] && ['song', 'video', 'album', 'single', 'artist', 'playlist'].includes(runs[0].text?.trim().toLowerCase())) {
        startIdx = 2; // skip category and separator
      }
      const relevantRuns = runs.slice(startIdx);

      // Artist runs: those linking to artist channels (UC...) or with no endpoint (plain text separators)
      const artistRuns = relevantRuns.filter(
        (r: any) =>
          !r.navigationEndpoint ||
          r.navigationEndpoint?.browseEndpoint?.browseId?.startsWith('UC')
      );
      if (artistRuns.length > 0) {
        artists = artistRuns.map((r: any) => r.text).join('');
        // Clean up separator chars
        artists = artists.replace(/\s*•\s*/g, '').trim() || 'Unknown Artist';
      }

      // Album runs: linking to album browse IDs (MP...)
      const albumRuns = runs.filter(
        (r: any) =>
          r.navigationEndpoint?.browseEndpoint?.browseId?.startsWith('MP') ||
          r.navigationEndpoint?.browseEndpoint?.browseId?.startsWith('FLa')
      );
      if (albumRuns.length > 0) {
        album = albumRuns.map((r: any) => r.text).join('');
      }
    }

    // Determine item category based on what IDs are available
    // Priority: if browseId starts with UC → artist, MP/FLa → album, else track
    if (browseId?.startsWith('UC') && !videoId) {
      // Artist (no video ID)
      return {
        artist_id: browseId,
        name: title,
        thumbnail,
        category: 'artists',
      } as Artist;
    }

    if (
      (browseId?.startsWith('MP') || browseId?.startsWith('FLa')) &&
      !videoId
    ) {
      // Album (no video ID)
      return {
        album_id: browseId,
        title,
        artist: artists,
        thumbnail,
        category: 'albums',
        tracks: [],
      } as Album;
    }

    if (videoId) {
      // Check if the last run matches time format
      const lastRunText = runs[runs.length - 1]?.text?.trim();
      let duration: number | undefined;
      if (lastRunText && /^\d{1,2}:\d{2}(:\d{2})?$/.test(lastRunText)) {
        duration = parseDurationString(lastRunText);
      }

      // Song (valid video ID confirmed)
      return {
        track_id: videoId,
        title,
        artists: artists.replace(/^(Song|Video|Artist|Album|Single|Playlist)\s*/i, ''),
        album,
        thumbnail,
        category: 'songs',
        duration,
      } as Track;
    }

    // No valid ID of any kind — skip this item
    return null;
  },

  /**
   * Parse a single music two-row item (carousels, grids).
   */
  parseMusicTwoRowItem(renderer: any): Track | Artist | Album | null {
    if (!renderer) return null;

    const title = renderer.title?.runs?.[0]?.text || '';
    if (!title) return null;

    const browseId = renderer.navigationEndpoint?.browseEndpoint?.browseId;
    const videoId =
      renderer.navigationEndpoint?.watchEndpoint?.videoId ||
      renderer.onTap?.watchEndpoint?.videoId;

    const thumbnail = getThumbnailUrl(
      renderer.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails ||
        renderer.thumbnail?.thumbnails
    );

    const subtitleRuns: any[] = renderer.subtitle?.runs || [];
    const subtitleText = subtitleRuns.map((r: any) => r.text).join('');
    const subtitleParts = subtitleText.split('•');
    let artists = subtitleParts[0]?.trim() || 'Unknown Artist';
    if (['song', 'video', 'album', 'single', 'artist', 'playlist'].includes(artists.toLowerCase())) {
      artists = subtitleParts[1]?.trim() || 'Unknown Artist';
    }
    const year = subtitleParts[subtitleParts.length - 1]?.trim() || '';

    // Category detection
    if (browseId?.startsWith('UC')) {
      return {
        artist_id: browseId,
        name: title,
        thumbnail,
        category: 'artists',
      } as Artist;
    }

    if (browseId?.startsWith('MP') || browseId?.startsWith('FLa')) {
      return {
        album_id: browseId,
        title,
        artist: artists,
        thumbnail,
        year,
        category: 'albums',
        tracks: [],
      } as Album;
    }

    if (isValidVideoId(videoId)) {
      // Find duration part
      const durationParts = subtitleParts.filter(p => /^\d{1,2}:\d{2}(:\d{2})?$/.test(p.trim()));
      let duration: number | undefined;
      if (durationParts.length > 0) {
        duration = parseDurationString(durationParts[0].trim());
      }

      return {
        track_id: videoId,
        title,
        artists: artists.replace(/^(Song|Video|Artist|Album|Single|Playlist)\s*/i, ''),
        album: 'Single',
        thumbnail,
        category: 'songs',
        duration,
      } as Track;
    }

    return null;
  },

  /**
   * Parse full search results payload
   */
  parseSearch(data: any): (Track | Artist | Album)[] {
    const results: (Track | Artist | Album)[] = [];
    const sections =
      data.contents?.tabbedSearchResultsRenderer?.tabs?.[0]?.tabRenderer
        ?.content?.sectionListRenderer?.contents || [];

    for (const section of sections) {
      const shelf = section.musicShelfRenderer;
      const itemSection = section.itemSectionRenderer;
      const contents = shelf?.contents || itemSection?.contents || [];

      for (const item of contents) {
        const parsed = this.parseMusicResponsiveListItem(
          item.musicResponsiveListItemRenderer
        );
        if (parsed) results.push(parsed);
      }
    }

    return results;
  },

  /**
   * Parse trending/charts payload
   */
  parseTrending(data: any): Track[] {
    const tracks: Track[] = [];
    const tabs =
      data.contents?.singleColumnBrowseResultsRenderer?.tabs || [];
    const sectionContents =
      tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents || [];

    for (const section of sectionContents) {
      const items =
        section.musicCarouselShelfRenderer?.contents ||
        section.musicShelfRenderer?.contents ||
        [];

      for (const item of items) {
        let parsed: any = null;

        if (item.musicResponsiveListItemRenderer) {
          parsed = this.parseMusicResponsiveListItem(
            item.musicResponsiveListItemRenderer
          );
        } else if (item.musicTwoRowItemRenderer) {
          parsed = this.parseMusicTwoRowItem(item.musicTwoRowItemRenderer);
        }

        if (parsed && (parsed as any).category === 'songs') {
          tracks.push(parsed as Track);
        }
      }
    }

    return tracks;
  },

  /**
   * Parse artist details (bio, top tracks, albums)
   */
  parseArtistDetails(data: any): {
    name: string;
    thumbnail: string;
    description: string;
    topTracks: Track[];
    albums: Album[];
  } {
    const header =
      data.header?.musicImmersiveHeaderRenderer ||
      data.header?.musicVisualHeaderRenderer;
    const name = header?.title?.runs?.[0]?.text || 'Artist';
    const thumbnail = getThumbnailUrl(
      header?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails
    );
    const description = header?.description?.runs?.[0]?.text || '';

    const contents =
      data.contents?.singleColumnBrowseResultsRenderer?.tabs?.[0]?.tabRenderer
        ?.content?.sectionListRenderer?.contents || [];
    const topTracks: Track[] = [];
    const albums: Album[] = [];

    for (const section of contents) {
      // Top Songs section
      const shelf = section.musicShelfRenderer;
      if (
        shelf &&
        shelf.title?.runs?.[0]?.text?.toLowerCase().includes('songs')
      ) {
        for (const item of shelf.contents || []) {
          const parsed = this.parseMusicResponsiveListItem(
            item.musicResponsiveListItemRenderer
          );
          if (parsed && (parsed as any).category === 'songs') {
            topTracks.push(parsed as Track);
          }
        }
      }

      // Albums section
      const carousel = section.musicCarouselShelfRenderer;
      if (
        carousel &&
        carousel.header?.musicCarouselShelfBasicHeaderRenderer?.title?.runs?.[0]?.text
          ?.toLowerCase()
          .includes('album')
      ) {
        for (const item of carousel.contents || []) {
          const parsed = this.parseMusicTwoRowItem(item.musicTwoRowItemRenderer);
          if (parsed && (parsed as any).category === 'albums') {
            albums.push(parsed as Album);
          }
        }
      }
    }

    return { name, thumbnail, description, topTracks, albums };
  },

  /**
   * Parse album details and track list
   */
  parseAlbumDetails(data: any, albumId: string): Album {
    const header = data.header?.musicDetailHeaderRenderer;
    const title = header?.title?.runs?.[0]?.text || 'Album';
    const artist = header?.subtitle?.runs?.[2]?.text || 'Artist';
    const year = header?.subtitle?.runs?.[4]?.text || '';
    const thumbnail = getThumbnailUrl(
      header?.thumbnail?.croppedSquareThumbnailRenderer?.thumbnail?.thumbnails
    );

    const browseResults =
      data.contents?.singleColumnBrowseResultsRenderer ||
      data.contents?.twoColumnBrowseResultsRenderer;

    let contents: any[] = [];
    if (browseResults) {
      const tabContents = browseResults.tabs?.[0]?.tabRenderer?.content?.sectionListRenderer?.contents;
      if (Array.isArray(tabContents)) {
        contents = contents.concat(tabContents);
      }
      const secContents = browseResults.secondaryContents?.sectionListRenderer?.contents;
      if (Array.isArray(secContents)) {
        contents = contents.concat(secContents);
      }
    }
    const tracks: Track[] = [];

    for (const section of contents) {
      const shelf = section.musicShelfRenderer || section.musicPlaylistShelfRenderer;
      if (shelf) {
        for (const item of shelf.contents || []) {
          const parsed = this.parseMusicResponsiveListItem(
            item.musicResponsiveListItemRenderer
          );
          if (parsed && (parsed as any).category === 'songs') {
            // Inherit album-level artist and title
            (parsed as Track).artists = artist;
            (parsed as Track).album = title;
            tracks.push(parsed as Track);
          }
        }
      }
    }

    return { album_id: albumId, title, artist, thumbnail, year, tracks };
  },

  /**
   * Parse autoplay watch-next queue recommendations
   */
  parseWatchNext(data: any, trackId: string): Track[] {
    const contents =
      data.contents?.singleColumnMusicWatchNextResultsRenderer?.tabbedRenderer
        ?.watchNextTabbedResultsRenderer?.tabs?.[0]?.tabRenderer?.content
        ?.musicQueueRenderer?.content?.playlistPanelRenderer?.contents ||
      data.contents?.singleColumnMusicWatchNextResultsRenderer?.autoplay?.autoplayConnection?.contents ||
      data.contents?.singleColumnMusicWatchNextResultsRenderer?.autoplay?.autoplayConnection?.contents?.[0]?.playlistPanelRenderer?.contents ||
      data.contents?.singleColumnMusicWatchNextResultsRenderer?.tabbedRenderer?.watchNextTabbedResultsRenderer?.tabs?.[0]?.tabRenderer?.content
        ?.musicQueueRenderer?.content?.playlistPanelRenderer?.contents ||
      [];

    const tracks: Track[] = [];

    for (const item of contents) {
      const renderer = item.playlistPanelVideoRenderer || item.playlistPanelVideoWrapperRenderer?.primaryRenderer?.playlistPanelVideoRenderer;
      if (!renderer) continue;

      const title = renderer.title?.runs?.[0]?.text || '';
      const videoId = renderer.videoId;

      // Validate: must have title, valid video ID, and not be the current track
      if (!title || !isValidVideoId(videoId) || videoId === trackId) continue;

      const artistRuns: any[] = renderer.longBylineText?.runs || [];
      let artists =
        artistRuns
          .filter((r: any) => r.text && r.text.trim() !== '•')
          .map((r: any) => r.text)
          .join('')
          .trim() || 'Unknown Artist';

      // Clean category prefix from the artist string
      artists = artists.replace(/^(Song|Video|Artist|Album|Single|Playlist)\s*/i, '');

      const thumbnail = getThumbnailUrl(renderer.thumbnail?.thumbnails);

      tracks.push({
        track_id: videoId,
        title,
        artists,
        album: 'Related Track',
        thumbnail,
        category: 'songs',
      });
    }

    return tracks;
  },
};
