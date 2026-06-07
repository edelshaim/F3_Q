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

  private tick = () => {
    this.state = {
      ...this.state,
      seconds: this.state.seconds + 1,
    };
    this.notify();
  };

  toggle = () => {
    if (this.state.status === 'running') {
      this.state = { ...this.state, status: 'paused' };
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    } else {
      this.state = { ...this.state, status: 'running' };
      this.intervalId = setInterval(this.tick, 1000);
    }
    this.notify();
  };

  reset = () => {
    this.state = { seconds: 0, status: 'idle' };
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.notify();
  };
}

export const timerStore = new TimerStore();
