## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.

## 2026-06-03 - Avoiding Root Re-renders with Shared State for Layout Variants
**Learning:** When using JS-based conditional rendering for layout variants (like a mobile and desktop instance of the same component that are never rendered at the same time but need shared state across resizes), lifting state to a parent wrapper component (e.g., `App.tsx`) creates a severe performance bottleneck if that state updates frequently (like a timer interval), because it triggers a re-render of the entire tree.
**Action:** Use a lightweight vanilla JS pub/sub store combined with `useSyncExternalStore` in the leaf components instead of lifting state to the root. This allows different component variants across the DOM to share identical state seamlessly and cleanly resume state when the window resizes, while only re-rendering the exact leaf component that is currently mounted.
