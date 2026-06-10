## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.
## 2026-06-10 - Shared store layout synchronization pattern
**Learning:** Found that relying on CSS `display: hidden` for layout variations (mobile vs desktop) leaves duplicate React component instances mounted in the DOM. In the case of the `WorkoutTimer`, this meant two intervals running in the background and firing double state updates/renders globally on every tick.
**Action:** When components are functionally identical but structurally separated for layout purposes, avoid CSS `display: none` hiding. Instead, extract their local state into a vanilla JS pub/sub store via `useSyncExternalStore`, and conditionally mount only one instance using a synchronous JS `useMediaQuery`.
