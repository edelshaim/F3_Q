## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.
## 2024-05-22 - React.memo and Intervals
**Learning:** `React.memo` prevents unnecessary render cycles and DOM reconciliation from executing when the parent renders. It does not stop a `setInterval` within a `useEffect` with an empty dependency array from setting up, as React already ensures that only runs once.
**Action:** Always provide precise comments when explaining what React.memo achieves. In timer components, it skips DOM updates when parent state changes.
