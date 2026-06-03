import React, { useSyncExternalStore } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';
import { timerStore } from '../store/timerStore';

// ⚡ Bolt Optimization:
// Previously, WorkoutTimer managed its own state, and having two conditionally
// rendered instances (for mobile and desktop) meant duplicate intervals and
// out-of-sync state when resizing the browser.
// Moving the state to the root App component fixed the sync issue but caused
// a severe performance regression by re-rendering the entire App every second.
// This useSyncExternalStore approach allows multiple WorkoutTimer components
// to share a single, performant global timer state without triggering root re-renders.
export const WorkoutTimer: React.FC = () => {
  const { seconds, status } = useSyncExternalStore(
    timerStore.subscribe,
    timerStore.getSnapshot
  );

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs > 0 ? hrs.toString().padStart(2, '0') + ':' : ''}${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
          onClick={timerStore.toggle}
          className={`p-3 sm:p-4 rounded-xl sm:rounded-full transition-all ${
            status === 'running'
              ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30'
              : 'bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30'
          }`}
        >
          {status === 'running' ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={timerStore.reset}
          className="p-3 sm:p-4 rounded-xl sm:rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 transition-all"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};
