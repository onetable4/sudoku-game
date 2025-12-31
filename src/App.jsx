import { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import NumberPad from './components/NumberPad';
import GameControls from './components/GameControls';
import WinModal from './components/WinModal';
import { generatePuzzle, checkWin, findConflicts } from './utils/sudoku';
import './App.css';

function App() {
  const [difficulty, setDifficulty] = useState('medium');
  const [grid, setGrid] = useState([]);
  const [initialGrid, setInitialGrid] = useState([]);
  const [solution, setSolution] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [conflicts, setConflicts] = useState(new Set());
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const startNewGame = useCallback((diff = difficulty) => {
    const { puzzle, solution: sol } = generatePuzzle(diff);
    setGrid(puzzle.map(row => [...row]));
    setInitialGrid(puzzle.map(row => [...row]));
    setSolution(sol);
    setSelectedCell(null);
    setConflicts(new Set());
    setTime(0);
    setIsPlaying(true);
    setHasWon(false);
  }, [difficulty]);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying && !hasWon) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, hasWon]);

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  const handleNumberSelect = (num) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;

    // Can't change initial cells
    if (initialGrid[row][col] !== 0) return;

    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = num;
    setGrid(newGrid);

    // Check for conflicts
    const newConflicts = findConflicts(newGrid);
    setConflicts(newConflicts);

    // Check for win
    if (checkWin(newGrid, solution)) {
      setHasWon(true);
      setIsPlaying(false);
    }
  };

  const handleErase = () => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;

    // Can't erase initial cells
    if (initialGrid[row][col] !== 0) return;

    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = 0;
    setGrid(newGrid);

    const newConflicts = findConflicts(newGrid);
    setConflicts(newConflicts);
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    startNewGame(newDifficulty);
  };

  const handleKeyDown = useCallback((e) => {
    if (!selectedCell) return;

    const num = parseInt(e.key);
    if (num >= 1 && num <= 9) {
      handleNumberSelect(num);
    } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
      handleErase();
    } else if (e.key === 'ArrowUp' && selectedCell.row > 0) {
      setSelectedCell(prev => ({ ...prev, row: prev.row - 1 }));
    } else if (e.key === 'ArrowDown' && selectedCell.row < 8) {
      setSelectedCell(prev => ({ ...prev, row: prev.row + 1 }));
    } else if (e.key === 'ArrowLeft' && selectedCell.col > 0) {
      setSelectedCell(prev => ({ ...prev, col: prev.col - 1 }));
    } else if (e.key === 'ArrowRight' && selectedCell.col < 8) {
      setSelectedCell(prev => ({ ...prev, col: prev.col + 1 }));
    }
  }, [selectedCell, grid, initialGrid, solution]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (grid.length === 0) {
    return <div className="loading">로딩 중...</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>
          <span className="logo-icon">🧩</span>
          스도쿠
        </h1>
        <p className="subtitle">두뇌를 자극하는 숫자 퍼즐</p>
      </header>

      <main className="game-container">
        <GameControls
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          onNewGame={() => startNewGame()}
          time={time}
        />

        <Board
          grid={grid}
          initialGrid={initialGrid}
          selectedCell={selectedCell}
          conflicts={conflicts}
          onCellClick={handleCellClick}
        />

        <NumberPad
          onNumberSelect={handleNumberSelect}
          onErase={handleErase}
          disabled={!selectedCell || (selectedCell && initialGrid[selectedCell.row][selectedCell.col] !== 0)}
        />

        <div className="instructions">
          <p>💡 셀을 클릭하고 숫자를 입력하세요. 키보드 방향키와 숫자키도 사용 가능합니다.</p>
        </div>
      </main>

      {hasWon && (
        <WinModal
          time={time}
          onNewGame={() => startNewGame()}
          onClose={() => setHasWon(false)}
        />
      )}
    </div>
  );
}

export default App;
