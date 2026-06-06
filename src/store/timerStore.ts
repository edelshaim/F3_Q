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
  private onTickCallback?: (seconds: number) => void;

  getState = () => this.state;

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private notify = () => {
    this.listeners.forEach((listener) => listener());
  };

  setOnTick = (callback: (seconds: number) => void) => {
    this.onTickCallback = callback;
  };

  toggleTimer = () => {
    if (this.state.status === 'running') {
      this.state = { ...this.state, status: 'paused' };
      this.stopInterval();
    } else {
      this.state = { ...this.state, status: 'running' };
      this.startInterval();
    }
    this.notify();
  };

  resetTimer = () => {
    this.state = { seconds: 0, status: 'idle' };
    this.stopInterval();
    this.notify();
  };

  private startInterval = () => {
    if (this.timerInterval) return;
    this.timerInterval = setInterval(() => {
      this.state = { ...this.state, seconds: this.state.seconds + 1 };
      this.onTickCallback?.(this.state.seconds);
      this.notify();
    }, 1000);
  };

  private stopInterval = () => {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  };
}

export const timerStore = new TimerStore();
