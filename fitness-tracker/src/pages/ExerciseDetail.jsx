import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, TrendingUp, Award, Activity, List } from 'lucide-react';
import { useExercises } from '../hooks/useExercises';
import { useWorkoutHistory } from '../hooks/useWorkoutHistory';
import VolumeChart from '../components/VolumeChart';
import ExerciseHistory from '../components/ExerciseHistory';
import '../styles/ExerciseDetail.css';

const ExerciseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { exercises } = useExercises();
    const { getWorkoutsByExercise } = useWorkoutHistory();
    const [timeRange, setTimeRange] = useState('ALL');

    const exercise = exercises.find((ex) => ex.id === id);
    const { chartData, historyList } = getWorkoutsByExercise(id);

    if (!exercise) return <div>Exercise not found</div>;

    const ranges = ['1M', '3M', '6M', 'ALL'];

    return (
        <div className="page exercise-detail">
            <header className="detail-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ChevronLeft size={24} />
                </button>
                <h2>{exercise.name}</h2>
                <button className="plus-btn">
                    <Award size={24} />
                </button>
            </header>

            <div className="time-range-filters">
                {ranges.map(range => (
                    <button
                        key={range}
                        className={`range-pill ${timeRange === range ? 'active' : ''}`}
                        onClick={() => setTimeRange(range)}
                    >
                        {range}
                    </button>
                ))}
            </div>

            <section className="estimated-1rm-section">
                <span className="section-label">CURRENT ESTIMATED 1RM</span>
                <div className="rm-value-wrapper">
                    <div className="rm-main">
                        <span className="rm-value">105</span>
                        <span className="rm-unit">kg</span>
                    </div>
                    <div className="rm-change">
                        <TrendingUp size={14} />
                        <span>+12.4%</span>
                    </div>
                </div>
            </section>

            <VolumeChart data={chartData} />

            <div className="stats-summary-grid">
                <div className="stat-box">
                    <span className="stat-label">MAX</span>
                    <div className="stat-value">120 <span className="stat-unit">kg</span></div>
                </div>
                <div className="stat-box">
                    <span className="stat-label">AVG REPS</span>
                    <div className="stat-value">8.2</div>
                </div>
                <div className="stat-box">
                    <span className="stat-label">SETS</span>
                    <div className="stat-value">54</div>
                </div>
            </div>

            <div className="history-section-header">
                <h3>History</h3>
                <button className="see-all">See All</button>
            </div>

            <ExerciseHistory history={historyList} />
        </div>
    );
};

export default ExerciseDetail;
