import { MoreHorizontal, Plus } from 'lucide-react';
import SetRow from './SetRow';
import '../styles/WorkoutExercise.css';

const WorkoutExercise = ({
    index,
    exercise,
    onAddSet,
    onUpdateSet,
    onToggleSetComplete,
    onRemoveSet
}) => {
    return (
        <div className="workout-exercise-card">
            <div className="exercise-header">
                <h3 className="exercise-title">{exercise.name}</h3>
                <button className="btn-options">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="sets-header">
                <span>Set</span>
                <span>kg</span>
                <span>Reps</span>
                <span>Done</span>
            </div>

            <div className="sets-list">
                {exercise.sets.map((set, setIndex) => (
                    <SetRow
                        key={set.id}
                        setIndex={setIndex}
                        set={set}
                        onUpdate={(field, value) => onUpdateSet(index, setIndex, field, value)}
                        onToggleComplete={() => onToggleSetComplete(index, setIndex)}
                        onRemove={() => onRemoveSet(index, setIndex)}
                    />
                ))}
            </div>

            <button className="btn-add-set" onClick={() => onAddSet(index)}>
                <Plus size={16} />
                <span>Add Set</span>
            </button>
        </div>
    );
};

export default WorkoutExercise;
