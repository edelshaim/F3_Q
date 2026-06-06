## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.
## 2026-06-06 - Conditional Render vs CSS Hidden Components
**Learning:** The application was instantiating duplicate component trees and running redundant background intervals (setInterval in Clock and WorkoutTimer) for both desktop and mobile layouts simultaneously by hiding them with CSS (`hidden lg:block`).
**Action:** Use a JS-based `useMediaQuery` hook to conditionally render layout variants instead of relying on CSS media queries, and lift frequently updating state to an external store via `useSyncExternalStore` if state needs to persist across layout breakpoint changes.
