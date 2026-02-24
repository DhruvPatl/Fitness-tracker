import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const STORAGE_KEY = 'fitness_tracker_routines';
/* ... truncated fallbackRoutines ... */

export const useRoutines = () => {
    const { isLoggedIn } = useAuth();
    const [routines, setRoutines] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : fallbackRoutines;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
    }, [routines]);

    const addRoutine = async (name, description, exercises = []) => {
        const newRoutine = {
            id: Date.now().toString(),
            name,
            description,
            exercises // Now storing exercise IDs or objects
        };
        const updatedRoutines = [...routines, newRoutine];
        setRoutines(updatedRoutines);

        if (isLoggedIn) {
            await api.syncRoutines(updatedRoutines);
        }
    };

    const deleteRoutine = async (id) => {
        const updatedRoutines = routines.filter(r => r.id !== id);
        setRoutines(updatedRoutines);

        if (isLoggedIn) {
            await api.syncRoutines(updatedRoutines);
        }
    };

    return {
        routines,
        addRoutine,
        deleteRoutine
    };
};


