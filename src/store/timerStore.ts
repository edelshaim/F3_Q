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
  private onTickCallback?: (seconds: number) => void;

  constructor() {
    this.subscribe = this.subscribe.bind(this);
    this.getSnapshot = this.getSnapshot.bind(this);
  }

  setOnTick(callback?: (seconds: number) => void) {
    this.onTickCallback = callback;
  }

  getSnapshot(): TimerState {
    return this.state;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emitChange() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  private setState(partialState: Partial<TimerState>) {
    this.state = { ...this.state, ...partialState };
    this.emitChange();
  }

  start() {
    if (this.state.status === 'running') return;

    this.setState({ status: 'running' });

    this.intervalId = setInterval(() => {
      const nextSeconds = this.state.seconds + 1;
      this.setState({ seconds: nextSeconds });
      this.onTickCallback?.(nextSeconds);
    }, 1000);
  }

  pause() {
    if (this.state.status !== 'running') return;

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.setState({ status: 'paused' });
  }

  toggle() {
    if (this.state.status === 'running') {
      this.pause();
    } else {
      this.start();
    }
  }

  reset() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.setState({ status: 'idle', seconds: 0 });
  }
}

export const timerStore = new TimerStore();
