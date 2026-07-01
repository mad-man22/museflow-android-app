/**
 * ProxyService — Optional stream URL routing.
 *
 * IMPORTANT: This proxy is for routing the final audio STREAM URL only.
 * It must NOT be used for InnerTube API calls (search/browse/player) because:
 * - Public CORS proxies don't support POST requests with custom bodies
 * - They transform or reject the JSON payload, causing API failures
 *
 * When to enable:
 * - If YouTube stream CDN is blocked in your region (geo-restriction)
 * - As an optional performance routing experiment
 *
 * Architecture mirrors OpenTune's RotatingProxyClient.kt / ProxyConfig.kt.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const PROXY_ENABLED_KEY = 'yt_stream_proxy_enabled';
const PROXY_INDEX_KEY = 'yt_stream_proxy_index';
const PROXY_CUSTOM_KEY = 'yt_stream_proxy_custom';

/**
 * Public CORS/reverse-proxy gateways that support GET stream proxying.
 * These work for audio stream URLs (GET requests) but NOT for POST API calls.
 */
const DEFAULT_GATEWAYS = [
  'https://corsproxy.io/?',
  'https://api.allorigins.win/raw?url=',
  'https://thingproxy.freeboard.io/fetch/',
];

export const ProxyService = {
  /**
   * Get the list of available proxy gateways
   */
  getProxyList(): string[] {
    return DEFAULT_GATEWAYS;
  },

  /**
   * Is stream proxy routing enabled?
   */
  async isEnabled(): Promise<boolean> {
    try {
      const val = await AsyncStorage.getItem(PROXY_ENABLED_KEY);
      return val === 'true';
    } catch {
      return false;
    }
  },

  /**
   * Enable or disable stream proxy routing
   */
  async setEnabled(enabled: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(PROXY_ENABLED_KEY, enabled ? 'true' : 'false');
    } catch (e) {
      console.error('[ProxyService] Failed to save enabled state:', e);
    }
  },

  /**
   * Get the custom proxy gateway URL (user-provided)
   */
  async getCustomGateway(): Promise<string> {
    try {
      return (await AsyncStorage.getItem(PROXY_CUSTOM_KEY)) || '';
    } catch {
      return '';
    }
  },

  /**
   * Set a custom proxy gateway URL
   */
  async setCustomGateway(url: string): Promise<void> {
    try {
      await AsyncStorage.setItem(PROXY_CUSTOM_KEY, url.trim());
    } catch (e) {
      console.error('[ProxyService] Failed to save custom gateway:', e);
    }
  },

  /**
   * Get the currently selected gateway index
   */
  async getProxyIndex(): Promise<number> {
    try {
      const val = await AsyncStorage.getItem(PROXY_INDEX_KEY);
      return val ? parseInt(val, 10) : 0;
    } catch {
      return 0;
    }
  },

  /**
   * Set the selected gateway index
   */
  async setProxyIndex(index: number): Promise<void> {
    try {
      await AsyncStorage.setItem(PROXY_INDEX_KEY, index.toString());
    } catch (e) {
      console.error('[ProxyService] Failed to save proxy index:', e);
    }
  },

  /**
   * Get the currently active gateway prefix URL
   */
  async getActiveGateway(): Promise<string> {
    const custom = await this.getCustomGateway();
    if (custom.trim().length > 0) {
      return custom.trim();
    }
    const index = await this.getProxyIndex();
    const list = this.getProxyList();
    return list[index % list.length] || list[0];
  },

  /**
   * Format a proxy URL by combining gateway + target
   */
  formatProxyUrl(gateway: string, target: string): string {
    const g = gateway.trim();
    if (g.includes('?url=')) {
      return `${g}${encodeURIComponent(target)}`;
    }
    if (g.endsWith('?') || g.endsWith('/')) {
      return `${g}${target}`;
    }
    return `${g}/${target}`;
  },

  /**
   * Rewrite a stream URL through the active proxy gateway (if enabled).
   * Only call this for GET-able stream/audio URLs — NOT InnerTube API calls.
   */
  async getProxiedUrl(targetUrl: string): Promise<string> {
    const enabled = await this.isEnabled();
    if (!enabled) return targetUrl;

    const gateway = await this.getActiveGateway();
    const proxied = this.formatProxyUrl(gateway, targetUrl);
    console.log('[ProxyService] Routing stream through proxy:', gateway);
    return proxied;
  },

  /**
   * Test latency of a proxy gateway using a simple GET request.
   * Returns milliseconds, or -1 if offline/timeout.
   */
  async testLatency(gatewayUrl: string): Promise<number> {
    // Test with a known-fast, GET-accessible URL
    const testUrl = this.formatProxyUrl(gatewayUrl, 'https://www.youtube.com/robots.txt');
    const start = Date.now();
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(testUrl, {
        method: 'GET',
        signal: controller.signal,
      });
      clearTimeout(timer);

      return res.ok ? Date.now() - start : -1;
    } catch {
      return -1;
    }
  },

  /**
   * Rotate to the next proxy in the pool (round-robin)
   */
  async rotate(): Promise<string> {
    const currentIndex = await this.getProxyIndex();
    const list = this.getProxyList();
    const nextIndex = (currentIndex + 1) % list.length;
    await this.setProxyIndex(nextIndex);
    return list[nextIndex];
  },
};
