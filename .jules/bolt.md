## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.

## 2024-05-22 - Interval drift and unnecessary re-renders in clocks
**Learning:** Using a fixed `setInterval` of 1000ms for a clock that only displays down to the minute causes 60 re-renders per minute where only 1 is needed. Furthermore, fixed intervals can drift over time or due to tab throttling.
**Action:** Use a recursive `setTimeout` that recalculates the exact milliseconds remaining until the next minute boundary (e.g. `60000 - (Date.now() % 60000)`). This prevents interval drift and drastically reduces React re-renders.
