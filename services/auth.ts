import AsyncStorage from '@react-native-async-storage/async-storage';

const COOKIE_STORAGE_KEY = 'yt_auth_cookies';

export const AuthService = {
  /**
   * Save cookies to AsyncStorage
   */
  async setCookies(cookieString: string): Promise<void> {
    try {
      await AsyncStorage.setItem(COOKIE_STORAGE_KEY, cookieString);
    } catch (e) {
      console.error('Failed to save cookies to storage:', e);
    }
  },

  /**
   * Retrieve cookies from AsyncStorage
   */
  async getCookies(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(COOKIE_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to get cookies from storage:', e);
      return null;
    }
  },

  /**
   * Remove cookies from AsyncStorage (logout)
   */
  async clearCookies(): Promise<void> {
    try {
      await AsyncStorage.removeItem(COOKIE_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear cookies from storage:', e);
    }
  },

  /**
   * Check if the user is authenticated (cookies exist)
   */
  async isAuthenticated(): Promise<boolean> {
    const cookies = await this.getCookies();
    return cookies !== null && cookies.length > 0;
  }
};
