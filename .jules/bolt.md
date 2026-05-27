## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.

## 2026-05-27 - O(N log N) sorting pattern on dynamic imports
**Learning:** The codebase has a pattern of using `[...arr].sort(() => 0.5 - Math.random())` to pick random subsets from huge dynamically-loaded JSON arrays (e.g., exercises.json). This causes severe blocking since it copies and performs O(N log N) sorting on 3500+ items just to pick a handful of entries, creating noticeable latency immediately after the async import resolves.
**Action:** Always replace `sort(() => 0.5 - Math.random())` with O(k) set-based index generation when picking subsets from large datasets, especially after an asynchronous dynamic import bottleneck.
