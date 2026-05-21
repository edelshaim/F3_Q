## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.
## 2026-05-21 - Using Fake Timers with RTL
**Learning:** When using `vi.useFakeTimers()` in Vitest with React Testing Library, `userEvent` can cause timeouts because it relies on real timers internally.
**Action:** Use `fireEvent` instead of `userEvent` for interactions when `vi.useFakeTimers()` is active to prevent test timeouts.
