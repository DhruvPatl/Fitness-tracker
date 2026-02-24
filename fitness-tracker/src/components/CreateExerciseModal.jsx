import { useState } from 'react';
import { X } from 'lucide-react';
import '../styles/CreateExerciseModal.css';

const MUSCLE_GROUPS = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio', 'Other'];

const CreateExerciseModal = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [muscle, setMuscle] = useState(MUSCLE_GROUPS[0]);
    const [restTime, setRestTime] = useState(90);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onSave(name, muscle, restTime);
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add New Exercise</h2>
                    <button onClick={onClose} className="close-btn">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Exercise Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Incline Dumbbell Press"
                            autoFocus
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="muscle">Muscle Group</label>
                        <select
                            id="muscle"
                            value={muscle}
                            onChange={(e) => setMuscle(e.target.value)}
                        >
                            {MUSCLE_GROUPS.map((group) => (
                                <option key={group} value={group}>
                                    {group}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rest">Default Rest (seconds)</label>
                        <input
                            type="number"
                            id="rest"
                            value={restTime}
                            onChange={(e) => setRestTime(e.target.value)}
                            placeholder="e.g., 90"
                            required
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Cancel
                        </button>
                        <button type="submit" className="btn-save">
                            Save Exercise
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default CreateExerciseModal;
