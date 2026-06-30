## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.
## 2026-06-30 - Precision interval timers to prevent over-rendering
**Learning:** Using `setInterval` with a fixed 1000ms delay for a clock that only displays hours and minutes results in 59 unnecessary state updates per minute.
**Action:** Use a recursive `setTimeout` that calculates the exact milliseconds until the next required boundary (e.g., the next exact minute) instead of a fixed interval. This eliminates unnecessary re-renders and guards against timer drift.
