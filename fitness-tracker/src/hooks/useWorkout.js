import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useWorkout = () => {
    const [activeWorkout, setActiveWorkout] = useState({
        id: uuidv4(),
        startTime: new Date(),
        exercises: [], // { id, exerciseId, name, sets: [{ id, weight, reps, completed }] }
    });

    const addExercise = (exercise) => {
        const newExercise = {
            id: uuidv4(),
            exerciseId: exercise.id,
            name: exercise.name,
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
            const previousSet = updatedExercises[exerciseIndex].sets[updatedExercises[exerciseIndex].sets.length - 1];

            updatedExercises[exerciseIndex].sets.push({
                id: uuidv4(),
                weight: previousSet ? previousSet.weight : '',
                reps: previousSet ? previousSet.reps : '',
                completed: false
            });

            return { ...prev, exercises: updatedExercises };
        });
    };

    const updateSet = (exerciseIndex, setIndex, field, value) => {
        setActiveWorkout(prev => {
            const updatedExercises = [...prev.exercises];
            const set = updatedExercises[exerciseIndex].sets[setIndex];
            set[field] = value;
            return { ...prev, exercises: updatedExercises };
        });
    };

    const toggleSetComplete = (exerciseIndex, setIndex) => {
        setActiveWorkout(prev => {
            const updatedExercises = [...prev.exercises];
            const set = updatedExercises[exerciseIndex].sets[setIndex];
            set.completed = !set.completed;
            return { ...prev, exercises: updatedExercises };
        });
    };

    const removeSet = (exerciseIndex, setIndex) => {
        setActiveWorkout(prev => {
            const updatedExercises = [...prev.exercises];
            updatedExercises[exerciseIndex].sets.splice(setIndex, 1);
            return { ...prev, exercises: updatedExercises };
        });
    };

    const finishWorkout = () => {
        // In a real app, save to localStorage/database here
        console.log('Workout finished:', activeWorkout);
        alert('Workout saved! (Check console for object)');
        // Reset or redirect
    };

    return {
        activeWorkout,
        addExercise,
        addSet,
        updateSet,
        toggleSetComplete,
        removeSet,
        finishWorkout
    };
};
