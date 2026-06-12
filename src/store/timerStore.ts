import { TimerStatus } from '../types';

type Listener = () => void;

interface TimerState {
  seconds: number;
  status: TimerStatus;
}

class TimerStore {
  private state: TimerState = {
    seconds: 0,
    status: 'idle',
  };
  private listeners: Set<Listener> = new Set();
  private timerInterval: NodeJS.Timeout | null = null;

  // Returning the exact same object reference ensures useSyncExternalStore
  // doesn't cause infinite re-renders
  getSnapshot = () => {
    return this.state;
  };

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private notifyListeners = () => {
    for (const listener of this.listeners) {
      listener();
    }
  };

  private setState = (newState: Partial<TimerState>) => {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  };

  start = () => {
    if (this.state.status !== 'running') {
      this.setState({ status: 'running' });
      this.timerInterval = setInterval(() => {
        this.setState({ seconds: this.state.seconds + 1 });
      }, 1000);
    }
  };

  pause = () => {
    if (this.state.status === 'running') {
      this.setState({ status: 'paused' });
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    }
  };

  reset = () => {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.setState({ status: 'idle', seconds: 0 });
  };
}

export const timerStore = new TimerStore();
