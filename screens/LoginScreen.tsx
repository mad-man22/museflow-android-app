import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator, Modal, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { X } from 'lucide-react-native';
import { AuthService } from '../services/auth';

interface LoginScreenProps {
  visible: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const INJECTED_JS = `
  (function() {
    var checkCookie = function() {
      if (document.cookie && document.cookie.includes('SID=')) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'COOKIES',
          cookies: document.cookie
        }));
      }
    };
    // Check immediately and poll
    checkCookie();
    var interval = setInterval(checkCookie, 1500);
  })();
  true;
`;

export const LoginScreen: React.FC<LoginScreenProps> = ({ visible, onClose, onLoginSuccess }) => {
  const [loading, setLoading] = useState(true);

  const handleMessage = async (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'COOKIES' && data.cookies) {
        console.log('[LoginScreen] Cookies captured successfully.');
        await AuthService.setCookies(data.cookies);
        onLoginSuccess();
      }
    } catch (e) {
      // Fallback if message is raw cookies
      const rawText = event.nativeEvent.data;
      if (rawText && rawText.includes('SID=')) {
        console.log('[LoginScreen] Raw cookies captured successfully.');
        await AuthService.setCookies(rawText);
        onLoginSuccess();
      }
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Connect YouTube Account</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.webviewContainer}>
          <WebView
            source={{
              uri: 'https://accounts.google.com/ServiceLogin?service=youtube&passive=true&continue=https%3A%2F%2Fmusic.youtube.com%2F',
            }}
            injectedJavaScript={INJECTED_JS}
            onMessage={handleMessage}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            style={styles.webview}
          />
          {loading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#FF0033" />
              <Text style={styles.loaderText}>Loading Google Login...</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#262626',
  },
  webviewContainer: {
    flex: 1,
    position: 'relative',
  },
  webview: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0D0D0D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 12,
    color: '#8A8A8A',
    fontSize: 14,
  },
});
