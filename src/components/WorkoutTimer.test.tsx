import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { WorkoutTimer } from './WorkoutTimer';

describe('WorkoutTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with initial 00:00 formatted time and idle state', () => {
    render(<WorkoutTimer />);

    expect(screen.getByText('00:00')).toBeInTheDocument();

    // Play button should be visible in idle state
    const playButton = screen.getAllByRole('button')[0];
    expect(playButton).toBeInTheDocument();
    expect(playButton.innerHTML).toContain('lucide-play');
  });

  it('toggles timer state when play/pause is clicked', () => {
    render(<WorkoutTimer />);

    const toggleButton = screen.getAllByRole('button')[0];

    // Click play
    fireEvent.click(toggleButton);
    expect(toggleButton.innerHTML).toContain('lucide-pause');

    // Click pause
    fireEvent.click(toggleButton);
    expect(toggleButton.innerHTML).toContain('lucide-play');
  });

  it('starts counting time when play is clicked', () => {
    render(<WorkoutTimer />);

    const toggleButton = screen.getAllByRole('button')[0];
    fireEvent.click(toggleButton);

    act(() => {
      vi.advanceTimersByTime(2000); // advance 2 seconds
    });

    expect(screen.getByText('00:02')).toBeInTheDocument();
  });

  it('pauses counting when pause is clicked', () => {
    render(<WorkoutTimer />);

    const toggleButton = screen.getAllByRole('button')[0];
    fireEvent.click(toggleButton); // play

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    fireEvent.click(toggleButton); // pause

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Should still be at 2 seconds
    expect(screen.getByText('00:02')).toBeInTheDocument();
  });

  it('resets timer when reset button is clicked', () => {
    render(<WorkoutTimer />);

    const [toggleButton, resetButton] = screen.getAllByRole('button');
    fireEvent.click(toggleButton); // play

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText('00:02')).toBeInTheDocument();

    fireEvent.click(resetButton); // reset

    expect(screen.getByText('00:00')).toBeInTheDocument();
    expect(toggleButton.innerHTML).toContain('lucide-play'); // back to idle
  });

  it('calls onTick prop exactly once per second when running', () => {
    const onTickMock = vi.fn();
    render(<WorkoutTimer onTick={onTickMock} />);

    const toggleButton = screen.getAllByRole('button')[0];
    fireEvent.click(toggleButton); // play

    act(() => {
      vi.advanceTimersByTime(3000); // 3 seconds
    });

    expect(onTickMock).toHaveBeenCalledTimes(3);
    expect(onTickMock).toHaveBeenNthCalledWith(1, 1);
    expect(onTickMock).toHaveBeenNthCalledWith(2, 2);
    expect(onTickMock).toHaveBeenNthCalledWith(3, 3);
  });

  it('rolls over time formatting correctly (1 hour, 1 minute, 1 second)', () => {
    render(<WorkoutTimer />);

    const toggleButton = screen.getAllByRole('button')[0];
    fireEvent.click(toggleButton); // play

    act(() => {
      vi.advanceTimersByTime(3661000); // 1 hour (3600), 1 minute (60), 1 second (1) => 3661 seconds
    });

    expect(screen.getByText('01:01:01')).toBeInTheDocument();
  });
});
