import { TimerStatus } from '../types';

type TimerState = {
  seconds: number;
  status: TimerStatus;
};

type Listener = () => void;

let state: TimerState = {
  seconds: 0,
  status: 'idle',
};

let listeners: Listener[] = [];
let interval: ReturnType<typeof setInterval> | null = null;

export const timerStore = {
  subscribe(listener: Listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return state;
  },
  toggle() {
    if (state.status === 'running') {
      state = { ...state, status: 'paused' };
      if (interval) clearInterval(interval);
    } else {
      state = { ...state, status: 'running' };
      interval = setInterval(() => {
        state = { ...state, seconds: state.seconds + 1 };
        timerStore.emit();
      }, 1000);
    }
    timerStore.emit();
  },
  reset() {
    state = { seconds: 0, status: 'idle' };
    if (interval) clearInterval(interval);
    timerStore.emit();
  },
  emit() {
    for (const listener of listeners) {
      listener();
    }
  }
};
