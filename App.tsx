import './polyfills';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, StatusBar, Platform, Animated, Image } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Search, Library, Settings } from 'lucide-react-native';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import LibraryScreen from './screens/LibraryScreen';
import SettingsScreen from './screens/SettingsScreen';
import PersistentPlayer from './components/PersistentPlayer';

type ScreenType = 'home' | 'search' | 'library' | 'settings';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [showSplash, setShowSplash] = useState(true);
  const insets = useSafeAreaInsets();

  // Animated values for splash screen transitions
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(25)).current;
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const splashScale = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Entrance animation (Logo springs in and grows)
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 15,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 2. Text entrance & start breathing pulse on the inner logo
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(textTranslateY, {
          toValue: 0,
          tension: 25,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.12,
              duration: 900,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 0.94,
              duration: 900,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    });

    // 3. Exit animation after 2.8 seconds
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(splashOpacity, {
          toValue: 0,
          duration: 550,
          useNativeDriver: true,
        }),
        Animated.timing(splashScale, {
          toValue: 1.08,
          duration: 550,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowSplash(false);
      });
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'search':
        return <SearchScreen />;
      case 'library':
        return <LibraryScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090b" />
      
      {/* Active Screen Content */}
      <View style={styles.contentContainer}>
        {renderScreen()}
      </View>

      {/* Floating Persistent Media Player */}
      <PersistentPlayer />

      {/* Custom Bottom Tab Navigator */}
      <View style={[styles.tabBar, { height: 65 + insets.bottom, paddingBottom: insets.bottom }]}>
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setCurrentScreen('home')}
        >
          <Home size={22} color={currentScreen === 'home' ? '#a855f7' : '#a1a1aa'} />
          <Text style={[styles.tabLabel, currentScreen === 'home' && styles.activeTabLabel]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setCurrentScreen('search')}
        >
          <Search size={22} color={currentScreen === 'search' ? '#a855f7' : '#a1a1aa'} />
          <Text style={[styles.tabLabel, currentScreen === 'search' && styles.activeTabLabel]}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setCurrentScreen('library')}
        >
          <Library size={22} color={currentScreen === 'library' ? '#a855f7' : '#a1a1aa'} />
          <Text style={[styles.tabLabel, currentScreen === 'library' && styles.activeTabLabel]}>Library</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setCurrentScreen('settings')}
        >
          <Settings size={22} color={currentScreen === 'settings' ? '#a855f7' : '#a1a1aa'} />
          <Text style={[styles.tabLabel, currentScreen === 'settings' && styles.activeTabLabel]}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Animated Splash Screen Overlay */}
      {showSplash && (
        <Animated.View 
          style={[
            styles.splashContainer, 
            { 
              opacity: splashOpacity,
              transform: [{ scale: splashScale }]
            }
          ]}
        >
          <View style={styles.splashContent}>
            {/* Animated outer container for logo */}
            <Animated.View 
              style={[
                styles.logoImageContainer, 
                { 
                  opacity: logoOpacity, 
                  transform: [{ scale: logoScale }] 
                }
              ]}
            >
              {/* Glowing aura behind logo */}
              <View style={styles.logoAura} />

              {/* Breathing internal logo image animation */}
              <Animated.View style={{ transform: [{ scale: pulseAnim }], width: '100%', height: '100%' }}>
                <Image 
                  source={require('./assets/adaptive-icon.png')} 
                  style={styles.logoImage} 
                />
              </Animated.View>
            </Animated.View>

            {/* Title & subtitle block */}
            <Animated.View 
              style={{ 
                opacity: textOpacity, 
                transform: [{ translateY: textTranslateY }],
                alignItems: 'center' 
              }}
            >
              <Text style={styles.splashTitle}>MuseFlow</Text>
              <Text style={styles.splashSubtitle}>Stream your flow</Text>
            </Animated.View>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  contentContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  tabBar: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#18181be6',
    borderTopWidth: 1,
    borderTopColor: '#27272a70',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  tabLabel: {
    fontSize: 10,
    color: '#a1a1aa',
    fontWeight: '600',
    marginTop: 4,
  },
  activeTabLabel: {
    color: '#a855f7',
  },
  
  // Splash Screen Overlay Styles
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#09090b',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
  },
  splashContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImageContainer: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    position: 'relative',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  logoAura: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#a855f7',
    opacity: 0.12,
    shadowColor: '#a855f7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 35,
    elevation: 20,
  },
  splashTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 1.8,
    textAlign: 'center',
  },
  splashSubtitle: {
    fontSize: 14,
    color: '#a1a1aa',
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
    letterSpacing: 0.8,
  },
});
