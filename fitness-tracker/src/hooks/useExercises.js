import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_EXERCISES = [
    { id: '1', name: 'Bench Press', muscle: 'Chest' },
    { id: '2', name: 'Squat', muscle: 'Legs' },
    { id: '3', name: 'Deadlift', muscle: 'Back' },
    { id: '4', name: 'Overhead Press', muscle: 'Shoulders' },
    { id: '5', name: 'Pull Up', muscle: 'Back' },
    { id: '6', name: 'Dumbbell Curl', muscle: 'Biceps' },
    { id: '7', name: 'Tricep Extension', muscle: 'Triceps' },
    { id: '8', name: 'Leg Press', muscle: 'Legs' },
];

export const useExercises = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const storedExercises = localStorage.getItem('exercises');
        if (storedExercises) {
            setExercises(JSON.parse(storedExercises));
        } else {
            setExercises(INITIAL_EXERCISES);
            localStorage.setItem('exercises', JSON.stringify(INITIAL_EXERCISES));
        }
    }, []);

    const addExercise = (name, muscle) => {
        const newExercise = {
            id: uuidv4(),
            name,
            muscle,
        };
        const updatedExercises = [...exercises, newExercise];
        setExercises(updatedExercises);
        localStorage.setItem('exercises', JSON.stringify(updatedExercises));
    };

    return { exercises, addExercise };
};
