## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.

## 2024-05-21 - Optimization of string concatenation in loops
**Learning:** Appending characters one by one to a string in a loop (e.g. `currentWord += char`) creates a new string object each time, leading to significant overhead. When parsing data like CSVs, this can double the execution time compared to safer alternatives.
**Action:** Use `.substring(start, end)` to extract chunks of strings when iterating over an index, as it avoids generating intermediary strings for every character.
