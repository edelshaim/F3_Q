import React, { useState, useEffect } from 'react';

interface ClockProps {
  variant: 'mobile' | 'desktop';
}

// ⚡ Bolt: Wrapped Clock in React.memo to prevent unnecessary re-renders when parent App updates.
// This prevents the component's render function and DOM reconciliation from executing when the parent renders.
export const Clock: React.FC<ClockProps> = React.memo(({ variant }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
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
