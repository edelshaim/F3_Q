import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { ExerciseItem } from './ExerciseItem';
import { Exercise } from '../types';

const mockExercise: Exercise = {
  id: 'ex-1',
  name: 'Push-ups',
  reps: '15',
  description: 'Standard push-ups',
  category: 'The Thang',
  completed: false,
};

describe('ExerciseItem', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders exercise details correctly', () => {
    const onToggle = vi.fn();
    const onSelect = vi.fn();

    render(
      <ExerciseItem
        exercise={mockExercise}
        isActive={false}
        onToggle={onToggle}
        onSelect={onSelect}
      />
    );

    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('Standard push-ups')).toBeInTheDocument();
  });

  it('renders duration when reps is not provided', () => {
    const exerciseWithDuration: Exercise = {
      ...mockExercise,
      reps: undefined,
      duration: 60,
    };

    render(
      <ExerciseItem
        exercise={exerciseWithDuration}
        isActive={false}
        onToggle={vi.fn()}
        onSelect={vi.fn()}
      />
    );

    expect(screen.getByText('60s')).toBeInTheDocument();
  });

  it('renders em-dash when neither reps nor duration is provided', () => {
    const exerciseWithoutRepsOrDuration: Exercise = {
      ...mockExercise,
      reps: undefined,
      duration: undefined,
    };

    render(
      <ExerciseItem
        exercise={exerciseWithoutRepsOrDuration}
        isActive={false}
        onToggle={vi.fn()}
        onSelect={vi.fn()}
      />
    );

    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('renders completed state correctly', () => {
    const completedExercise: Exercise = {
      ...mockExercise,
      completed: true,
    };

    const { container } = render(
      <ExerciseItem
        exercise={completedExercise}
        isActive={false}
        onToggle={vi.fn()}
        onSelect={vi.fn()}
      />
    );

    const titleElement = screen.getByText('Push-ups');
    expect(titleElement).toHaveClass('line-through');

    // Check for checkmark icon structure (using a rough check by class on the wrapper button since lucide renders SVGs)
    const toggleButton = container.querySelector('button');
    expect(toggleButton).toHaveClass('text-emerald-500');
  });

  it('renders active state correctly', () => {
    const { container } = render(
      <ExerciseItem
        exercise={mockExercise}
        isActive={true}
        onToggle={vi.fn()}
        onSelect={vi.fn()}
      />
    );

    // Main wrapper should have active classes
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('exercise-active');
    expect(wrapper).toHaveClass('border-emerald-500/50');
  });

  it('calls onSelect when the item container is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <ExerciseItem
        exercise={mockExercise}
        isActive={false}
        onToggle={vi.fn()}
        onSelect={onSelect}
      />
    );

    await user.click(screen.getByText('Push-ups'));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('ex-1');
  });

  it('calls onToggle and does not call onSelect when the toggle button is clicked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onSelect = vi.fn();

    const { container } = render(
      <ExerciseItem
        exercise={mockExercise}
        isActive={false}
        onToggle={onToggle}
        onSelect={onSelect}
      />
    );

    const toggleButton = container.querySelector('button');
    expect(toggleButton).not.toBeNull();

    await user.click(toggleButton!);

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith('ex-1');
    expect(onSelect).not.toHaveBeenCalled();
  });
});
