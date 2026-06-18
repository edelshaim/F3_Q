## 2024-06-18 - Clock Re-render Optimization
**Learning:** The Clock component was rendering 60 times per minute by using a 1-second interval, despite only displaying the current minute on the UI.
**Action:** Use a recursive `setTimeout` to calculate the exact milliseconds remaining until the next minute rolls over, reducing unnecessary state updates.
