import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronRight, Trash2 } from 'lucide-react';
import { useRoutines } from '../hooks/useRoutines';
import { useWorkout } from '../hooks/useWorkout';
import CreateRoutineModal from '../components/CreateRoutineModal';
import '../styles/Plans.css';

const Plans = () => {
    const navigate = useNavigate();
    const { routines, addRoutine, deleteRoutine } = useRoutines();
    const { startWorkoutFromPlan } = useWorkout();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = (name, description, selectedExercises) => {
        addRoutine(name, description, selectedExercises);
    };

    const handleStartWorkout = (routine) => {
        if (routine.exercises && routine.exercises.length > 0) {
            startWorkoutFromPlan(routine.exercises);
            navigate('/workout');
        } else {
            // If no exercises, just navigate to allow manual entry
            navigate('/workout');
        }
    };

    const handleDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this plan?')) {
            deleteRoutine(id);
        }
    };

    return (
        <div className="page plans-page">
            <header className="plans-header">
                <h2>Your Plan</h2>
                <button className="add-plan-btn" onClick={() => setIsModalOpen(true)}>
                    <Plus size={24} />
                </button>
            </header>

            <div className="plans-container">
                <div className="plans-list">
                    {routines.map((routine) => (
                        <div
                            key={routine.id}
                            className="plan-card"
                            onClick={() => handleStartWorkout(routine)}
                        >
                            <div className="plan-info">
                                <h3 className="plan-name">{routine.name}</h3>
                                <p className="plan-description">{routine.description}</p>
                            </div>
                            <div className="plan-actions">
                                <button
                                    className="delete-plan-btn"
                                    onClick={(e) => handleDelete(e, routine.id)}
                                >
                                    <Trash2 size={18} />
                                </button>
                                <ChevronRight size={20} className="plan-chevron" />
                            </div>
                        </div>
                    ))}
                    {routines.length === 0 && (
                        <div className="empty-plans">
                            <p>No plans yet. Create one to get started!</p>
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <CreateRoutineModal
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};



export default Plans;
