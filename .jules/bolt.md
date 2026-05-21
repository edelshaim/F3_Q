## 2024-05-21 - Optimization of large static assets
**Learning:** Loading large, static JSON files (like 300KB) statically at the top of a React file forces the bundler to include it in the main chunk, significantly slowing down initial load time.
**Action:** Use dynamic imports (e.g., `await import('./data.json')`) inside event handlers when the data is not immediately needed on initial render. This allows Vite to automatically code-split the JSON into a separate chunk.
## 2024-05-21 - Explicit Vitest Imports for Type Checking
**Learning:** In projects where `tsconfig.json` does not include types for `vitest/globals`, you must explicitly import testing primitives like `describe`, `it`, `expect`, `vi`, `beforeEach` directly from `vitest`. Otherwise `npm run lint` (`tsc --noEmit`) will fail with type errors.
**Action:** When adding Vitest to a Vite project, always import testing functions from `vitest` rather than relying on globals unless `tsconfig.json` is explicitly updated.
