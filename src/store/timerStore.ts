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

  private setState = (newState: Partial<TimerState>) => {
    this.state = { ...this.state, ...newState };
    this.notify();
  };

  toggleTimer = () => {
    if (this.state.status === 'running') {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  };

  startTimer = () => {
    if (this.state.status !== 'running') {
      this.setState({ status: 'running' });
      this.intervalId = setInterval(() => {
        this.setState({ seconds: this.state.seconds + 1 });
      }, 1000);
    }
  };

  pauseTimer = () => {
    if (this.state.status === 'running') {
      this.setState({ status: 'paused' });
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
  };

  resetTimer = () => {
    this.setState({ status: 'idle', seconds: 0 });
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };
}

export const timerStore = new TimerStore();
