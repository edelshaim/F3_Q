## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.

## 2024-07-02 - Clock Re-render Optimization
**Learning:** Using a recursive `setTimeout` that recalculates milliseconds to the exact next minute boundary is a precise way to avoid unnecessary interval ticks and prevents drift caused by background tab throttling, reducing UI re-renders for HH:MM clocks by ~98%.
**Action:** When implementing clocks or timers that only display hours/minutes, avoid using fixed 1-second `setInterval`s. Instead, schedule a recursive timeout that targets the exact next required boundary.
