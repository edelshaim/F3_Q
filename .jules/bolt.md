## 2026-05-21 - Grouping Array Iterations in Render Loops
**Learning:** React render loops can suffer from redundant O(N*M) operations when filtering arrays inside a mapping function.
**Action:** Use `useMemo` to group arrays once per dependency change (O(N)), then perform simple O(1) lookups during the render loop. This significantly cuts down unnecessary traversal overhead.
