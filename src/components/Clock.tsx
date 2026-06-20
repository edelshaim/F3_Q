import React, { useState, useEffect } from 'react';

interface ClockProps {
  variant: 'mobile' | 'desktop';
}

export const Clock: React.FC<ClockProps> = React.memo(({ variant }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const now = new Date();
      setCurrentTime(now);

      // Calculate exact milliseconds until the next minute boundary to prevent interval drift
      // and reduce re-renders from 60 per minute down to 1 per minute.
      const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
      timeoutId = setTimeout(tick, msUntilNextMinute);
    };

    const now = new Date();
    // Initial calculation to sync the first update to the exact start of the next minute
    const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
    timeoutId = setTimeout(tick, msUntilNextMinute);

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
