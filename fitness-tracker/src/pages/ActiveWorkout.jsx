import { useState, useEffect } from 'react';
import { Plus, Clock, CheckCircle } from 'lucide-react';
import { useWorkout } from '../hooks/useWorkout';
import WorkoutExercise from '../components/WorkoutExercise';
import ExerciseSelector from '../components/ExerciseSelector';
import '../styles/ActiveWorkout.css';

const ActiveWorkout = () => {
    const {
        activeWorkout,
        addExercise,
        addSet,
        updateSet,
        toggleSetComplete,
        removeSet,
        finishWorkout
    } = useWorkout();

    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime(Math.floor((new Date() - activeWorkout.startTime) / 1000));
        }, 1000);
        return () => clearInterval(timer);
    }, [activeWorkout.startTime]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleExerciseSelect = (exercise) => {
        addExercise(exercise);
        setIsSelectorOpen(false);
    };

    return (
        <div className="page active-workout">
            <header className="workout-header">
                <div className="timer">
                    <Clock size={16} />
                    <span>{formatTime(elapsedTime)}</span>
                </div>
                <button className="btn-finish" onClick={finishWorkout}>
                    Finish
                </button>
            </header>

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
                            onAddSet={addSet}
                            onUpdateSet={updateSet}
                            onToggleSetComplete={toggleSetComplete}
                            onRemoveSet={removeSet}
                        />
                    ))
                )}

                <button
                    className="btn-add-exercise"
                    onClick={() => setIsSelectorOpen(true)}
                >
                    <Plus size={20} />
                    <span>Add Exercise</span>
                </button>
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
