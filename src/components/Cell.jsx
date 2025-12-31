import './Cell.css';

function Cell({
    value,
    notes,
    isInitial,
    isSelected,
    isHighlighted,
    isConflict,
    isSameNumber,
    row,
    col,
    onClick
}) {
    const classes = [
        'cell',
        isInitial && 'initial',
        isSelected && 'selected',
        isHighlighted && 'highlighted',
        isConflict && 'conflict',
        isSameNumber && 'same-number',
        col % 3 === 2 && col !== 8 && 'border-right',
        row % 3 === 2 && row !== 8 && 'border-bottom'
    ].filter(Boolean).join(' ');

    // Render notes grid if no value and has notes
    const renderNotes = () => {
        if (value !== 0 || !notes || notes.size === 0) return null;

        return (
            <div className="notes-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <span key={num} className={`note ${notes.has(num) ? 'active' : ''}`}>
                        {notes.has(num) ? num : ''}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div
            className={classes}
            onClick={() => onClick(row, col)}
            data-testid={`cell-${row}-${col}`}
        >
            {value !== 0 ? value : renderNotes()}
        </div>
    );
}

export default Cell;
