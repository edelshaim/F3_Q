## 2024-05-25 - React.memo() with useMemo is critical for nested loop optimization
**Learning:** Moving constant configuration arrays out of component scope or inner functions is required when using them within useMemo, otherwise it causes a dependency warning.
**Action:** Extract constant static arrays outside of hooks or the main component whenever they're used inside useMemo or useEffect dependency arrays.
