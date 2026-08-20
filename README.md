# ExploreYC Mobile 🚀

A modern, high-performance mobile application built with **React Native** and **Expo** to explore, analyze, and discover Y Combinator startups, founders, job openings, batches, and ecosystem trends.

---

## ✨ Features

- 🏢 **Company Directory & Search**: Browse thousands of YC startups with real-time search, multi-factor filtering (Batch, Industry, Region, Hiring Status), and infinite scrolling.
- 🗺️ **Interactive Startup Map**: Discover YC companies globally on an interactive map powered by **MapLibre** and **OpenFreeMap** with custom pins and clustered previews.
- 📊 **Analytics Dashboard**: Visual charts and bento-grid metrics tracking batch distributions, funding trends, industry breakdowns, and hiring stats.
- 👥 **Founders Directory & Leaderboard**: Explore founder profiles, metric rankings, and companies founded across YC history.
- 💼 **Startup Job Board**: Find and filter open positions across YC-backed companies.
- 💡 **Idea Validator & Success Predictor**: AI-assisted tools for validating startup concepts and predicting growth metrics against historical YC benchmarks.
- 🗳️ **Interactive Feature Roadmap**: Community-driven roadmap with live voting on upcoming features.
- 🌐 **Offline Resilience**: Built-in network monitoring with real-time connectivity status.

---

## 🛠️ Tech Stack

- **Core**: [React Native 0.86](https://reactnative.dev/) • [React 19](https://react.dev/) • [Expo SDK 57](https://expo.dev/) (New Architecture & React Compiler enabled)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based typed routing & native tabs)
- **Data Fetching & State**: [TanStack React Query v5](https://tanstack.com/query/latest) • [Axios](https://axios-http.com/)
- **Maps**: [@maplibre/maplibre-react-native](https://github.com/maplibre/maplibre-react-native) • [OpenFreeMap](https://openfreemap.org/)
- **Animations & UI**: [React Native Reanimated 4](https://docs.swmansion.com/react-native-reanimated/) • [Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) • [expo-image](https://docs.expo.dev/versions/latest/sdk/image/) • [expo-glass-effect](https://docs.expo.dev/)
- **Network & Diagnostics**: [@react-native-community/netinfo](https://github.com/react-native-netinfo/react-native-netinfo)

---

## 📁 Project Structure

```text
ExploreYCMobile/
├── android/                 # Android native project files
├── ios/                     # iOS native project files & workspace
├── assets/                  # App icons, splash screens, and branding assets
├── src/
│   ├── app/                 # Expo Router file-based screens and routes
│   │   ├── (home)/          # Home dashboard, company details, founders, roadmap
│   │   ├── (discover)/      # Interactive startup map & discover view
│   │   ├── (analytics)/     # Batch analytics, charts, and metrics
│   │   └── (job)/           # Startup job board & job detail cards
│   ├── assets/              # SVGs, icons, and static images
│   ├── components/          # Reusable UI components (Modals, CustomTabBar, Cards)
│   ├── data/                # Tab configurations and static definitions
│   ├── hooks/               # Custom React hooks
│   ├── network/             # Axios instance, interceptors, and environment config
│   ├── services/            # React Query API services and mutations
│   ├── theme/               # Colors, typography, spacing, and responsive scaling
│   ├── types/               # TypeScript interfaces and data models
│   └── utils/               # Formatting, styling helpers, and common utilities
├── .env.example             # Template environment configuration
├── app.json                 # Expo app configuration
└── package.json             # Dependencies and build scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [bun](https://bun.sh/)
- For **iOS**: macOS with [Xcode](https://developer.apple.com/xcode/) and CocoaPods installed
- For **Android**: [Android Studio](https://developer.android.com/studio) with configured SDK and emulator

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ExploreYCMobile.git
cd ExploreYCMobile
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` to specify your backend API endpoint:

```env
EXPO_PUBLIC_API_URL=http://localhost:8000/api
```

> **Note**: In Expo, environment variables accessible in client-side code must start with the `EXPO_PUBLIC_` prefix.

---

## 📱 Running the App

### iOS Simulator

```bash
npx expo run:ios
```

### Android Emulator

```bash
npx expo run:android
```

### Start Metro Dev Server

```bash
npx expo start
```

---

## 🗺️ Map Configuration

The interactive startup map on the Discover screen uses:
- **Renderer**: [@maplibre/maplibre-react-native](https://github.com/maplibre/maplibre-react-native)
- **Tile Server**: [OpenFreeMap](https://openfreemap.org/) (Free, open-source vector tiles under OpenStreetMap license)

Default style configured in `src/app/(discover)/discover.tsx`:
```
https://tiles.openfreemap.org/styles/bright
```

You can alternate styles using any OpenFreeMap style (e.g., `liberty`, `positron`, `dark`).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🤖 AI Agents & Assistant Tooling

This project is configured with modern agentic AI workflows, rule engines, and MCP toolsets:

- **[Google Antigravity (AGY)](https://deepmind.google/)**: Advanced Agentic AI pair programmer used for architecture design, refactoring, performance optimization, and codebase management.
- **[Software Mansion Argent](https://github.com/software-mansion/argent)**: Autonomous mobile MCP toolkit for iOS simulator and Android emulator interaction, UI testing loops, screenshot verification, and Hermes profiler analysis.
- **[Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) & [Cursor](https://www.cursor.com/)**: IDE agent configurations with custom project rules and MCP servers.

---

### 🧠 Agent Skills Inventory

The repository includes curated, version-locked skill definitions (`.agents/skills/`) to power agent workflows across engineering, mobile development, testing, and UI design:

#### 📱 React Native & Expo Development
- `react-native-best-practices` — Software Mansion best practices for production React Native & New Architecture (Fabric, TurboModules).
- `vercel-react-native-skills` — Vercel-curated guidelines for performant mobile rendering and list optimization.
- `expo-router` — File-based navigation, modal sheets, dynamic routes, and native tabs.
- `expo-ui` — Native SwiftUI & Jetpack Compose component integrations via `@expo/ui`.
- `expo-data-fetching` — Network requests, caching strategies, and offline-first React Query patterns.
- `expo-dev-client` & `expo-upgrade` — Custom native development clients and SDK version upgrades.
- `expo-examples` — Canonical reference implementations for integrations.

#### 🧪 Autonomous Device Control & Profiling (Argent MCP)
- `argent-device-interact` — Autonomous gesture control (tap, swipe, scroll, type) on iOS & Android targets.
- `argent-test-ui-flow` — End-to-end interact-screenshot-verify QA loops.
- `argent-react-native-profiler` & `argent-native-profiler` — Hermes CPU hotspot and re-render profiling.
- `argent-react-native-optimization` — Performance bottleneck diagnosis and render sweeps.
- `argent-metro-debugger` — Chrome DevTools Protocol (CDP) runtime inspection and React tree debugging.
- `argent-screenshot-diff` — Visual regression and screenshot comparison testing.
- `argent-ios-simulator-setup` & `argent-android-emulator-setup` — Automated simulator/emulator lifecycle management.
- `argent-tv-interact` & `argent-lens` — TV remote D-pad control and visual variant proposals.

#### 🎨 Design & UI/UX Systems
- `ui-ux-pro-max` — Design intelligence covering 67 UI styles, 161 palettes, and 99 UX heuristics.
- `design-system` — Token architecture (primitive → semantic → component) and component specs.
- `design`, `brand`, `ui-styling` — Visual identity, theme palettes, and styling guidelines.
- `banner-design` & `slides` — Visual asset generation and presentation systems.

#### 🏗️ Architecture & Planning Workflows (gstack)
- `plan-ceo-review`, `plan-eng-review`, `plan-design-review`, `plan-devex-review` — Multi-perspective plan reviews.
- `codebase-design` & `domain-modeling` — Deep module boundaries and ubiquitous domain language.
- `diagnosing-bugs` & `triage` — Structured debugging loops for hard regressions.
- `tdd` & `prototype` — Test-driven development and throwaway prototypes.
- `code-review` & `resolving-merge-conflicts` — Automated spec/standards review and git conflict resolution.
- `grilling`, `grill-me`, `grill-with-docs` — Stress-testing technical decisions and plans.
- `to-spec`, `to-tickets`, `wayfinder`, `handoff` — Spec generation, ticket decomposition, and context handoffs.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


