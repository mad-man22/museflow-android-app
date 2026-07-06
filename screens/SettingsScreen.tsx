import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Save, Trash2, Key, Info, User, LogOut, Globe, Sliders, Music } from 'lucide-react-native';
import { AuthService } from '../services/auth';
import { ProxyService } from '../services/proxy';
import { LoginScreen } from './LoginScreen';

export default function SettingsScreen() {
  const [apiKey, setApiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Proxy settings state
  const [proxyEnabled, setProxyEnabled] = useState(false);
  const [customProxy, setCustomProxy] = useState('');
  const [activeGateway, setActiveGateway] = useState('');
  const [latency, setLatency] = useState<string>('Not tested');
  const [isTestingLatency, setIsTestingLatency] = useState(false);

  // Home preferences states
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['Kannada', 'English']);
  const [favArtistsText, setFavArtistsText] = useState('Puneeth Rajkumar, Taylor Swift');
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);

  useEffect(() => {
    // Load existing API Key
    AsyncStorage.getItem('gemini_api_key')
      .then((val) => {
        if (val) setApiKey(val);
      })
      .catch((err) => console.warn('Failed to load API key:', err));

    // Check authentication status
    AuthService.isAuthenticated().then(setIsAuthenticated);

    // Load Proxy Settings
    ProxyService.isEnabled().then(setProxyEnabled);
    ProxyService.getCustomGateway().then(setCustomProxy);
    ProxyService.getActiveGateway().then((gw) => {
      setActiveGateway(gw);
      checkProxyLatency(gw);
    });

    // Load home preferences
    AsyncStorage.getItem('museflow_home_preferences')
      .then((val) => {
        if (val) {
          const parsed = JSON.parse(val);
          if (parsed.languages) setSelectedLanguages(parsed.languages);
          if (parsed.artists) setFavArtistsText(parsed.artists.join(', '));
        }
      })
      .catch((err) => console.warn('Failed to load home preferences:', err));
  }, []);

  const checkProxyLatency = async (gateway: string) => {
    setIsTestingLatency(true);
    setLatency('Testing...');
    const result = await ProxyService.testLatency(gateway);
    setIsTestingLatency(false);
    if (result >= 0) {
      setLatency(`${result}ms`);
    } else {
      setLatency('Timeout/Offline');
    }
  };

  const handleToggleProxy = async (value: boolean) => {
    setProxyEnabled(value);
    await ProxyService.setEnabled(value);
    const gw = await ProxyService.getActiveGateway();
    setActiveGateway(gw);
    if (value) {
      checkProxyLatency(gw);
    }
  };

  const handleRotateProxy = async () => {
    const nextGw = await ProxyService.rotate();
    setActiveGateway(nextGw);
    checkProxyLatency(nextGw);
  };

  const handleSaveCustomProxy = async (value: string) => {
    setCustomProxy(value);
    await ProxyService.setCustomGateway(value);
    const gw = await ProxyService.getActiveGateway();
    setActiveGateway(gw);
    checkProxyLatency(gw);
  };

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const handleSavePreferences = async () => {
    setIsSavingPreferences(true);
    try {
      const artistList = favArtistsText
        .split(',')
        .map(a => a.trim())
        .filter(a => a.length > 0);

      const prefs = {
        languages: selectedLanguages,
        artists: artistList,
      };

      await AsyncStorage.setItem('museflow_home_preferences', JSON.stringify(prefs));
      Alert.alert('Success', 'Home page preferences updated successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to save preferences.');
    } finally {
      setIsSavingPreferences(false);
    }
  };

  const handleSaveKey = async () => {
    setIsSaving(true);
    try {
      if (apiKey.trim()) {
        await AsyncStorage.setItem('gemini_api_key', apiKey.trim());
        Alert.alert('Success', 'Gemini API Key saved successfully!');
      } else {
        await AsyncStorage.removeItem('gemini_api_key');
        Alert.alert('Cleared', 'Gemini API Key removed. AI Vibe generator will run in fallback offline mode.');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to save API key.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearHistory = async () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear your local playback history, favorites, and cached lyrics?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              const keys = await AsyncStorage.getAllKeys();
              const keysToRemove = keys.filter(k => k.startsWith('lyrics_cache_') || k === 'museflow_history' || k === 'museflow_favorites' || k === 'museflow_playlists');
              await AsyncStorage.multiRemove(keysToRemove);
              Alert.alert('Cleared', 'All local cached data has been cleared.');
            } catch (e) {
              Alert.alert('Error', 'Failed to clear cache.');
            }
          }
        }
      ]
    );
  };

  const handleLogout = async () => {
    Alert.alert(
      'Disconnect Account',
      'Are you sure you want to disconnect your YouTube Music account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: async () => {
            await AuthService.clearCookies();
            setIsAuthenticated(false);
            Alert.alert('Disconnected', 'YouTube Account has been disconnected.');
          }
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Configure client-side integrations and local storage.</Text>
        </View>

        {/* YouTube Account Connection Panel */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <User size={20} color="#f43f5e" />
            <Text style={styles.cardTitle}>YouTube Account Connection</Text>
          </View>
          
          <Text style={styles.cardDescription}>
            Connect your YouTube Music account to enable personalized mixes, search results, library integration, and bypass bot protection rate-limits.
          </Text>

          {isAuthenticated ? (
            <View style={styles.connectedContainer}>
              <Text style={styles.connectedText}>✓ Connected to YouTube Music</Text>
              <TouchableOpacity style={styles.dangerButton} onPress={handleLogout}>
                <LogOut size={18} color="#ffffff" style={styles.buttonIcon} />
                <Text style={styles.dangerButtonText}>Disconnect Account</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.loginButton} onPress={() => setShowLogin(true)}>
              <User size={18} color="#ffffff" style={styles.buttonIcon} />
              <Text style={styles.loginButtonText}>Connect YouTube Account</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Network & Proxy Panel */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Globe size={20} color="#3b82f6" />
            <Text style={styles.cardTitle}>Network & Proxy Routing</Text>
          </View>
          
          <Text style={styles.cardDescription}>
            Route audio stream CDN URLs through a proxy gateway. Only needed if YouTube's stream servers are blocked in your region. API requests (search, browse) are always direct — proxying those would break them.
          </Text>

          {/* Proxy Enable Toggle */}
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Enable Proxy Routing</Text>
            <Switch
              value={proxyEnabled}
              onValueChange={handleToggleProxy}
              trackColor={{ false: '#27272a', true: '#3b82f6' }}
              thumbColor={proxyEnabled ? '#ffffff' : '#a1a1aa'}
            />
          </View>

          {proxyEnabled && (
            <View style={styles.proxyDetails}>
              {/* Active Gateway and Latency Display */}
              <View style={styles.infoRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>Active Proxy Gateway:</Text>
                  <Text style={styles.infoValue} numberOfLines={1}>{activeGateway}</Text>
                </View>
                <View style={styles.latencyContainer}>
                  <Text style={styles.infoLabel}>Latency:</Text>
                  <Text style={[
                    styles.latencyValue, 
                    latency.includes('Timeout') && styles.latencyBad,
                    !latency.includes('Timeout') && !latency.includes('Testing') && !latency.includes('Not') && styles.latencyGood
                  ]}>{latency}</Text>
                </View>
              </View>

              {/* Rotate Proxy Button */}
              {customProxy.trim().length === 0 && (
                <TouchableOpacity 
                  style={styles.rotateButton} 
                  onPress={handleRotateProxy}
                  disabled={isTestingLatency}
                >
                  <Globe size={18} color="#ffffff" style={styles.buttonIcon} />
                  <Text style={styles.rotateButtonText}>Rotate to Next IP Proxy</Text>
                </TouchableOpacity>
              )}

              {/* Custom Gateway Input */}
              <Text style={styles.inputLabel}>Custom Proxy Gateway (Optional):</Text>
              <TextInput
                style={styles.input}
                placeholder="https://my-custom-cors-proxy.com/?"
                placeholderTextColor="#71717a"
                value={customProxy}
                onChangeText={handleSaveCustomProxy}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.proxyWarningText}>
                ⚠️ Stream proxy only: routes audio CDN URLs, not API calls. Third-party gateways can see your stream request metadata. Use a private or trusted gateway for best privacy.
              </Text>
            </View>
          )}
        </View>

        {/* Home Preferences Panel */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Sliders size={20} color="#a855f7" />
            <Text style={styles.cardTitle}>Home Page Preferences</Text>
          </View>
          
          <Text style={styles.cardDescription}>
            Customize which trending charts and artist feeds are displayed on your Home screen. Choose languages and input favorite artists.
          </Text>

          <Text style={styles.inputLabel}>Select Languages:</Text>
          <View style={styles.langGrid}>
            {['Kannada', 'English', 'Hindi', 'Telugu', 'Tamil', 'Punjabi', 'Malayalam'].map((lang) => {
              const active = selectedLanguages.includes(lang);
              return (
                <TouchableOpacity
                  key={lang}
                  style={[styles.langChip, active && styles.langChipActive]}
                  onPress={() => toggleLanguage(lang)}
                >
                  <Text style={[styles.langChipText, active && styles.langChipTextActive]}>
                    {lang}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.inputLabel}>Favorite Artists (comma separated):</Text>
          <TextInput
            style={styles.input}
            placeholder="Puneeth Rajkumar, Taylor Swift, Anirudh Ravichander..."
            placeholderTextColor="#71717a"
            value={favArtistsText}
            onChangeText={setFavArtistsText}
            autoCorrect={false}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSavePreferences} disabled={isSavingPreferences}>
            <Save size={18} color="#000000" style={styles.buttonIcon} />
            <Text style={styles.saveButtonText}>{isSavingPreferences ? 'Saving...' : 'Save Preferences'}</Text>
          </TouchableOpacity>
        </View>

        {/* Gemini API Key Panel */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Key size={20} color="#a855f7" />
            <Text style={styles.cardTitle}>Gemini AI Integration</Text>
          </View>
          
          <Text style={styles.cardDescription}>
            Input your Gemini API Key to enable natural language "AI Vibe" playlists. If left blank, MuseFlow will run in fallback offline mode.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="AIzaSy..."
            placeholderTextColor="#71717a"
            value={apiKey}
            onChangeText={setApiKey}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveKey} disabled={isSaving}>
            <Save size={18} color="#000000" style={styles.buttonIcon} />
            <Text style={styles.saveButtonText}>{isSaving ? 'Saving...' : 'Save API Key'}</Text>
          </TouchableOpacity>
        </View>

        {/* Local Storage Panel */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Trash2 size={20} color="#f43f5e" />
            <Text style={styles.cardTitle}>Data & Caching</Text>
          </View>
          
          <Text style={styles.cardDescription}>
            Manage local on-device files. Clearing cache will delete your local favorites, playlist references, custom histories, and cached lyrics.
          </Text>

          <TouchableOpacity style={styles.dangerButton} onPress={handleClearHistory}>
            <Trash2 size={18} color="#ffffff" style={styles.buttonIcon} />
            <Text style={styles.dangerButtonText}>Clear Local Cache</Text>
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Info size={20} color="#a1a1aa" style={{ marginRight: 10, marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Privacy Policy</Text>
            <Text style={styles.infoText}>
              MuseFlow Mobile is a 100% serverless, local music streaming application. Your API keys, search logs, and playback data are stored locally in your phone's secure sandboxed storage and are never uploaded to any remote tracking servers.
            </Text>
          </View>
        </View>

        {/* About App */}
        <Text style={styles.footerText}>MuseFlow v1.0.0 (Android Client)</Text>
      </ScrollView>

      <LoginScreen
        visible={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={() => {
          setShowLogin(false);
          setIsAuthenticated(true);
          Alert.alert('Success', 'Successfully connected to YouTube Music!');
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 25,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#a1a1aa',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 10,
  },
  cardDescription: {
    fontSize: 13,
    color: '#a1a1aa',
    lineHeight: 18,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  rowLabel: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  proxyDetails: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
    paddingTop: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 11,
    color: '#71717a',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '500',
    marginTop: 4,
  },
  latencyContainer: {
    alignItems: 'flex-end',
    width: 100,
  },
  latencyValue: {
    fontSize: 13,
    color: '#a1a1aa',
    fontWeight: '700',
    marginTop: 4,
  },
  latencyGood: {
    color: '#10b981',
  },
  latencyBad: {
    color: '#ef4444',
  },
  rotateButton: {
    backgroundColor: '#27272a',
    borderWidth: 1,
    borderColor: '#3f3f46',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  rotateButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  inputLabel: {
    fontSize: 12,
    color: '#a1a1aa',
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#09090b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 12,
    padding: 12,
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 16,
  },
  proxyWarningText: {
    fontSize: 11,
    color: '#a1a1aa',
    lineHeight: 15,
  },
  saveButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '700',
  },
  buttonIcon: {
    marginRight: 8,
  },
  loginButton: {
    backgroundColor: '#f43f5e',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  connectedContainer: {
    width: '100%',
  },
  connectedText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  dangerButton: {
    backgroundColor: '#f43f5e20',
    borderWidth: 1,
    borderColor: '#f43f5e55',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerButtonText: {
    color: '#f43f5e',
    fontSize: 14,
    fontWeight: '700',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#27272a35',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#a1a1aa',
    lineHeight: 16,
  },
  footerText: {
    textAlign: 'center',
    color: '#71717a',
    fontSize: 12,
    fontWeight: '500',
  },
  langGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  langChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#09090b',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  langChipActive: {
    backgroundColor: '#a855f720',
    borderColor: '#a855f780',
  },
  langChipText: {
    fontSize: 12,
    color: '#a1a1aa',
    fontWeight: '600',
  },
  langChipTextActive: {
    color: '#a855f7',
  },
});
