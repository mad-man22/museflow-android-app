<div align="center">

<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Zustand-FF6B35?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/YouTube_Music-FF0000?style=for-the-badge&logo=youtube-music&logoColor=white" />

<br />

<a href="https://github.com/mad-man22/museflow-android-app"><img src="https://api.visitorbadge.io/api/VisitorHit?user=mad-man22&repo=museflow-android-app&label=Visits&style=for-the-badge&countColor=%238A2BE2" alt="Visits" /></a>
<a href="https://github.com/mad-man22/museflow-android-app/releases"><img src="https://img.shields.io/github/downloads/mad-man22/museflow-android-app/total?style=for-the-badge&logo=github&color=brightgreen&v=1.3.0" alt="Downloads" /></a>

<br /><br />

<h1>🎵 MuseFlow</h1>

<p><strong>A premium, feature-rich music streaming app for Android — built with React Native & Expo, powered by YouTube Music.</strong></p>

<p>MuseFlow delivers a beautiful dark-themed UI with real-time synced lyrics, native background audio playback, lock screen media integration, and a P2P co-listening Jam Room.</p>

<br />

<!-- ╔══════════════════════════════════╗ -->
<!--        APK DOWNLOAD BUTTON         -->
<!-- ╚══════════════════════════════════╝ -->
<a href="https://expo.dev/artifacts/eas/v-himkdTzKuzEHuJEZ0kAr_UD-WhnLSPMrvBjWsuwio.apk">
  <img src="https://img.shields.io/badge/⬇️%20Download%20APK-v1.3.0-brightgreen?style=for-the-badge&logo=android&logoColor=white" alt="Download APK" />
</a>

<br /><br />

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Search** | Search any song, artist, or album via YouTube Music |
| 🔒 **Background Play** | Native background playback running independently of the JS thread (via `react-native-track-player`) |
| 🎛️ **Media Sessions** | Integrated Android lock screen player controls and native hardware volume key synchronization |
| 🎧 **Bluetooth Controls** | Remote hardware controls support (Earphones, Bluetooth, Smartwatches) |
| 📡 **Jam Room** | Peer-to-Peer co-listening rooms using WebRTC (PeerJS) for real-time play/pause/seek synchronization |
| 🏠 **Custom Home Feed** | Dynamic, personalized homepage feeds matching chosen language and favorite artist preferences |
| 📋 **Synced Lyrics** | Real-time scrolling lyrics with 300ms look-ahead active line highlighting |
| 🔀 **Autoplay & Queue** | Next-track preloading and automatic queue padding for endless streaming |
| 🌙 **Dark UI** | Modern glassmorphic dark mode design with sleek animations |

---

## 📸 Screenshots

<p align="center">
  <img src="assets/screenshots/ss1.jpeg" width="22%" alt="Screenshot 1" />
  <img src="assets/screenshots/ss2.jpeg" width="22%" alt="Screenshot 2" />
  <img src="assets/screenshots/ss3.jpeg" width="22%" alt="Screenshot 3" />
  <img src="assets/screenshots/ss4.jpeg" width="22%" alt="Screenshot 4" />
</p>
<p align="center">
  <img src="assets/screenshots/ss5.jpeg" width="22%" alt="Screenshot 5" />
  <img src="assets/screenshots/ss6.jpeg" width="22%" alt="Screenshot 6" />
  <img src="assets/screenshots/ss7.jpeg" width="22%" alt="Screenshot 7" />
  <img src="assets/screenshots/ss8.jpeg" width="22%" alt="Screenshot 8" />
</p>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         MuseFlow App                        │
│                                                             │
│  ┌──────────────┐   ┌──────────────┐   ┌────────────────┐  │
│  │  Screens     │   │  Components  │   │   Services     │  │
│  │              │   │              │   │                │  │
│  │ HomeScreen   │   │ Persistent   │   │ ytmusic.ts     │  │
│  │ SearchScreen │──▶│ Player.tsx   │──▶│ (YT Music API) │  │
│  │ LibraryScreen│   │              │   │                │  │
│  │ JamScreen    │   │ Mini Player  │   │ lyrics.ts      │  │
│  │ SettingsScreen   │ Full Player  │   │ (Lyrics fetch) │  │
│  └──────┬───────┘   │ Scrubbers    │   │                │  │
│         │           │ LyricsDisplay│   │ parser.ts      │  │
│         │           └──────┬───────┘   │ (Parsing engine│  │
│         ▼                  ▼           └────────────────┘  │
│  ┌─────────────────────────────────┐                       │
│  │       Zustand Store             │                       │
│  │    usePlaybackStore.ts          │  ┌────────────────┐  │
│  │                                 │  │   Polyfills    │  │
│  │  currentTrack  │  queue         │  │                │  │
│  │  currentTime   │  isPlaying     │──▶ polyfills.ts    │  │
│  │  volume        │  isShuffle     │  │ (WebRTC mocks) │  │
│  └────────────────┬────────────────┘  └────────────────┘  │
│                   │                                        │
│                   ▼                                        │
│  ┌─────────────────────────────────┐                       │
│  │   react-native-track-player     │                       │
│  │  (Android Foreground Service)  │                       │
│  │                                 │                       │
│  │  ┌───────────────────────────┐  │                       │
│  │  │    PlaybackService.ts     │  │                       │
│  │  │   (Headless JS Task)      │  │                       │
│  │  └───────────────────────────┘  │                       │
│  └─────────────────────────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

### Native Playback Pipeline

1. **Service Registration:** The native background playback service ([PlaybackService.ts](file:///c:/Users/Keertan%20BJ/.gemini/antigravity/scratch/museflow-mobile/PlaybackService.ts)) is registered at the entry point of the bundle ([index.js](file:///c:/Users/Keertan%20BJ/.gemini/antigravity/scratch/museflow-mobile/index.js)) via `TrackPlayer.registerPlaybackService`.
2. **Headless Execution:** When the app goes to sleep or is locked, the JavaScript thread suspends. However, Android's `MusicService` continues running natively.
3. **Bluetooth & Lock Screen Events:** Physical headphone clicks, Bluetooth commands, and lock screen controls communicate directly with the native service, which changes state and synchronizes with the Zustand store via dynamic event listeners.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React Native 0.81 + Expo 54 |
| **Bridge Mode** | Legacy Bridge (New Architecture disabled for RNTP compatibility) |
| **State** | Zustand |
| **Audio Engine** | `react-native-track-player` (v4.1.2) |
| **P2P Synced Rooms** | `react-native-webrtc` + PeerJS |
| **Volume Manager** | `react-native-volume-manager` |
| **YouTube API** | YouTube Music via `youtubei.js` |
| **Build** | EAS Build (cloud/local) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Android SDK (or Android Studio) / JDK 17 for local native compilation

### Setup

```bash
# Clone the repository
git clone https://github.com/mad-man22/museflow-android-app.git
cd museflow-android-app

# Install dependencies and apply native Kotlin 2.x compile patches
npm install
```

---

## 📦 Build Preview APK

Because this app utilizes custom native code (TrackPlayer & WebRTC), it cannot run in the generic **Expo Go** app. You must build a preview build:

### Option A: Local Build (Free)
Run this command in a standard Command Prompt window:
```cmd
eas build -p android --profile preview --local
```

### Option B: Cloud Build (Requires EAS Credits)
```bash
eas build -p android --profile preview
```

---

## 📄 License

MIT — feel free to use, modify, and distribute.
