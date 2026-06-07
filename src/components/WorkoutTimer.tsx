import React, { useSyncExternalStore, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';
import { timerStore } from '../store/timerStore';

interface TimerProps {
  onTick?: (seconds: number) => void;
}

export const WorkoutTimer: React.FC<TimerProps> = ({ onTick }) => {
  const { seconds, status } = useSyncExternalStore(timerStore.subscribe, timerStore.getState);

  useEffect(() => {
    if (onTick && status === 'running') {
      onTick(seconds);
    }
  }, [seconds, status, onTick]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs > 0 ? hrs.toString().padStart(2, '0') + ':' : ''}${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    timerStore.toggle();
  };

  const resetTimer = () => {
    timerStore.reset();
  };

  return (
    <div className="glass-panel p-4 sm:p-6 flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-4 shadow-2xl lg:shadow-none">
      <div className="flex flex-col lg:items-center">
        <div className="flex items-center space-x-2 text-slate-400 uppercase tracking-widest text-[10px] font-mono">
          <TimerIcon size={12} />
          <span>Duration</span>
        </div>
        <div className="text-3xl lg:text-6xl font-mono font-bold text-emerald-400 timer-glow tabular-nums leading-none mt-1 lg:mt-2">
          {formatTime(seconds)}
        </div>
      </div>

      <div className="flex space-x-2 sm:space-x-4">
        <button
          onClick={toggleTimer}
          className={`p-3 sm:p-4 rounded-xl sm:rounded-full transition-all ${
            status === 'running'
              ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30'
              : 'bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30'
          }`}
        >
          {status === 'running' ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={resetTimer}
          className="p-3 sm:p-4 rounded-xl sm:rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 transition-all"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};
