## 2025-05-19 - JS-based Conditional Rendering vs CSS Media Queries
**Learning:** Using CSS media queries (`hidden lg:block` vs `lg:hidden`) for layout-specific component visibility (e.g., desktop vs mobile variants) causes React to instantiate duplicate components and run redundant background processes like `setInterval` or `useEffect` hooks. This significantly degrades performance, especially with components like Clocks and Timers.
**Action:** Prefer JS-based conditional rendering via a custom `useMediaQuery` hook over CSS media queries to ensure components are only rendered and instantiated when necessary.

## 2025-05-19 - Vanilla JS Pub/Sub Store with useSyncExternalStore
**Learning:** To share state between conditionally rendered layout variants without causing root-level re-renders by lifting state up, using a vanilla JS pub/sub store combined with React's `useSyncExternalStore` is highly effective. However, `getSnapshot` must return a stable reference (e.g., a cached object property) rather than a newly instantiated object literal to prevent React from triggering infinite re-render loops.
**Action:** When implementing custom Vanilla JS stores with `useSyncExternalStore`, ensure `getSnapshot` caches the state object and invalidates the cache only upon actual state emissions.
