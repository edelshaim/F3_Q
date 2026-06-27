import React, { useState, useEffect } from 'react';

interface ClockProps {
  variant: 'mobile' | 'desktop';
}

export const Clock: React.FC<ClockProps> = React.memo(({ variant }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // ⚡ Bolt: Performance optimization
    // The clock only displays hours and minutes. Instead of updating every second
    // (60 renders per minute), we calculate the exact ms until the next minute starts
    // and update precisely when needed (1 render per minute).
    // This reduces re-renders by 98% and avoids interval drift from background tab throttling.
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextUpdate = () => {
      const now = new Date();
      // Calculate ms until the start of the next minute
      const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

      timeoutId = setTimeout(() => {
        setCurrentTime(new Date());
        scheduleNextUpdate(); // Recursively schedule the next update
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
