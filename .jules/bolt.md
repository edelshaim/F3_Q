## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.
## 2025-02-28 - Lazy Initialization for React State Objects
**Learning:** In React components that render frequently or have expensive initial states (like creating a `new Date()`), using direct initialization `useState(new Date())` creates a new object on *every single render*, which is then immediately discarded by React. This creates unnecessary garbage collection pressure and CPU overhead.
**Action:** Always use lazy initialization `useState(() => new Date())` for object instantiations or expensive calculations to ensure the work is only performed once during the initial mount.
