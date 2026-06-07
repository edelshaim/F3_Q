## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.
## 2026-06-07 - Prevent Duplicate Component Instantiation via JS Conditional Rendering
**Learning:** Using CSS media queries (`hidden lg:block`, `lg:hidden`) to conditionally render layout variants of the same component causes both variants to mount, potentially duplicating state, API calls, and background tasks (like `setInterval`).
**Action:** Use a JS-based custom hook (`useMediaQuery`) along with a pub/sub external store (`useSyncExternalStore`) to ensure only the necessary layout variant mounts while seamlessly sharing the same state, thereby reducing overhead and bugs.
