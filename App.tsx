import './polyfills';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, StatusBar, Platform } from 'react-native';
import { Home, Search, Library, Settings } from 'lucide-react-native';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import LibraryScreen from './screens/LibraryScreen';
import SettingsScreen from './screens/SettingsScreen';
import PersistentPlayer from './components/PersistentPlayer';

type ScreenType = 'home' | 'search' | 'library' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');

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
      <View style={styles.tabBar}>
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
});
