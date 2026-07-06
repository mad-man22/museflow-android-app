import './polyfills';
import { registerRootComponent } from 'expo';
import App from './App';
import TrackPlayer from 'react-native-track-player';

// Register the background playback service with the native task system.
// This MUST be called at the absolute entry point of the bundle, before any component renders.
// We use a dynamic require() so it is only loaded when the background service actually starts.
TrackPlayer.registerPlaybackService(() => require('./PlaybackService').PlaybackService);

// Register the main React application component.
registerRootComponent(App);
