import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const useWorkoutHistory = () => {
    const { isLoggedIn } = useAuth();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const storedHistory = localStorage.getItem('workoutHistory');
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
        }
    }, []);

    const saveWorkout = async (workout) => {
        const completedWorkout = {
            ...workout,
            completedAt: new Date().toISOString(),
        };

        const updatedHistory = [completedWorkout, ...history];
        setHistory(updatedHistory);
        localStorage.setItem('workoutHistory', JSON.stringify(updatedHistory));

        if (isLoggedIn) {
            await api.syncHistory(updatedHistory);
        }

        return completedWorkout;
    };


    const getWeeklyStats = useCallback(() => {
        const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
        startOfWeek.setHours(0, 0, 0, 0);

        const stats = days.map(day => ({ day, workouts: 0 }));

        history.forEach(workout => {
            const date = new Date(workout.completedAt);
            if (date >= startOfWeek) {
                stats[date.getDay()].workouts += 1;
            }
        });

        // Shift so Monday is first (optional, matches current UI)
        const sunday = stats.shift();
        stats.push(sunday);

        return stats;
    }, [history]);

    const getPersonalRecords = useCallback(() => {
        const prs = {}; // { exerciseName: maxWeight }

        history.forEach(workout => {
            workout.exercises.forEach(exercise => {
                exercise.sets.forEach(set => {
                    if (set.completed && set.weight) {
                        const weight = parseFloat(set.weight);
                        if (!prs[exercise.name] || weight > prs[exercise.name]) {
                            prs[exercise.name] = weight;
                        }
                    }
                });
            });
        });

        return Object.entries(prs)
            .map(([exercise, weight]) => ({ exercise, weight: `${weight} kg` }))
            .sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight))
            .slice(0, 5); // Top 5
    }, [history]);

    const getWorkoutsByExercise = useCallback((exerciseId) => {
        const data = [];
        const exerciseHistory = [];

        // Traverse history in reverse (oldest first) for the chart
        [...history].reverse().forEach(workout => {
            const workoutDate = new Date(workout.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const matchingExercises = workout.exercises.filter(e => e.exerciseId === exerciseId || e.name === exerciseId); // Fallback to name if ID missing in legacy data

            matchingExercises.forEach(ex => {
                // Calculate volume
                const volume = ex.sets.reduce((acc, set) => {
                    if (set.completed && set.weight && set.reps) {
                        return acc + (parseFloat(set.weight) * parseFloat(set.reps));
                    }
                    return acc;
                }, 0);

                if (volume > 0) {
                    data.push({ date: workoutDate, volume });
                }

                // Add to detailed history list
                if (ex.sets.some(s => s.completed)) {
                    exerciseHistory.unshift({ // Newest first for the list
                        day: new Date(workout.completedAt).toLocaleDateString('en-US', { weekday: 'long' }),
                        date: workoutDate,
                        sets: ex.sets.filter(s => s.completed)
                    });
                }
            });
        });

        return { chartData: data, historyList: exerciseHistory };
    }, [history]);

    return {
        history,
        saveWorkout,
        getWeeklyStats,
        getPersonalRecords,
        getWorkoutsByExercise
    };
};
