import React from 'react';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { Exercise } from '../types';

interface ExerciseItemProps {
  exercise: Exercise;
  isActive: boolean;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
}

export const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exercise,
  isActive,
  onToggle,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(exercise.id)}
      className={`group flex items-center p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer active:scale-[0.98] ${
        isActive
          ? 'exercise-active border-emerald-500/50'
          : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
      }`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle(exercise.id);
        }}
        className={`mr-4 p-1 -ml-1 transition-colors ${
          exercise.completed ? 'text-emerald-500' : 'text-slate-600 group-hover:text-slate-400'
        }`}
      >
        {exercise.completed ? <CheckCircle2 size={28} /> : <Circle size={28} />}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className={`font-semibold text-base sm:text-lg truncate ${exercise.completed ? 'text-slate-500 line-through' : 'text-slate-100'}`}>
            {exercise.name}
          </h3>
          <span className="shrink-0 text-[10px] sm:text-xs font-mono text-slate-500 bg-slate-800/50 px-2 py-1 rounded">
            {exercise.reps || (exercise.duration ? `${exercise.duration}s` : '—')}
          </span>
        </div>
        {exercise.description && (
          <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-1">{exercise.description}</p>
        )}
      </div>

      <ChevronRight
        size={20}
        className={`ml-2 shrink-0 transition-transform ${isActive ? 'text-emerald-500 translate-x-1' : 'text-slate-700'}`}
      />
    </div>
  );
};
