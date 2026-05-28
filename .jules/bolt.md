## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.

## 2024-05-28 - Avoid Array.prototype.sort() for randomization
**Learning:** Using `[...arr].sort(() => 0.5 - Math.random())` for randomizing or extracting random items is extremely inefficient O(N log N) for large datasets (like the 890 exercise list) and not truly uniform. A partial Fisher-Yates shuffle is vastly faster.
**Action:** When a random selection subset is needed, write a partial Fisher-Yates implementation which performs in O(N) (due to array copy) and O(k) for selection, preventing performance degradation on large arrays.
