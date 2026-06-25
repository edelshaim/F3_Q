## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.
## 2025-03-09 - [Reduce Clock Re-renders]
**Learning:** Utilizing a naive `setInterval` of 1000ms for a clock component that only shows minutes/hours results in 60x more re-renders than necessary, which causes unnecessary performance overhead, especially on low-powered devices.
**Action:** Use a recursive `setTimeout` that recalculates the exact time remaining until the next exact minute boundary instead of a fixed `setInterval` to reduce re-renders and avoid browser throttling issues.
