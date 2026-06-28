import React, { useState, useEffect } from 'react';

interface ClockProps {
  variant: 'mobile' | 'desktop';
}

export const Clock: React.FC<ClockProps> = React.memo(({ variant }) => {
  // Use lazy initialization for state to prevent instantiating a new Date on every render
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextTick = () => {
      const now = new Date();
      // Calculate exactly how many milliseconds until the next full minute
      const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

      timeoutId = setTimeout(() => {
        setCurrentTime(new Date());
        scheduleNextTick(); // recursive timeout to avoid interval drift
      }, msUntilNextMinute);
    };

    // ⚡ Bolt Performance Optimization:
    // The clock only displays hours and minutes.
    // Instead of re-rendering every 1000ms (60 times per minute),
    // we calculate the exact time until the next minute boundary and only render once per minute.
    // This reduces background re-renders by ~98% and prevents interval drift.
    scheduleNextTick();

    return () => clearTimeout(timeoutId);
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
