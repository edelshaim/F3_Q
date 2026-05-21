## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.
## 2024-07-25 - [Fixing Code Health Issue with handleGenerate in App.tsx]
**Learning:** Removing unused variables without cleaning up imports can lead to compilation errors.
**Action:** When removing unused variables, search for occurrences using grep to ensure completely dead code removal.
