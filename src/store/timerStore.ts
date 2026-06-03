import { TimerStatus } from '../types';

type Listener = () => void;
type TimerState = { seconds: number; status: TimerStatus };

let seconds = 0;
let status: TimerStatus = 'idle';
let interval: NodeJS.Timeout | null = null;
const listeners = new Set<Listener>();

const notify = () => listeners.forEach((l) => l());

// Create an immutable snapshot for useSyncExternalStore
let currentSnapshot: TimerState = { seconds, status };

const updateSnapshot = () => {
  currentSnapshot = { seconds, status };
  notify();
};

export const timerStore = {
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot: () => currentSnapshot,
  toggle: () => {
    status = status === 'running' ? 'paused' : 'running';
    if (status === 'running') {
      if (!interval) {
        interval = setInterval(() => {
          seconds++;
          updateSnapshot();
        }, 1000);
      }
    } else if (interval) {
      clearInterval(interval);
      interval = null;
    }
    updateSnapshot();
  },
  reset: () => {
    status = 'idle';
    seconds = 0;
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    updateSnapshot();
  },
};
