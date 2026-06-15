## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.

## 2025-02-20 - Set-based Random Sampling for Large Arrays
**Learning:** For picking a small number of items from a large array (like 15 items from 3500+ in `exercises.json`), making an O(N) copy `[...arr]` and performing a Fisher-Yates shuffle is computationally and memory expensive. Using a `Set` to track selected indices is an O(K) operation and drastically cuts down GC pauses.
**Action:** Always prefer a Set-based tracking approach when `k` (sample size) is significantly smaller than `N` (population size) to avoid unnecessary allocations and iteration over the entire dataset.
