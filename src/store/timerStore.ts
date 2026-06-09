import { TimerStatus } from '../types';

export interface TimerState {
  seconds: number;
  status: TimerStatus;
}

type Listener = () => void;

class TimerStore {
  private state: TimerState = {
    seconds: 0,
    status: 'idle',
  };
  private listeners: Set<Listener> = new Set();
  private timerInterval: NodeJS.Timeout | null = null;
  private cachedSnapshot: TimerState | null = null;

  private emitChange() {
    this.cachedSnapshot = null; // Invalidate cache
    for (const listener of this.listeners) {
      listener();
    }
  }

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = (): TimerState => {
    if (!this.cachedSnapshot) {
      this.cachedSnapshot = { ...this.state };
    }
    return this.cachedSnapshot;
  };

  toggleTimer = () => {
    if (this.state.status === 'running') {
      this.state.status = 'paused';
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    } else {
      this.state.status = 'running';
      this.timerInterval = setInterval(() => {
        this.state.seconds += 1;
        this.emitChange();
      }, 1000);
    }
    this.emitChange();
  };

  resetTimer = () => {
    this.state.status = 'idle';
    this.state.seconds = 0;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.emitChange();
  };
}

export const timerStore = new TimerStore();
