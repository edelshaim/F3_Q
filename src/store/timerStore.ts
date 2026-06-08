import { TimerStatus } from '../types';

type Listener = () => void;

class TimerStore {
  private seconds = 0;
  private status: TimerStatus = 'idle';
  private listeners = new Set<Listener>();
  private intervalRef: NodeJS.Timeout | null = null;
  private snapshot = { seconds: 0, status: 'idle' as TimerStatus };

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private notify() {
    this.snapshot = { seconds: this.seconds, status: this.status };
    this.listeners.forEach((l) => l());
  }

  getSnapshot = () => {
    return this.snapshot;
  };

  toggle = () => {
    if (this.status === 'running') {
      this.status = 'paused';
      if (this.intervalRef) {
        clearInterval(this.intervalRef);
        this.intervalRef = null;
      }
    } else {
      this.status = 'running';
      this.intervalRef = setInterval(() => {
        this.seconds += 1;
        this.notify();
      }, 1000);
    }
    this.notify();
  };

  reset = () => {
    this.status = 'idle';
    this.seconds = 0;
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
      this.intervalRef = null;
    }
    this.notify();
  };
}

export const timerStore = new TimerStore();
