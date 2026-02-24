import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, ArrowLeft, ChevronRight } from 'lucide-react';
import { useExercises } from '../hooks/useExercises';
import CategoryFilter from '../components/CategoryFilter';
import CreateExerciseModal from '../components/CreateExerciseModal';
import '../styles/ExerciseLibrary.css';

const ExerciseLibrary = () => {
    const navigate = useNavigate();
    const { exercises, addExercise } = useExercises();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredExercises = exercises.filter((exercise) => {
        const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || exercise.muscle === selectedCategory;
        return matchesSearch && matchesCategory;
    }).sort((a, b) => a.name.localeCompare(b.name));

    // Group by first letter
    const grouped = filteredExercises.reduce((acc, ex) => {
        const letter = ex.name[0].toUpperCase();
        if (!acc[letter]) acc[letter] = [];
        acc[letter].push(ex);
        return acc;
    }, {});

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="page exercise-library">
            <header className="library-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </button>
                <h2>Exercise Library</h2>
                <button className="add-btn" onClick={() => setIsModalOpen(true)}>
                    <Plus size={24} />
                </button>
            </header>

            <div className="search-container">
                <Search className="search-icon" size={18} />
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

            <div className="library-content">
                <div className="exercise-groups">
                    {Object.keys(grouped).sort().map(letter => (
                        <div key={letter} className="letter-group">
                            <span className="group-letter">{letter}</span>
                            <div className="group-items">
                                {grouped[letter].map(exercise => (
                                    <div
                                        key={exercise.id}
                                        className="exercise-card"
                                        onClick={() => navigate(`/exercises/${exercise.id}`)}
                                    >
                                        <div className="exercise-thumb">
                                            <img src={`https://ui-avatars.com/api/?name=${exercise.name}&background=1a1a1a&color=fff&size=64`} alt="" />
                                        </div>
                                        <div className="exercise-details">
                                            <span className="exercise-name">{exercise.name}</span>
                                            <span className="exercise-category">{exercise.muscle}</span>
                                        </div>
                                        <ChevronRight size={18} className="chevron" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="alphabet-gutter">
                    {alphabet.map(letter => (
                        <span key={letter} className={grouped[letter] ? 'active' : ''}>{letter}</span>
                    ))}
                </div>
            </div>

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
