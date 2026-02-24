import { useState } from 'react';
import { X, Search, CheckCircle2, Circle } from 'lucide-react';
import { useExercises } from '../hooks/useExercises';
import '../styles/CreateRoutineModal.css';

const CreateRoutineModal = ({ onClose, onSave }) => {
    const { exercises } = useExercises();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedExercises, setSelectedExercises] = useState([]);

    const filteredExercises = exercises.filter(ex =>
        ex.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleExercise = (exercise) => {
        setSelectedExercises(prev => {
            const isSelected = prev.find(e => e.id === exercise.id);
            if (isSelected) {
                return prev.filter(e => e.id !== exercise.id);
            } else {
                return [...prev, exercise];
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onSave(name, description, selectedExercises);
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content routine-modal">
                <div className="modal-header">
                    <h2>Create New Plan</h2>
                    <button onClick={onClose} className="close-btn">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Plan Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Pull Day"
                            autoFocus
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Muscle Groups (Description)</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g., Lats, Biceps, Shoulders"
                            required
                        />
                    </div>

                    <div className="exercise-selection-section">
                        <label className="section-label">Add Exercises ({selectedExercises.length})</label>
                        <div className="modal-search-wrapper">
                            <Search size={16} className="search-icon-modal" />
                            <input
                                type="text"
                                placeholder="Search exercises..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="modal-search-input"
                            />
                        </div>

                        <div className="modal-exercise-list">
                            {filteredExercises.map(ex => {
                                const isSelected = selectedExercises.some(e => e.id === ex.id);
                                return (
                                    <div
                                        key={ex.id}
                                        className={`modal-exercise-item ${isSelected ? 'selected' : ''}`}
                                        onClick={() => toggleExercise(ex)}
                                    >
                                        <div className="exercise-item-info">
                                            <span className="exercise-item-name">{ex.name}</span>
                                            <span className="exercise-item-muscle">{ex.muscle}</span>
                                        </div>
                                        {isSelected ? (
                                            <CheckCircle2 size={20} className="select-icon selected" />
                                        ) : (
                                            <Circle size={20} className="select-icon" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Cancel
                        </button>
                        <button type="submit" className="btn-save" disabled={!name || selectedExercises.length === 0}>
                            Create Plan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRoutineModal;

