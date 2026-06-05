## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.
## 2026-06-05 - Duplicate Components with CSS Hidden Class
**Learning:** Using `hidden lg:block` to toggle layout-specific components (like WorkoutTimer and Clock) causes duplicate instantiations. Because these components have `setInterval` logic, they were running multiple background intervals unnecessarily. Also, conditionally unmounting these variants means their local state is lost.
**Action:** Use JS-based conditional rendering (e.g., via `useMediaQuery`) instead of CSS hidden classes for components with background tasks or complex logic. Extract local state into a vanilla JS pub/sub store (and `useSyncExternalStore`) to persist state across layout unmounts without causing root-level re-renders.
