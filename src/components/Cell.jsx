import './Cell.css';

function Cell({
    value,
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

    return (
        <div
            className={classes}
            onClick={() => onClick(row, col)}
            data-testid={`cell-${row}-${col}`}
        >
            {value || ''}
        </div>
    );
}

export default Cell;
