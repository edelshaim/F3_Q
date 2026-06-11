## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.

## 2024-06-11 - Optimize Layout Rendering with Shared State
**Learning:** In a codebase using CSS media queries (e.g., `lg:hidden`) for rendering desktop vs. mobile components, React instantiates both components simultaneously. If these components maintain local state or background processes (like intervals in `WorkoutTimer`), this duplicates workload unnecessarily and breaks shared context.
**Action:** Extract state and background logic to a shared vanilla JS store (pub/sub with `useSyncExternalStore`), and use JS-based conditional rendering (`useMediaQuery`) to ensure only one component variant mounts and interacts with the store at a time.
