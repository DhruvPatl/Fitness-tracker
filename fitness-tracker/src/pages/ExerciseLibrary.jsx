import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { useExercises } from '../hooks/useExercises';
import CategoryFilter from '../components/CategoryFilter';
import CreateExerciseModal from '../components/CreateExerciseModal';
import '../styles/ExerciseLibrary.css';

const ExerciseLibrary = () => {
    const { exercises, addExercise } = useExercises();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredExercises = exercises.filter((exercise) => {
        const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || exercise.muscle === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="page exercise-library">
            <header className="page-header">
                <h1>Exercises</h1>
            </header>

            <div className="search-container">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search exercises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            <div className="exercise-list">
                {filteredExercises.map((exercise) => (
                    <div
                        key={exercise.id}
                        className="exercise-item"
                        onClick={() => navigate(`/exercises/${exercise.id}`)}
                    >
                        <div className="exercise-info">
                            <h3>{exercise.name}</h3>
                            <p>{exercise.muscle}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="fab-add" onClick={() => setIsModalOpen(true)}>
                <Plus size={24} />
            </button>

            {isModalOpen && (
                <CreateExerciseModal
                    onClose={() => setIsModalOpen(false)}
                    onSave={addExercise}
                />
            )}
        </div>
    );
};

export default ExerciseLibrary;
