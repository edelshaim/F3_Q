## 2024-05-24 - Grouping computation on render
**Learning:** In a large React component with arrays of state mapping to items, repeatedly iterating to filter items for nested sub-lists on every render cycle blocks the main thread. Specifically, finding an active exercise by ID `find()` and splitting categories into `filter()` calls triggered on every internal state change scales linearly `O(n * c)`.
**Action:** Lift array computations in `App` out of the render loop by utilizing `useMemo` for derived states, ensuring filtering only occurs when the `plan.exercises` array reference changes.
