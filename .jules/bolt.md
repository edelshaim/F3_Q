## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.
## 2025-06-08 - [useSyncExternalStore Stability]
**Learning:** When using `useSyncExternalStore` with a custom vanilla JS store, ensure that the `getSnapshot` method returns a stable reference (e.g., a cached object property) rather than a newly instantiated object literal. Returning a new object on every call causes React to trigger infinite re-render loops.
**Action:** Always verify `getSnapshot` returns a stable snapshot reference in vanilla JS stores.
