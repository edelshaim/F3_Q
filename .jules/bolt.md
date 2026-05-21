## 2024-05-18 - Isolated High-Frequency Updates (Intervals)
**Learning:** React state variables triggered by `setInterval` (like a ticking clock updating every second) placed at the top level of an app will cause the entire component tree to re-render constantly.
**Action:** Extract high-frequency updating elements into isolated leaf components (like a `Clock` component). Combine this with `React.memo` and `useCallback` to prevent cascading renders on lists and parent components.
