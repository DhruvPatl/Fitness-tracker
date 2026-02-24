import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useWorkoutHistory } from '../hooks/useWorkoutHistory';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
    const { saveWorkout } = useWorkoutHistory();
    const [activeWorkout, setActiveWorkout] = useState({
        id: uuidv4(),
        startTime: new Date(),
        exercises: [],
    });

    const [weightUnit, setWeightUnit] = useState(() => localStorage.getItem('weightUnit') || 'kg');

    const toggleWeightUnit = () => {
        setWeightUnit(prev => {
            const newUnit = prev === 'kg' ? 'lbs' : 'kg';
            localStorage.setItem('weightUnit', newUnit);
            return newUnit;
        });
    };

    const startWorkoutFromPlan = (planExercises) => {
        const formattedExercises = planExercises.map(ex => ({
            id: uuidv4(),
            exerciseId: ex.id,
            name: ex.name,
            restTime: ex.restTime || 90,
            sets: [
                { id: uuidv4(), weight: '', reps: '', completed: false }
            ],
        }));

        setActiveWorkout({
            id: uuidv4(),
            startTime: new Date(),
            exercises: formattedExercises
        });
    };

    const addExercise = (exercise) => {
        const newExercise = {
            id: uuidv4(),
            exerciseId: exercise.id,
            name: exercise.name,
            restTime: exercise.restTime || 90,
            sets: [
                { id: uuidv4(), weight: '', reps: '', completed: false }
            ],
        };

        setActiveWorkout(prev => ({
            ...prev,
            exercises: [...prev.exercises, newExercise]
        }));
    };


    const addSet = (exerciseIndex) => {
        setActiveWorkout(prev => {
            const updatedExercises = [...prev.exercises];
            const exercise = { ...updatedExercises[exerciseIndex] };
            const sets = [...exercise.sets];
            const previousSet = sets[sets.length - 1];

            sets.push({
                id: uuidv4(),
                weight: previousSet ? previousSet.weight : '',
                reps: previousSet ? previousSet.reps : '',
                completed: false
            });

            exercise.sets = sets;
            updatedExercises[exerciseIndex] = exercise;

            return { ...prev, exercises: updatedExercises };
        });
    };

    const updateSet = (exerciseIndex, setIndex, field, value) => {
        setActiveWorkout(prev => {
            const updatedExercises = [...prev.exercises];
            const exercise = { ...updatedExercises[exerciseIndex] };
            const sets = [...exercise.sets];

            sets[setIndex] = { ...sets[setIndex], [field]: value };

            exercise.sets = sets;
            updatedExercises[exerciseIndex] = exercise;

            return { ...prev, exercises: updatedExercises };
        });
    };

    const toggleSetComplete = (exerciseIndex, setIndex) => {
        setActiveWorkout(prev => {
            const updatedExercises = [...prev.exercises];
            const exercise = { ...updatedExercises[exerciseIndex] };
            const sets = [...exercise.sets];

            sets[setIndex] = { ...sets[setIndex], completed: !sets[setIndex].completed };

            exercise.sets = sets;
            updatedExercises[exerciseIndex] = exercise;

            return { ...prev, exercises: updatedExercises };
        });
    };

    const removeSet = (exerciseIndex, setIndex) => {
        setActiveWorkout(prev => {
            const updatedExercises = [...prev.exercises];
            const exercise = { ...updatedExercises[exerciseIndex] };
            const sets = [...exercise.sets];

            sets.splice(setIndex, 1);

            exercise.sets = sets;
            updatedExercises[exerciseIndex] = exercise;

            return { ...prev, exercises: updatedExercises };
        });
    };

    const [lastFinishedWorkout, setLastFinishedWorkout] = useState(null);

    const finishWorkout = useCallback(() => {
        if (activeWorkout.exercises.length === 0) return;

        const workoutToSave = {
            ...activeWorkout,
            weightUnit,
            endTime: new Date(),
            duration: Math.floor((new Date() - new Date(activeWorkout.startTime)) / 1000 / 60) // in minutes
        };

        saveWorkout(workoutToSave);
        setLastFinishedWorkout(workoutToSave);

        setActiveWorkout({
            id: uuidv4(),
            startTime: new Date(),
            exercises: []
        });
    }, [activeWorkout, saveWorkout, weightUnit]);


    const value = {
        activeWorkout,
        weightUnit,
        toggleWeightUnit,
        addExercise,
        addSet,
        updateSet,
        toggleSetComplete,
        removeSet,
        finishWorkout,
        startWorkoutFromPlan,
        lastFinishedWorkout,
        setLastFinishedWorkout
    };


    return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
};

export const useWorkout = () => {
    const context = useContext(WorkoutContext);
    if (!context) {
        throw new Error('useWorkout must be used within a WorkoutProvider');
    }
    return context;
};
