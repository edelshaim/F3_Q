import React, { useState, useEffect } from 'react';

interface ClockProps {
  variant: 'mobile' | 'desktop';
}

export const Clock: React.FC<ClockProps> = React.memo(({ variant }) => {
  // ⚡ Bolt Optimization: Lazy initialize `useState` to prevent instantiating `new Date()` on every re-render.
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    const scheduleNextUpdate = () => {
      const now = new Date();
      setCurrentTime(now);

      // ⚡ Bolt Optimization: Calculate precise milliseconds until the next minute boundary.
      // This reduces re-renders from 60 per minute (using setInterval(1000)) to just 1 per minute.
      // Impact: ~98.3% reduction in component re-renders while keeping the HH:MM display perfectly synced.
      const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

      timerId = setTimeout(scheduleNextUpdate, msUntilNextMinute);
    };

    // Sync state in case a minute boundary crossed between initial render and useEffect execution
    setCurrentTime(new Date());

    // Initialize the first timeout
    const now = new Date();
    const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
    timerId = setTimeout(scheduleNextUpdate, msUntilNextMinute);

    return () => clearTimeout(timerId);
  }, []);

  if (variant === 'mobile') {
    return (
      <div className="text-right">
        <div className="text-[10px] font-mono text-slate-500 uppercase">
          {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    );
  }

  return (
    <div className="text-right">
      <div className="text-sm font-mono text-slate-500 uppercase tracking-widest">
        {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
      </div>
      <div className="text-xl font-mono font-bold text-slate-300">
        {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
});
