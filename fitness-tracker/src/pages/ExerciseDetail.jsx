import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useExercises } from '../hooks/useExercises';
import VolumeChart from '../components/VolumeChart';
import ExerciseHistory from '../components/ExerciseHistory';
import '../styles/ExerciseDetail.css';

// Mock data
const MOCK_DATA = [
    { date: 'Jan 1', volume: 1000 },
    { date: 'Jan 8', volume: 1200 },
    { date: 'Jan 15', volume: 1400 },
    { date: 'Jan 22', volume: 1350 },
    { date: 'Jan 29', volume: 1600 },
];

const MOCK_HISTORY = [
    {
        day: 'Monday',
        date: 'Jan 29',
        sets: [
            { reps: 10, weight: 60 },
            { reps: 8, weight: 65 },
            { reps: 6, weight: 70, pr: true },
        ],
    },
    {
        day: 'Monday',
        date: 'Jan 22',
        sets: [
            { reps: 10, weight: 60 },
            { reps: 8, weight: 60 },
            { reps: 8, weight: 60 },
        ],
    },
];

const ExerciseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { exercises } = useExercises();

    const exercise = exercises.find((ex) => ex.id === id);

    if (!exercise) return <div>Exercise not found</div>;

    return (
        <div className="page exercise-detail">
            <header className="detail-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ChevronLeft size={24} />
                </button>
                <h1>{exercise.name}</h1>
            </header>

            <VolumeChart data={MOCK_DATA} />
            <ExerciseHistory history={MOCK_HISTORY} />
        </div>
    );
};

export default ExerciseDetail;
