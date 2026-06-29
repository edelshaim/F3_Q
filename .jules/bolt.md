## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.

## 2026-06-29 - Time-aligned React intervals
**Learning:** Running `setInterval` for components that only display down to the minute (e.g., a clock) causes 60 unnecessary re-renders per minute and is susceptible to drift when tabs are backgrounded.
**Action:** Use a recursive `setTimeout` that calculates the exact milliseconds until the next minute boundary (`(60 - now.getSeconds()) * 1000 - now.getMilliseconds()`) to sync perfectly with the system clock, reducing re-renders to 1 per minute and preventing drift.
