## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.

## 2024-06-16 - Prevent unnecessary interval re-renders
**Learning:** `setInterval` updating state every second with `new Date()` causes a React component to re-render every second. If the component only displays hours and minutes, 59 out of 60 renders per minute are completely wasted.
**Action:** When updating time states inside an interval, compare the relevant parts (e.g., minutes) of the previous time and the new time. Return the previous state reference (`prevTime`) if there's no visual change, allowing React to properly bail out of the render pipeline.
