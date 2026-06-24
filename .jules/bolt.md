## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.
## 2024-05-22 - Reducing digital clock re-renders
**Learning:** Using `setInterval(() => setDate(new Date()), 1000)` on a clock component that only displays hours and minutes is highly inefficient. It triggers 60 re-renders per minute when only 1 is necessary. It also suffers from interval drift in background tabs.
**Action:** Instead of `setInterval`, use a recursive `setTimeout` that calculates the exact milliseconds until the next minute boundary (`60000 - (Date.now() % 60000)`). This prevents interval drift and drastically reduces React re-renders.
