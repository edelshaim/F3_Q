## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.

## 2024-05-23 - Random Sampling Performance with O(N log N) Sorting
**Learning:** Using `[...arr].sort(() => 0.5 - Math.random())` to randomly sample items from an array is an anti-pattern. Not only does it introduce bias (it's not a truly uniform shuffle), but it is also $O(N \log N)$ time complexity and involves copying the whole array. When sampling a small number of items from a large dataset, this creates a measurable performance bottleneck.
**Action:** Use a partial Fisher-Yates shuffle instead. It runs in $O(K)$ time (where $K$ is the number of samples requested) and $O(N)$ space (for the shallow copy), making it significantly faster for large datasets while guaranteeing uniform randomness.
