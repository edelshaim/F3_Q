# F3 Q-Sheet — Enhancement Ideas

## 1. Workout History & Analytics Dashboard

Right now every beatdown is ephemeral — once you start a new plan, the old one is gone. Add a **history panel** that auto-saves each completed workout (title, date, location, duration, exercises completed vs. skipped) to `localStorage` (or a lightweight backend like Supabase). Surface simple analytics: total beatdowns led, average duration, most-used exercises, and a streak tracker. This turns the app from a one-shot planner into a personal Q logbook.

**Key tasks:**
- Design a `WorkoutHistory` data model with timestamps and completion stats
- Build a history list view with search/filter by date and location
- Add a small analytics summary card (total Qs, avg duration, top exercises)
- Persist history in `localStorage` with an optional cloud-sync upgrade path

---

## 2. Activate & Expand the AI-Powered Beatdown Generator

The Gemini API integration and natural-language import modal are already stubbed out in the code. Wire them up so a Q can type something like *"30-minute leg-heavy beatdown with a mosey warm-up"* and get a structured plan back. Layer on **themed templates** (e.g., "Murph prep", "Beach bootcamp", "Beginner-friendly") that the AI uses as constraints. This is the highest-leverage feature since the plumbing already exists.

**Key tasks:**
- Complete the `NLImportModal` integration with the Gemini API
- Map AI responses back to the existing `Exercise` type and exercise library
- Add a template selector with pre-built prompt scaffolds
- Handle API errors, rate limits, and loading states gracefully

---

## 3. Shareable Workout Links & QR Codes

After building a beatdown, let the Q **export it as a shareable URL** (encode the plan in a compact query-string or short hash) or generate a **QR code** on-screen. Fellow PAX can scan the code at the AO to pull up the workout on their own phones and follow along. This also enables a community "beatdown library" where top-rated plans can be browsed and cloned.

**Key tasks:**
- Serialize workout plans into a compact, URL-safe format (e.g., base64 + compression)
- Add a "Share" button that copies the link and/or renders a QR code (use `qrcode.react`)
- Build a landing route that hydrates a plan from the URL on load
- Optionally add a public gallery of community-submitted beatdowns

---

## 4. Live Workout Mode with Section Timers & Audio Cues

Upgrade the existing global timer into a **guided workout mode**: assign target durations to each section (Warm-up: 5 min, The Thang: 20 min, etc.) and show countdown progress bars. Add optional **audio cues** (a beep or voice call like "Time! Move to The Thang") so the Q doesn't have to keep glancing at the screen. Include a "next exercise" preview and auto-advance through the list as exercises are marked complete.

**Key tasks:**
- Extend the `WorkoutTimer` component with per-section countdown support
- Add a progress bar UI for each category showing time remaining
- Integrate the Web Audio API or simple `<audio>` elements for cue sounds
- Build an auto-advance flow that highlights the current exercise and previews the next

---

## 5. Offline-First PWA with Background Sync

The manifest is already in place, but the app isn't fully offline-capable. Add a **service worker** with Workbox to cache the shell, exercise JSON, and saved plans so the app works at AOs with spotty cell service. When connectivity returns, sync any saved history or shared links. Combine this with an **install prompt banner** to drive adoption as a home-screen app.

**Key tasks:**
- Configure `vite-plugin-pwa` with a Workbox-powered service worker
- Pre-cache the app shell, `exercises.json`, and static assets
- Add a custom install prompt banner for mobile browsers
- Implement background sync for workout history when connectivity is restored
