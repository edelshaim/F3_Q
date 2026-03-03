import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ClipboardList,
  Plus,
  Zap,
  MapPin,
  Calendar,
  ChevronRight,
  Dumbbell,
  Sparkles,
  Search,
  Trash2,
  MessageSquareText,
  X,
  Send,
  Shuffle
} from 'lucide-react';
import { Exercise, WorkoutPlan } from './types';
import { WorkoutTimer } from './components/WorkoutTimer';
import { ExerciseItem } from './components/ExerciseItem';
import exercisesData from './data/exercises.json';

const INITIAL_PLAN: WorkoutPlan = {
  title: "THE SNOW SHOVEL GAUNTLET",
  location: "The AO (Snow/Winter Optimized)",
  exercises: [
    // Warm-up
    { id: 'w1', name: 'Side Straddle Hop (SSH)', reps: '25 IC', category: 'Warm-up', completed: false, description: 'Jump feet out while raising hands, then back together.' },
    { id: 'w2', name: 'Imperial Walker', reps: '20 IC', category: 'Warm-up', completed: false, description: 'Hands on hips, step forward, touch opposite hand to foot.' },
    { id: 'w3', name: 'Sir Fazio’s Arm Circles', reps: '10F / 10B IC', category: 'Warm-up', completed: false, description: 'Small tight circles forward then backward.' },
    { id: 'w4', name: 'Copperhead Squats', reps: '15 IC', category: 'Warm-up', completed: false, description: 'Squat until thighs parallel, back straight, chest up.' },
    { id: 'w5', name: 'Abe Vigodas', reps: '15 IC', category: 'Warm-up', completed: false, description: 'Drive knee to chest, alternate. Primes lower body.' },
    { id: 'w6', name: 'Moroccan Night Clubs', reps: '15 IC', category: 'Warm-up', completed: false, description: 'Large alternating arm circles overhead while stepping side to side.' },

    // The Thang
    { id: 't1', name: 'Lunge Walk & Jog', reps: '50yd + Jog Back', category: 'The Thang', completed: false, description: 'Lower hips until knees 90 deg. Jog back with controlled strides.' },
    { id: 't2', name: 'Merkins', reps: '15 OYO', category: 'The Thang', completed: false, description: 'High plank push-ups. Straight line head to heels.' },
    { id: 't3', name: 'Squats', reps: '20 OYO', category: 'The Thang', completed: false, description: 'Push hips back, bend knees to 90 deg or below.' },
    { id: 't4', name: 'Mountain Climbers', reps: '20 (4-ct) OYO', category: 'The Thang', completed: false, description: 'High plank, drive knees to chest. Keep hips level.' },
    { id: 't5', name: 'Carolina Dry Docks', reps: '10 OYO', category: 'The Thang', completed: false, description: 'Pike push-up position, lower head toward ground.' },
    { id: 't6', name: 'Iron Mikes', reps: '10/leg OYO', category: 'The Thang', completed: false, description: 'Reverse lunge then explosive knee drive with hop.' },
    { id: 't7', name: 'AMRAP Burpees', reps: 'Remaining Time', category: 'The Thang', completed: false, description: 'Squat, kick back, push-up, jump forward, explode up.' },

    // Mary
    { id: 'm1', name: 'Little Baby Crunch (LBC)', reps: '25 IC', category: 'Mary', completed: false, description: 'Knees bent, feet flat. Crunch up reaching elbows to knees.' },
    { id: 'm2', name: 'Dolly', reps: '20 IC', category: 'Mary', completed: false, description: 'On back, legs straight 6" off ground. Scissor-kick legs.' },
    { id: 'm3', name: 'Freddie Mercury', reps: '20 IC', category: 'Mary', completed: false, description: 'Bicycle motion on back with legs at 90 deg.' },
    { id: 'm4', name: 'Plank Hold', reps: '60 Seconds', category: 'Mary', completed: false, description: 'High plank. Squeeze glutes, brace core.' },
    { id: 'm5', name: 'American Hammer', reps: '20 IC', category: 'Mary', completed: false, description: 'Seated, feet off ground, rotate torso side to side.' },

    // Cool-down
    { id: 'c1', name: 'Standing Quad Stretch', reps: '20-30s / side', category: 'Cool-down', completed: false, description: 'Pull heel to glute, knees together.' },
    { id: 'c2', name: 'Standing Hamstring Stretch', reps: '20-30s / side', category: 'Cool-down', completed: false, description: 'Heel on ground, toe up, hinge at hips.' },
    { id: 'c3', name: 'Chest Opener', reps: '20-30s', category: 'Cool-down', completed: false, description: 'Clasp hands behind back, straighten arms, lift.' },
    { id: 'c4', name: 'Hip Flexor Stretch', reps: '20-30s / side', category: 'Cool-down', completed: false, description: 'Deep lunge, drop back knee, press hips forward.' },
    { id: 'c5', name: 'Overhead Tricep Stretch', reps: '20-30s / side', category: 'Cool-down', completed: false, description: 'Arm overhead, bend elbow, pull with opposite hand.' },
  ]
};

export default function App() {
  const [plan, setPlan] = useState<WorkoutPlan>(() => {
    const saved = localStorage.getItem('f3-q-sheet-plan');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return INITIAL_PLAN;
  });
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(() => {
    return localStorage.getItem('f3-q-sheet-active') || null;
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [themeInput, setThemeInput] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('f3-q-sheet-plan', JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    if (activeExerciseId) {
      localStorage.setItem('f3-q-sheet-active', activeExerciseId);
    } else {
      localStorage.removeItem('f3-q-sheet-active');
    }
  }, [activeExerciseId]);

  const toggleExercise = (id: string) => {
    setPlan(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex =>
        ex.id === id ? { ...ex, completed: !ex.completed } : ex
      )
    }));
  };

  const handleRandomize = () => {
    const getRandom = (arr: any[], n: number) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, n);
    };

    if (!exercisesData || exercisesData.length === 0) return;

    const warmups = getRandom(exercisesData, 4).map((e, i) => ({
      id: `w${Date.now()}${i}`, name: e.name, reps: '15 IC', category: 'Warm-up', completed: false, description: e.description
    }));

    const thang = getRandom(exercisesData, 8).map((e, i) => ({
      id: `t${Date.now()}${i}`, name: e.name, reps: '20 OYO', category: 'The Thang', completed: false, description: e.description
    }));

    const mary = getRandom(exercisesData, 3).map((e, i) => ({
      id: `m${Date.now()}${i}`, name: e.name, reps: '20 IC', category: 'Mary', completed: false, description: e.description
    }));

    setPlan({
      title: "RANDOM BEATDOWN",
      location: "The Gloom",
      exercises: [...warmups, ...thang, ...mary] as Exercise[]
    });
    setActiveExerciseId(null);
  };

  const handleGenerate = async () => {
    // Disabled for Day 1
  };

  const handleImport = async () => {
    // Disabled for Day 1
  };

  const activeExercise = plan.exercises.find(ex => ex.id === activeExerciseId);

  const categories: Exercise['category'][] = ['Warm-up', 'The Thang', 'Mary', 'Cool-down'];

  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-100 pb-24 lg:pb-8">
      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-30 bg-[#0f1115]/80 backdrop-blur-lg border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="text-emerald-500" size={20} />
          <h1 className="text-lg font-display font-bold tracking-tight">F3 Q-Sheet</h1>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono text-slate-500 uppercase">
            {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Header & Exercises */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          <header className="hidden lg:block space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-500 p-2 rounded-lg shadow-lg shadow-emerald-500/20">
                  <Zap className="text-white" size={24} />
                </div>
                <h1 className="text-3xl font-display font-bold tracking-tight">F3 Q-Sheet</h1>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono text-slate-500 uppercase tracking-widest">
                  {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
                <div className="text-xl font-mono font-bold text-slate-300">
                  {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <div className="flex items-center space-x-2 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800">
                <MapPin size={14} />
                <span>{plan.location}</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800">
                <ClipboardList size={14} />
                <span>{plan.exercises.length} Exercises</span>
              </div>
            </div>
          </header>

          {/* Day 1 Randomizer Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRandomize}
              className="glass-panel p-4 flex items-center justify-center gap-3 flex-1 text-slate-200 hover:text-emerald-400 hover:border-emerald-500/30 transition-all font-bold text-lg group bg-slate-900/50"
            >
              <Shuffle size={20} className="group-hover:rotate-180 transition-transform duration-500 text-emerald-500" />
              <span>Generate Random Beatdown From Exicon</span>
            </button>
          </div>

          {/* Exercise List */}
          <div className="space-y-6 sm:space-y-8">
            {categories.map(category => {
              const categoryExercises = plan.exercises.filter(ex => ex.category === category);
              if (categoryExercises.length === 0) return null;

              return (
                <section key={category} className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {category}
                    </h2>
                    <span className="text-[10px] font-mono text-slate-600">
                      {categoryExercises.filter(e => e.completed).length} / {categoryExercises.length}
                    </span>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {categoryExercises.map(exercise => (
                      <ExerciseItem
                        key={exercise.id}
                        exercise={exercise}
                        isActive={activeExerciseId === exercise.id}
                        onToggle={toggleExercise}
                        onSelect={setActiveExerciseId}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        {/* Right Column: Timer & Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="lg:sticky lg:top-8 space-y-8">
            {/* Timer - Hidden on mobile, shown in bottom bar instead? Or just keep it here but make it prominent */}
            <div className="hidden lg:block">
              <WorkoutTimer />
            </div>

            {/* Active Exercise Detail - Desktop Version */}
            <div className="hidden lg:block">
              <AnimatePresence mode="wait">
                {activeExercise ? (
                  <motion.div
                    key={activeExercise.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="glass-panel p-6 space-y-6 border-emerald-500/20"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                          Active Exercise
                        </span>
                        <Dumbbell size={18} className="text-slate-700" />
                      </div>
                      <h2 className="text-2xl font-display font-bold text-slate-100">{activeExercise.name}</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                        <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Target</div>
                        <div className="text-xl font-bold text-slate-200">{activeExercise.reps || '—'}</div>
                      </div>
                      <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                        <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Category</div>
                        <div className="text-xl font-bold text-slate-200">{activeExercise.category}</div>
                      </div>
                    </div>

                    {activeExercise.description && (
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono text-slate-500 uppercase">Instructions</div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {activeExercise.description}
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => toggleExercise(activeExercise.id)}
                      className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeExercise.completed
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                        }`}
                    >
                      {activeExercise.completed ? 'Mark Incomplete' : 'Mark Completed'}
                      <ChevronRight size={18} />
                    </button>
                  </motion.div>
                ) : (
                  <div className="glass-panel p-12 flex flex-col items-center justify-center text-center space-y-4 border-dashed border-slate-800">
                    <div className="bg-slate-800/50 p-4 rounded-full">
                      <ClipboardList size={32} className="text-slate-600" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-slate-400">No Exercise Selected</h3>
                      <p className="text-sm text-slate-600 max-w-[200px]">
                        Select an exercise from the list to see details and instructions.
                      </p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Actions - Desktop */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <button
                onClick={() => setPlan(prev => ({ ...prev, exercises: prev.exercises.map(e => ({ ...e, completed: false })) }))}
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-800/50 transition-all text-sm"
              >
                <RotateCcw size={16} />
                Reset Progress
              </button>
              <button
                onClick={() => {
                  const name = prompt("Exercise Name?");
                  if (name) {
                    const reps = prompt("Reps/Duration?");
                    setPlan(prev => ({
                      ...prev,
                      exercises: [...prev.exercises, {
                        id: Math.random().toString(36).substr(2, 9),
                        name,
                        reps: reps || '',
                        category: 'The Thang',
                        completed: false
                      }]
                    }));
                  }
                }}
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-800/50 transition-all text-sm"
              >
                <Plus size={16} />
                Add Exercise
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet for Active Exercise */}
      <AnimatePresence>
        {activeExercise && (
          <div className="lg:hidden fixed inset-0 z-40 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveExerciseId(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full bg-[#161920] border-t border-slate-800 rounded-t-[32px] p-6 pb-10 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-slate-800 rounded-full mx-auto mb-6" />

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                      Active Exercise
                    </span>
                    <button onClick={() => setActiveExerciseId(null)} className="text-slate-500 p-1">
                      <X size={20} />
                    </button>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-slate-100">{activeExercise.name}</h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Target</div>
                    <div className="text-xl font-bold text-slate-200">{activeExercise.reps || '—'}</div>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Category</div>
                    <div className="text-xl font-bold text-slate-200">{activeExercise.category}</div>
                  </div>
                </div>

                {activeExercise.description && (
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Instructions</div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {activeExercise.description}
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => toggleExercise(activeExercise.id)}
                    className={`flex-1 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${activeExercise.completed
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                      }`}
                  >
                    {activeExercise.completed ? 'Mark Incomplete' : 'Mark Completed'}
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bottom Timer Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-4 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <WorkoutTimer />
        </div>
      </div>

      {/* Natural Language Import Modal */}
      <AnimatePresence>
        {showImportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowImportModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl glass-panel p-6 shadow-2xl border-emerald-500/20"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500/20 p-2 rounded-lg">
                    <MessageSquareText className="text-emerald-500" size={20} />
                  </div>
                  <h2 className="text-xl font-display font-bold">Natural Language Import</h2>
                </div>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-500 hover:text-slate-200"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-slate-400">
                  Paste your workout plan here. Gemini will parse it into a structured Q-Sheet.
                </p>
                <textarea
                  className="w-full h-64 bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all resize-none font-sans"
                  placeholder="e.g. Start with 20 SSH, then 15 Imperial Walkers. For the main part: 3 rounds of 10 Merkins, 20 Squats, and a lap around the park. Finish with 20 Big Boys..."
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                />

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImport}
                    disabled={isParsing || !importText.trim()}
                    className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-8 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
                  >
                    {isParsing ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                    Import Routine
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RotateCcw({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
