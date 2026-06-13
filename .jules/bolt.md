## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.

## 2024-06-13 - Conditional Rendering with CSS vs JS
**Learning:** Using CSS classes like `hidden lg:block` to toggle component visibility for responsive layouts leaves hidden components mounted in the DOM. In this app, it caused the `WorkoutTimer` interval to run twice simultaneously, wasting CPU cycles and triggering redundant React state updates in the background. It also exposed a bug where timer state desynchronized when resizing between mobile and desktop views because the two instances didn't share state.
**Action:** When a conditionally rendered component has heavy side effects (like `setInterval` or expensive data fetching) or independent state, use JS-based conditional rendering (e.g. `useMediaQuery`) instead of CSS classes to ensure only the active instance is mounted and processing logic.
