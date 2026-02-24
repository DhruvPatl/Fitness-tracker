import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Settings, RotateCcw, Play, ChevronRight, Check, Activity, CheckCircle } from 'lucide-react';
import { useWorkout } from '../hooks/useWorkout';
import WorkoutExercise from '../components/WorkoutExercise';
import ExerciseSelector from '../components/ExerciseSelector';
import '../styles/ActiveWorkout.css';

const ActiveWorkout = () => {
    const {
        activeWorkout,
        weightUnit,
        toggleWeightUnit,
        addExercise,
        addSet,
        updateSet,
        toggleSetComplete,
        removeSet,
        finishWorkout
    } = useWorkout();

    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isTimerRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsTimerRunning(false);
        }
        return () => clearInterval(timer);
    }, [isTimerRunning, timeLeft]);

    const handleToggleSetComplete = (exerciseIndex, setIndex) => {
        const wasCompleted = activeWorkout.exercises[exerciseIndex].sets[setIndex].completed;
        toggleSetComplete(exerciseIndex, setIndex);

        if (!wasCompleted) {
            const exerciseRestTime = activeWorkout.exercises[exerciseIndex].restTime || 90;
            setTimeLeft(exerciseRestTime);
            setIsTimerRunning(true);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleExerciseSelect = (exercise) => {
        addExercise(exercise);
        setIsSelectorOpen(false);
    };

    const navigate = useNavigate();

    const handleFinish = () => {
        if (window.confirm('Finish this workout?')) {
            finishWorkout();
            navigate('/summary');
        }
    };


    return (
        <div className="page active-workout">
            <header className="workout-view-header">
                <div className="workout-title-row">
                    <div className="workout-id">
                        <Activity size={18} />
                        <span>LEG DAY</span>
                    </div>
                    <button className="settings-btn">
                        <Settings size={20} />
                    </button>
                </div>
            </header>

            <div className={`rest-timer-card ${isTimerRunning ? 'running' : ''}`}>
                <div className="timer-info">
                    <span className="timer-label">REST TIMER</span>
                    <div className="timer-display">
                        <span className="time">{formatTime(timeLeft)}</span>
                        <span className="unit">min</span>
                    </div>
                </div>
                <div className="timer-controls">
                    <button className="timer-reset" onClick={() => setTimeLeft(0)}>
                        <RotateCcw size={20} />
                    </button>
                    <button
                        className="timer-play"
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                    >
                        {isTimerRunning ? (
                            <div style={{ padding: '4px' }}>
                                <div style={{ width: 12, height: 12, backgroundColor: 'black' }}></div>
                            </div>
                        ) : (
                            <Play size={20} fill="black" />
                        )}
                    </button>
                </div>
            </div>

            <div className="workout-content">
                {activeWorkout.exercises.length === 0 ? (
                    <div className="empty-state">
                        <p>Start your workout by adding an exercise</p>
                    </div>
                ) : (
                    activeWorkout.exercises.map((exercise, index) => (
                        <WorkoutExercise
                            key={exercise.id}
                            index={index}
                            exercise={exercise}
                            totalExercises={activeWorkout.exercises.length}
                            weightUnit={weightUnit}
                            onAddSet={addSet}
                            onUpdateSet={updateSet}
                            onToggleSetComplete={handleToggleSetComplete}
                            onRemoveSet={removeSet}
                        />
                    ))
                )}


                <div className="active-workout-footer">
                    <section className="workout-notes-section">
                        <span className="section-label">WORKOUT NOTES</span>
                        <textarea placeholder="How are you feeling?" className="notes-input" />
                    </section>

                    <div className="action-buttons">
                        <button className="btn-next" onClick={() => setIsSelectorOpen(true)}>
                            <Play size={16} fill="white" />
                            <span>Next Exercise</span>
                        </button>
                        <button className="btn-finish-new" onClick={handleFinish}>
                            <CheckCircle size={20} />
                            <span>Finish Workout</span>
                        </button>
                    </div>
                </div>
            </div>

            {isSelectorOpen && (
                <ExerciseSelector
                    onClose={() => setIsSelectorOpen(false)}
                    onSelect={handleExerciseSelect}
                />
            )}
        </div>
    );
};

export default ActiveWorkout;
