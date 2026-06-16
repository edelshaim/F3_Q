import React, { useState, useEffect } from 'react';

interface ClockProps {
  variant: 'mobile' | 'desktop';
}

export const Clock: React.FC<ClockProps> = React.memo(({ variant }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Optimization: Clock only displays minutes.
    // By checking if the minute has actually changed and returning the previous
    // Date reference if it hasn't, React bails out of re-rendering, preventing
    // 59 unnecessary renders per minute.
    const timer = setInterval(() => {
      setCurrentTime((prevTime) => {
        const newTime = new Date();
        if (prevTime.getMinutes() === newTime.getMinutes()) {
          return prevTime;
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
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
