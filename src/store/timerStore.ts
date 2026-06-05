import { TimerStatus } from '../types';

export type TimerState = {
  seconds: number;
  status: TimerStatus;
};

// ⚡ Bolt: Global Vanilla JS pub/sub store to persist timer state across layout component unmounts.
// Prevents state loss when switching between mobile/desktop variants without lifting state to the root App component (which would cause full re-renders every second).
class TimerStore {
  private seconds = 0;
  private status: TimerStatus = 'idle';
  private listeners = new Set<() => void>();
  private intervalId: NodeJS.Timeout | null = null;
  private cachedSnapshot: TimerState = { seconds: 0, status: 'idle' };

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private notify = () => {
    this.listeners.forEach((listener) => listener());
  };

  getSnapshot = (): TimerState => {
    return this.cachedSnapshot;
  };

  private updateState = (newState: Partial<TimerState>) => {
    if (newState.seconds !== undefined) this.seconds = newState.seconds;
    if (newState.status !== undefined) this.status = newState.status;
    this.cachedSnapshot = { seconds: this.seconds, status: this.status };
    this.notify();
  };

  toggleTimer = () => {
    if (this.status === 'running') {
      this.updateState({ status: 'paused' });
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    } else {
      this.updateState({ status: 'running' });
      this.intervalId = setInterval(() => {
        this.updateState({ seconds: this.seconds + 1 });
      }, 1000);
    }
  };

  resetTimer = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.updateState({ status: 'idle', seconds: 0 });
  };
}

export const timerStore = new TimerStore();
