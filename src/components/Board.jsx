import Cell from './Cell';
import './Board.css';

function Board({
    grid,
    initialGrid,
    selectedCell,
    conflicts,
    onCellClick
}) {
    const selectedValue = selectedCell
        ? grid[selectedCell.row][selectedCell.col]
        : null;

    return (
        <div className="board">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((value, colIndex) => {
                        const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                        const isHighlighted = selectedCell && (
                            selectedCell.row === rowIndex ||
                            selectedCell.col === colIndex ||
                            (Math.floor(selectedCell.row / 3) === Math.floor(rowIndex / 3) &&
                                Math.floor(selectedCell.col / 3) === Math.floor(colIndex / 3))
                        );
                        const isSameNumber = selectedValue && value === selectedValue && value !== 0 && !isSelected;

                        return (
                            <Cell
                                key={`${rowIndex}-${colIndex}`}
                                value={value}
                                isInitial={initialGrid[rowIndex][colIndex] !== 0}
                                isSelected={isSelected}
                                isHighlighted={isHighlighted && !isSelected}
                                isConflict={conflicts.has(`${rowIndex}-${colIndex}`)}
                                isSameNumber={isSameNumber}
                                row={rowIndex}
                                col={colIndex}
                                onClick={onCellClick}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default Board;
