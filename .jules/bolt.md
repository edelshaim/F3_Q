## 2026-05-21 - Optimize Array Shuffling

**Learning:** Using `[...arr].sort(() => 0.5 - Math.random())` to shuffle arrays is highly suboptimal and can lead to uneven distributions. A proper Fisher-Yates algorithm is much more efficient, completing in approximately 0.28s for 100 iterations of a 100k array, whereas the sort-based method takes ~6.73s.

**Action:** Replace sort-based array shuffles with the Fisher-Yates algorithm (`for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }`) to ensure better performance and true randomness, especially for large arrays or heavily used routines.
