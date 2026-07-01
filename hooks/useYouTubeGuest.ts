import { useState, useEffect } from 'react';
import { Innertube, Platform } from 'youtubei.js/web';
import { AuthService } from '../services/auth';

// Overwrite the evaluation shim unconditionally so that signature/nsig deciphering works
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

export function useYouTubeGuest() {
  const [yt, setYt] = useState<Innertube | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        // Retrieve cookies from AuthService (AsyncStorage) if authenticated
        const cookies = await AuthService.getCookies();
        
        // Initialize Innertube. If cookies are present, authenticate with them.
        const instance = await Innertube.create({
          cookie: cookies || undefined,
        });

        if (active) {
          setYt(instance);
          setLoading(false);
        }
      } catch (error) {
        console.error('[useYouTubeGuest] Failed to initialize Innertube:', error);
        if (active) {
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return { yt, loading };
}
