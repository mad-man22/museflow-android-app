/**
 * Decipherer service for YouTube stream URL processing.
 * 
 * Handles two tasks:
 * 1. Fetching the signatureTimestamp (sts) from the YouTube player JS
 * 2. Deciphering signature ciphers and n-parameter throttling (fallback clients only)
 *
 * Note: ANDROID_VR client returns direct URLs with no cipher — deciphering is only
 * needed if we fall back to WEB_REMIX or TVHTML5 clients.
 */

interface PlayerCache {
  playerUrl: string;
  signatureTimestamp: number;
  sigActions: string;
  nFuncName: string;
  nFuncBody: string;
}

// Cache across the session — player JS version only changes when YouTube updates the player
let playerCache: PlayerCache | null = null;

// Cache just the STS for fast access
let cachedSts: number | null = null;
let cachedPlayerJsUrl: string | null = null;

/**
 * Fetches the current YouTube player JS URL from YouTube's web page.
 * The player URL changes occasionally when YouTube updates its player.
 */
async function fetchPlayerJsUrl(): Promise<string> {
  try {
    const res = await fetch('https://www.youtube.com/watch?v=jNQXAC9IVRw', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    const html = await res.text();

    // Match PLAYER_JS_URL from the page's ytcfg or inline config
    const match = html.match(/PLAYER_JS_URL['":\s]+"([^"]+)"/);
    if (match) {
      const path = match[1].replace(/\\u0026/g, '&');
      return path.startsWith('http') ? path : `https://www.youtube.com${path}`;
    }

    // Fallback: look for base.js reference
    const baseMatch = html.match(/\/s\/player\/([a-f0-9]+)\/player[^"]+\.js/);
    if (baseMatch) {
      return `https://www.youtube.com${baseMatch[0]}`;
    }

    throw new Error('Could not find player JS URL');
  } catch (err) {
    console.warn('[Decipherer] Failed to fetch player JS URL:', err);
    throw err;
  }
}

/**
 * Fetches and parses the YouTube player JS, extracting:
 * - signatureTimestamp (sts)
 * - signature decipher function code
 * - n-parameter decipher function code
 */
async function loadPlayerCache(playerUrl: string): Promise<PlayerCache> {
  if (playerCache && playerCache.playerUrl === playerUrl) {
    return playerCache;
  }

  console.log('[Decipherer] Loading player JS:', playerUrl);
  const res = await fetch(playerUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch player JS: HTTP ${res.status}`);
  }

  const js = await res.text();

  // 1. Extract signatureTimestamp
  const stsMatch = js.match(/signatureTimestamp[:\s]*([0-9]{5})/);
  const signatureTimestamp = stsMatch ? parseInt(stsMatch[1], 10) : 20000;
  console.log('[Decipherer] signatureTimestamp:', signatureTimestamp);

  // 2. Extract signature decipher
  // Modern pattern: function(a){a=a.split("");<helperObj>.<method>(a,N);return a.join("")}
  let sigActions = '';
  const sigFnMatch = js.match(/([a-zA-Z0-9$_]{2,5})=function\(([a-z])\)\{([a-z])=\3\.split\(""\);([^}]{20,})\3\.join\(""\)\}/);
  if (sigFnMatch) {
    const sigVarName = sigFnMatch[3]; // the parameter name used inside (e.g. 'a')
    const sigFnBody = sigFnMatch[4];
    // Look for the helper object name used in the function body (e.g., Xb.func(a, ...))
    const helperObjMatch = new RegExp(`([a-zA-Z0-9$_]{1,5})\\.[a-zA-Z0-9$_]+\\(${sigVarName}`).exec(sigFnBody);
    if (helperObjMatch) {
      const objName = helperObjMatch[1];
      const escapedObj = objName.replace(/[$]/g, '\\$');
      // Find the helper object definition
      const helperObjRegex = new RegExp(`var\\s+${escapedObj}\\s*=\\s*\\{[\\s\\S]+?\\};`);
      const helperDef = js.match(helperObjRegex);
      if (helperDef) {
        sigActions = `${helperDef[0]}\nvar _sigDecipher = function(a){a=a.split("");${sigFnBody} return a.join("");};`;
      }
    }
  }

  // 3. Extract n-parameter decipher function
  // Modern approach: look for the function referenced right before n= in URLs
  // Pattern from yt-dlp: find function name in .get("n")&&(c=NAME[0](c) or similar
  let nFuncName = '';
  let nFuncBody = '';

  // Try to find the throttle function name
  const nRefMatch = js.match(/\.get\("n"\)\)&&\(([a-zA-Z0-9$_]+)=([a-zA-Z0-9$_]+)\[(\d+)\]\|\|([a-zA-Z0-9$_]+)\)/);
  if (nRefMatch) {
    const arrName = nRefMatch[2];
    const idx = parseInt(nRefMatch[3], 10);
    // Find the array definition  
    const arrRegex = new RegExp(`var\\s+${arrName.replace(/[$]/g, '\\$')}\\s*=\\s*\\[([^\\]]+)\\]`);
    const arrMatch = js.match(arrRegex);
    if (arrMatch) {
      // The array elements are function names — get the one at idx
      const elements = arrMatch[1].split(',');
      nFuncName = elements[idx]?.trim() || '';
    }
  }

  // If we found the function name, extract its body
  if (nFuncName) {
    const escapedFn = nFuncName.replace(/[$]/g, '\\$');
    // Capture: FUNCNAME=function(a){...return a.join("")}
    const nBodyRegex = new RegExp(
      `${escapedFn}\\s*=\\s*function\\(([a-zA-Z0-9_$])\\)\\s*\\{([\\s\\S]{10,2000}?)return \\1\\.join\\(""\\)\\}`
    );
    const nBodyMatch = js.match(nBodyRegex);
    if (nBodyMatch) {
      const param = nBodyMatch[1];
      const body = nBodyMatch[2];
      nFuncBody = `var _nDecipher = function(${param}){${body}return ${param}.join("");};`;
    }
  }

  // Fallback n-pattern (simpler/older format)
  if (!nFuncBody) {
    const nSimpleMatch = js.match(/function\(([a-zA-Z0-9_$])\)\{var b=\1\.split\(""\),c=\[[^\]]{20,}\];[\s\S]{50,800}?return b\.join\(""\)\}/);
    if (nSimpleMatch) {
      nFuncBody = `var _nDecipher = ${nSimpleMatch[0]};`;
    }
  }

  if (!sigActions) console.warn('[Decipherer] Could not extract sig decipher — cipher URLs will fail');
  if (!nFuncBody) console.warn('[Decipherer] Could not extract n decipher — streams may be throttled');

  playerCache = { playerUrl, signatureTimestamp, sigActions, nFuncName, nFuncBody };
  return playerCache;
}

export const Decipherer = {
  /**
   * Fetches the current signatureTimestamp from YouTube's player JS.
   * Caches per session; only re-fetches on player version change.
   */
  async getSignatureTimestamp(): Promise<number> {
    try {
      // If we have a cached STS and the playerJsUrl hasn't changed, return it
      if (cachedSts !== null && cachedPlayerJsUrl !== null) {
        return cachedSts;
      }

      const playerUrl = await fetchPlayerJsUrl();
      cachedPlayerJsUrl = playerUrl;

      const cache = await loadPlayerCache(playerUrl);
      cachedSts = cache.signatureTimestamp;
      return cachedSts;
    } catch (err) {
      console.warn('[Decipherer] getSignatureTimestamp failed, using fallback 20000:', err);
      return 20000; // Safe-ish fallback — won't cause playback errors for ANDROID_VR
    }
  },

  /**
   * Decrypt a signature cipher string.
   * Used only when stream URLs contain signatureCipher or cipher (e.g., WEB_REMIX client).
   */
  async decipherSignature(cipher: string, playerUrl: string): Promise<string> {
    const params = new URLSearchParams(cipher);
    const signature = params.get('s') || '';
    const signatureParamName = params.get('sp') || 'sig';
    const streamUrl = params.get('url') || '';

    if (!streamUrl) {
      throw new Error('Missing url in signature cipher.');
    }

    try {
      const cache = await loadPlayerCache(playerUrl);

      if (!cache.sigActions) {
        // Return undeciphered — may not play, but better than crashing
        return `${streamUrl}&${signatureParamName}=${encodeURIComponent(signature)}`;
      }

      // eval is safe here — Hermes/JSC in React Native supports it
      const runCode = `${cache.sigActions}\n_sigDecipher("${signature}");`;
      // eslint-disable-next-line no-eval
      const decryptedSig = eval(runCode);

      console.log('[Decipherer] Signature deciphered successfully.');
      return `${streamUrl}&${signatureParamName}=${encodeURIComponent(decryptedSig)}`;
    } catch (e) {
      console.warn('[Decipherer] Sig decipher failed, returning undeciphered:', e);
      return `${streamUrl}&${signatureParamName}=${encodeURIComponent(signature)}`;
    }
  },

  /**
   * Decipher the n-parameter to prevent stream throttling.
   * The n-parameter is added by YouTube to rate-limit non-browser clients.
   */
  async decipherUrlN(streamUrl: string, playerUrl: string): Promise<string> {
    let urlObj: URL;
    try {
      urlObj = new URL(streamUrl);
    } catch {
      return streamUrl;
    }

    const nVal = urlObj.searchParams.get('n');
    if (!nVal) return streamUrl; // No n-parameter, no throttling issue

    try {
      const cache = await loadPlayerCache(playerUrl);

      if (!cache.nFuncBody) {
        return streamUrl; // Can't decipher, return as-is (may be throttled)
      }

      const runCode = `${cache.nFuncBody}\n_nDecipher("${nVal}");`;
      // eslint-disable-next-line no-eval
      const decipheredN = eval(runCode);

      urlObj.searchParams.set('n', decipheredN);
      console.log('[Decipherer] n-parameter deciphered successfully.');
      return urlObj.toString();
    } catch (e) {
      console.warn('[Decipherer] n-param decipher failed, returning original (may be throttled):', e);
      return streamUrl;
    }
  },

  /**
   * Invalidate the cache (call this when streams start failing after working fine)
   */
  invalidateCache(): void {
    playerCache = null;
    cachedSts = null;
    cachedPlayerJsUrl = null;
    console.log('[Decipherer] Cache invalidated.');
  }
};
