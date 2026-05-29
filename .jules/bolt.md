## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.
## 2024-05-29 - O(N log N) Array Sorting for Randomization is an Anti-Pattern
**Learning:** Using `[...arr].sort(() => 0.5 - Math.random())` for getting random elements is extremely inefficient (O(N log N)) and can bias selection, which was especially problematic when dealing with an 800+ item exercise JSON.
**Action:** Always prefer an O(K) partial Fisher-Yates shuffle when picking a subset of random items from a large array. Ensure to test node scripts correctly using `.cjs` extension or `import` syntax when the project defines `"type": "module"`.
