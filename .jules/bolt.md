## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.

## 2025-06-23 - Prevent Interval Drift and Optimize Re-renders in Clock Components
**Learning:** Using `setInterval(..., 1000)` for a clock component that only displays hours and minutes is inefficient and prone to interval drift caused by background tab throttling in browsers. This causes up to 60 unnecessary re-renders per minute.
**Action:** Use a recursive `setTimeout` that recalculates the exact milliseconds remaining until the next exact required boundary (e.g., the next minute) instead of a fixed interval. This eliminates interval drift and drastically reduces re-renders (down to exactly once per minute).
