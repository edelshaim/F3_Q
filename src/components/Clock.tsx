import React, { useState, useEffect } from 'react';

interface ClockProps {
  variant: 'mobile' | 'desktop';
}

export const Clock: React.FC<ClockProps> = React.memo(({ variant }) => {
  // Optimization: Use lazy initialization to avoid instantiating a new Date object on every re-render.
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    const scheduleNextUpdate = () => {
      const now = new Date();
      // Calculate milliseconds until the next exact minute.
      const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

      timerId = setTimeout(() => {
        setCurrentTime(new Date());
        scheduleNextUpdate();
      }, msUntilNextMinute);
    };

    // Optimization: Since the clock only displays down to the minute, we only need to update it once per minute.
    // We use a recursive setTimeout to sync perfectly with the system clock's minute boundary,
    // reducing re-renders from 60 per minute to just 1 per minute, and preventing interval drift.
    scheduleNextUpdate();

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
