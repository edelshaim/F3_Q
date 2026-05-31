## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.

## 2024-06-03 - Avoid Duplicate Components Hidden by CSS
**Learning:** Using CSS classes like `hidden lg:block` to show/hide complex components (like timers and clocks) based on viewport size instantiates both components in the React tree, running redundant state updates and intervals in the background.
**Action:** Use JS-based conditional rendering (e.g. `useMediaQuery` hook) to mount only the visible variant of a component, reducing background workload and preventing unnecessary memory usage.
