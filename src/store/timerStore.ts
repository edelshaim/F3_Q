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
  private intervalId: NodeJS.Timeout | null = null;

  // The critical part: return a stable reference if state hasn't changed.
  // In our case, we'll update the `state` object reference only when state changes.
  getSnapshot = (): TimerState => {
    return this.state;
  };

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private notify = () => {
    this.listeners.forEach((listener) => listener());
  };

  private updateState = (newState: Partial<TimerState>) => {
    this.state = { ...this.state, ...newState };
    this.notify();
  };

  toggle = () => {
    if (this.state.status === 'running') {
      this.pause();
    } else {
      this.start();
    }
  };

  start = () => {
    if (this.state.status === 'running') return;

    this.updateState({ status: 'running' });

    if (this.intervalId) {
        clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.updateState({ seconds: this.state.seconds + 1 });
    }, 1000);
  };

  pause = () => {
    if (this.state.status !== 'running') return;

    this.updateState({ status: 'paused' });

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };

  reset = () => {
    this.updateState({ status: 'idle', seconds: 0 });

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };
}

export const timerStore = new TimerStore();
