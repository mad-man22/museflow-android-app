# 🎵 MuseFlow

A premium, feature-rich music streaming app for Android built with **React Native** and **Expo**, powered by YouTube Music. MuseFlow delivers a beautiful dark-themed UI with smooth animations, real-time lyrics, and an intelligent auto-playing queue.

---

## ✨ Features

- 🔍 **Search** — Search any song, artist, or album via YouTube Music
- 🎧 **High-quality streaming** — Audio streamed directly from YouTube
- 📃 **Synced lyrics** — Real-time scrolling lyrics with 300ms look-ahead sync
- 📋 **Smart Queue** — Rolling 15-track queue with the current song always pinned at position 3
- 🔀 **Autoplay** — Automatically fetches recommended tracks to keep music playing
- ⏭️ **Skip & Seek** — Hardware-accelerated progress scrubber with zero lag
- 🔊 **Volume control** — Gesture-driven volume slider with native 60fps animations
- 🖼️ **Now Playing** — Full-screen player with album art, track info, and controls
- 📚 **Library** — Save and manage your favourite tracks
- 🔁 **Repeat & Shuffle** — Full playback mode controls
- 🌙 **Dark UI** — Premium dark-themed interface with glassmorphism and gradient effects

---

## 📸 Screenshots

> *(Add screenshots here)*

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo (managed workflow) |
| State management | Zustand |
| Audio playback | expo-av |
| UI animations | React Native Animated API + PanResponder |
| Lyrics | Custom time-synced lyrics parser |
| Music API | YouTube Music (via youtubei.js) |
| Build | EAS Build |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)

### Install & Run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/museflow-mobile.git
cd museflow-mobile

# Install dependencies
npm install

# Start the dev server
npm start
```

Scan the QR code with **Expo Go** on your Android/iOS device.

---

## 📦 Building an APK

This project uses [EAS Build](https://docs.expo.dev/build/introduction/) for cloud builds.

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Build APK (preview profile)
eas build -p android --profile preview
```

The APK download link will be provided after the build completes (~10-15 min).

---

## 📁 Project Structure

```
museflow-mobile/
├── App.tsx                  # Root app with navigation
├── app.json                 # Expo config
├── eas.json                 # EAS build profiles
├── components/
│   └── PersistentPlayer.tsx # Full-screen player + mini-player
├── screens/
│   ├── HomeScreen.tsx
│   ├── SearchScreen.tsx
│   ├── LibraryScreen.tsx
│   └── ...
├── services/
│   ├── ytmusic.ts           # YouTube Music API wrapper
│   ├── lyrics.ts            # Lyrics fetching & parsing
│   └── ...
├── store/
│   └── usePlaybackStore.ts  # Zustand global playback state
└── hooks/
    └── useYouTubeGuest.ts   # YouTube guest token hook
```

---

## ⚙️ Configuration

No API keys required! MuseFlow uses YouTube Music's public guest-token flow to fetch music and metadata.

---

## 📄 License

MIT — feel free to use, modify and distribute.
