## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.
## 2024-05-22 - JS vs CSS media query rendering optimizations
**Learning:** Hiding layout-specific components (like desktop/mobile navigation or timers) via CSS media queries (`hidden lg:block`) still instantiates the React component and runs background intervals, state updates, and hooks.
**Action:** Use a JS `useMediaQuery` hook (`isDesktop = useMediaQuery(...)`) combined with conditional rendering (`{isDesktop && <Component />}`) to prevent duplicate React subtrees from existing simultaneously. Use `useSyncExternalStore` and a vanilla JS store (e.g., `timerStore`) to share state between the layout variants, so they stay perfectly in sync when the window is resized, without causing excessive root re-renders.
