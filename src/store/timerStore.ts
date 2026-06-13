import { TimerStatus } from '../types';

interface TimerState {
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
  private intervalId: NodeJS.Timeout | null = null;
  private subscribersToTick: Set<(seconds: number) => void> = new Set();

  getSnapshot = (): TimerState => {
    return this.state;
  };

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  onTick = (callback: (seconds: number) => void) => {
    this.subscribersToTick.add(callback);
    return () => {
      this.subscribersToTick.delete(callback);
    };
  };

  private emitChange() {
    this.state = { ...this.state }; // Ensure stable reference update
    for (const listener of this.listeners) {
      listener();
    }
  }

  toggle = () => {
    if (this.state.status === 'running') {
      this.state.status = 'paused';
      this.stopInterval();
      this.emitChange();
    } else {
      this.state.status = 'running';
      this.startInterval();
      this.emitChange();
    }
  };

  reset = () => {
    this.state.status = 'idle';
    this.state.seconds = 0;
    this.stopInterval();
    this.emitChange();
  };

  private startInterval() {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      this.state.seconds += 1;
      for (const cb of this.subscribersToTick) {
        cb(this.state.seconds);
      }
      this.emitChange();
    }, 1000);
  }

  private stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const timerStore = new TimerStore();
