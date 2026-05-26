## 2026-05-26 - [Avoid Repeated O(N) Array Traversals During Render]
**Learning:** [In App.tsx, a state update like typing triggers a full re-render. Filtering a large static or mostly-static array (e.g. plan.exercises.filter) inside a map loop during the return statement causes compounding O(N) operations, which slows down rapid interactions like keystrokes.]
**Action:** [Pre-compute category groupings in a `useMemo` hook to shift filtering away from the render path, replacing O(N*C) operations on every re-render with an O(N) operation only when the list changes.]
