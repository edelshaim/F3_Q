import React, { useState, useEffect } from 'react';

interface ClockProps {
  variant: 'mobile' | 'desktop';
}

export const Clock: React.FC<ClockProps> = React.memo(({ variant }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const scheduleNextUpdate = () => {
      // ⚡ Bolt: Calculate exact ms until the next minute to avoid interval drift
      // and reduce re-renders from 60/min to 1/min since UI only shows minutes.
      const now = new Date();
      const msUntilNextMinute = 60000 - (now.getTime() % 60000);

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
