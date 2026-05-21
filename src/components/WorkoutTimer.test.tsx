import { render, screen, act, fireEvent } from '@testing-library/react';
import { WorkoutTimer } from './WorkoutTimer';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('WorkoutTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders initial state correctly (00:00)', () => {
    render(<WorkoutTimer />);
    expect(screen.getByText('00:00')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
  });

  it('starts the timer when play button is clicked', () => {
    render(<WorkoutTimer />);

    // Initial state is 00:00
    expect(screen.getByText('00:00')).toBeInTheDocument();

    // Find the play button
    const playButton = screen.getAllByRole('button')[0];
    fireEvent.click(playButton);

    // Advance timers by 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('00:01')).toBeInTheDocument();

    // Advance timers by another 2 seconds
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText('00:03')).toBeInTheDocument();
  });

  it('calls onTick callback when running', () => {
    const onTickMock = vi.fn();
    render(<WorkoutTimer onTick={onTickMock} />);

    const playButton = screen.getAllByRole('button')[0];
    fireEvent.click(playButton);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onTickMock).toHaveBeenCalledWith(1);
    expect(onTickMock).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(onTickMock).toHaveBeenCalledWith(3);
    expect(onTickMock).toHaveBeenCalledTimes(3);
  });

  it('pauses the timer when pause button is clicked', () => {
    render(<WorkoutTimer />);

    const toggleButton = screen.getAllByRole('button')[0];

    // Start timer
    fireEvent.click(toggleButton);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText('00:02')).toBeInTheDocument();

    // Pause timer
    fireEvent.click(toggleButton);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Time should remain 00:02
    expect(screen.getByText('00:02')).toBeInTheDocument();
  });

  it('resets the timer when reset button is clicked', () => {
    render(<WorkoutTimer />);

    const toggleButton = screen.getAllByRole('button')[0];
    const resetButton = screen.getAllByRole('button')[1];

    // Start timer
    fireEvent.click(toggleButton);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText('00:03')).toBeInTheDocument();

    // Reset timer
    fireEvent.click(resetButton);

    expect(screen.getByText('00:00')).toBeInTheDocument();

    // Check if timer stops running after reset
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('formats time correctly for minutes and hours', () => {
    render(<WorkoutTimer />);

    const playButton = screen.getAllByRole('button')[0];
    fireEvent.click(playButton);

    // Advance 65 seconds
    act(() => {
      vi.advanceTimersByTime(65000);
    });

    expect(screen.getByText('01:05')).toBeInTheDocument();

    // Advance 1 hour
    act(() => {
      vi.advanceTimersByTime(3600000);
    });

    expect(screen.getByText('01:01:05')).toBeInTheDocument();
  });
});
