## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.

## 2024-05-22 - Clock Component Interval Drift and Unnecessary Renders
**Learning:** `setInterval` does not calculate drift, so a backgrounded tab will cause timers to lose accuracy. Also, firing a render every 1 second (1000ms) for a component that only displays hours and minutes causes 59 unnecessary renders per minute.
**Action:** Use a recursive `setTimeout` that calculates `(60 - now.getSeconds()) * 1000 - now.getMilliseconds()` to update the state precisely at the next minute boundary. This fixes interval drift and drastically reduces re-render frequency.
