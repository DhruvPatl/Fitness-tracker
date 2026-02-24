import { MoreHorizontal, Plus } from 'lucide-react';
import SetRow from './SetRow';
import '../styles/WorkoutExercise.css';

const WorkoutExercise = ({
    index,
    exercise,
    totalExercises,
    weightUnit,
    onAddSet,
    onUpdateSet,
    onToggleSetComplete,
    onRemoveSet
}) => {
    return (
        <div className="workout-exercise-container">
            <div className="exercise-header-row">
                <div className="exercise-title-info">
                    <h3 className="exercise-title-active">{exercise.name}</h3>
                    <p className="exercise-previous">Previous: 225 lbs x 8 reps</p>
                </div>
                <div className="exercise-progress">
                    <span>{index + 1} of {totalExercises}</span>
                </div>
            </div>

            <div className="sets-list-active">
                {exercise.sets.map((set, setIndex) => (
                    <SetRow
                        key={set.id}
                        setIndex={setIndex}
                        set={set}
                        weightUnit={weightUnit}
                        onUpdate={(field, value) => onUpdateSet(index, setIndex, field, value)}
                        onToggleComplete={() => onToggleSetComplete(index, setIndex)}
                        onRemove={() => onRemoveSet(index, setIndex)}
                    />
                ))}
            </div>

            <button className="btn-add-set-active" onClick={() => onAddSet(index)}>
                <Plus size={16} />
                <span>Add Set</span>
            </button>
        </div>
    );
};


export default WorkoutExercise;
