import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { Exercise, WorkoutPlan } from './types';

const mockMatchMedia = (matches = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

const createLocalStorageMock = (): Storage => {
  let store: Record<string, string> = {};

  return {
    get length() {
      return Object.keys(store).length;
    },
    clear: vi.fn(() => {
      store = {};
    }),
    getItem: vi.fn((key: string) => store[key] ?? null),
    key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
  };
};

describe('App', () => {
  beforeEach(() => {
    const localStorageMock = createLocalStorageMock();
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: localStorageMock,
    });
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: localStorageMock,
    });

    localStorage.clear();
    mockMatchMedia();
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('ignores malformed persisted exercise categories when grouping exercises', () => {
    const malformedExercise: Exercise = {
      id: 'bad-category',
      name: 'Malformed Category Exercise',
      reps: '10',
      category: '__proto__' as Exercise['category'],
      completed: false,
    };
    const validExercise: Exercise = {
      id: 'valid-category',
      name: 'Valid Category Exercise',
      reps: '15',
      category: 'Warm-up',
      completed: false,
    };
    const persistedPlan: WorkoutPlan = {
      title: 'Persisted Plan',
      location: 'The AO',
      exercises: [malformedExercise, validExercise],
    };

    localStorage.setItem('f3-q-sheet-plan', JSON.stringify(persistedPlan));

    expect(() => render(<App />)).not.toThrow();
    expect(screen.getByText('Valid Category Exercise')).toBeInTheDocument();
    expect(screen.queryByText('Malformed Category Exercise')).not.toBeInTheDocument();
  });
});
