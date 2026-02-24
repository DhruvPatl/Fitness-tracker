import { Check, Trash2 } from 'lucide-react';
import '../styles/SetRow.css';

const SetRow = ({
    setIndex,
    set,
    weightUnit,
    onUpdate,
    onToggleComplete,
    onRemove
}) => {
    return (
        <div className={`active-set-row ${set.completed ? 'completed' : ''}`}>
            <div className="set-badge">{setIndex + 1}</div>

            <div className="input-field-group">
                <span className="field-label">{weightUnit.toUpperCase()}</span>
                <input
                    type="number"
                    value={set.weight}
                    onChange={(e) => onUpdate('weight', e.target.value)}
                    className="active-set-input"
                    placeholder="-"
                />
            </div>

            <div className="input-field-group">
                <span className="field-label">REPS</span>
                <input
                    type="tel"
                    value={set.reps}
                    onChange={(e) => onUpdate('reps', e.target.value)}
                    className="active-set-input"
                    placeholder="-"
                />
            </div>

            <button
                className={`active-btn-check ${set.completed ? 'is-complete' : ''}`}
                onClick={onToggleComplete}
            >
                {set.completed ? <Check size={18} /> : <Check size={18} strokeOpacity={0.2} />}
            </button>
        </div>
    );
};


export default SetRow;
