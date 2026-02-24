import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const INITIAL_EXERCISES = [
    { id: '1', name: 'Bench Press', muscle: 'Chest', restTime: 90 },
    { id: '2', name: 'Squat', muscle: 'Legs', restTime: 120 },
    { id: '3', name: 'Deadlift', muscle: 'Back', restTime: 180 },
    { id: '4', name: 'Overhead Press', muscle: 'Shoulders', restTime: 90 },
    { id: '5', name: 'Pull Up', muscle: 'Back', restTime: 60 },
    { id: '6', name: 'Dumbbell Curl', muscle: 'Biceps', restTime: 60 },
    { id: '7', name: 'Tricep Extension', muscle: 'Triceps', restTime: 60 },
    { id: '8', name: 'Leg Press', muscle: 'Legs', restTime: 90 },
];

export const useExercises = () => {
    const { isLoggedIn } = useAuth();
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

    const addExercise = async (name, muscle, restTime = 90) => {
        const newExercise = {
            id: uuidv4(),
            name,
            muscle,
            restTime: parseInt(restTime)
        };
        const updatedExercises = [...exercises, newExercise];
        setExercises(updatedExercises);
        localStorage.setItem('exercises', JSON.stringify(updatedExercises));

        if (isLoggedIn) {
            await api.syncExercises(updatedExercises);
        }
    };

    return { exercises, addExercise };
};
