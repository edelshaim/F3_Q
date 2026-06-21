import React, { useState, useEffect } from 'react';

interface ClockProps {
  variant: 'mobile' | 'desktop';
}

export const Clock: React.FC<ClockProps> = React.memo(({ variant }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextTick = () => {
      const now = new Date();

      // Calculate exact milliseconds until the next minute starts
      const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

      // Schedule the next update exactly at the start of the next minute
      // Add a small buffer (50ms) to ensure we've definitely crossed the minute boundary
      timeoutId = setTimeout(() => {
        setCurrentTime(new Date());
        scheduleNextTick();
      }, msUntilNextMinute + 50);
    };

    // Schedule the first tick
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
