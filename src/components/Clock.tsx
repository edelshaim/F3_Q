import React, { useState, useEffect } from 'react';

interface ClockProps {
  variant: 'mobile' | 'desktop';
}

export const Clock: React.FC<ClockProps> = React.memo(({ variant }) => {
  // Lazy initialize to avoid instantiating new Date on every render
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextUpdate = () => {
      const now = new Date();
      // Only re-render when the minute changes, saving 59 renders per minute
      const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

      timeoutId = setTimeout(() => {
        setCurrentTime(new Date());
        scheduleNextUpdate();
      }, msUntilNextMinute);
    };

    scheduleNextUpdate();

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
