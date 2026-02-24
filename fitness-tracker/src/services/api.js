// Mock API Service for Cloud Sync simulation
const LATENCY = 800;

export const api = {
    syncExercises: (exercises) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                localStorage.setItem('exercises', JSON.stringify(exercises));
                console.log('Exercises synced to cloud');
                resolve({ success: true });
            }, LATENCY);
        });
    },

    syncRoutines: (routines) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                localStorage.setItem('fitness_tracker_routines', JSON.stringify(routines));
                console.log('Routines synced to cloud');
                resolve({ success: true });
            }, LATENCY);
        });
    },

    syncHistory: (history) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                localStorage.setItem('workout_history', JSON.stringify(history));
                console.log('History synced to cloud');
                resolve({ success: true });
            }, LATENCY);
        });
    }
};
