export interface Exercise {
  id: string;
  name: string;
  reps?: string;
  duration?: number; // in seconds
  description?: string;
  category: 'Warm-up' | 'The Thang' | 'Mary' | 'Cool-down';
  completed: boolean;
}

export interface WorkoutPlan {
  title: string;
  location: string;
  exercises: Exercise[];
}

export type TimerStatus = 'idle' | 'running' | 'paused';
