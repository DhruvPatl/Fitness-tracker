import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useExercises } from '../hooks/useExercises';
import '../styles/ExerciseSelector.css';

const ExerciseSelector = ({ onSelect, onClose }) => {
    const { exercises } = useExercises();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredExercises = exercises.filter(ex =>
        ex.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="selector-overlay">
            <div className="selector-content">
                <header className="selector-header">
                    <h2>Add Exercise</h2>
                    <button onClick={onClose}><X size={24} /></button>
                </header>

                <div className="selector-search">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search exercises..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className="selector-list">
                    {filteredExercises.map(exercise => (
                        <button
                            key={exercise.id}
                            className="selector-item"
                            onClick={() => onSelect(exercise)}
                        >
                            <span className="item-name">{exercise.name}</span>
                            <span className="item-muscle">{exercise.muscle}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExerciseSelector;
