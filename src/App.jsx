import { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import NumberPad from './components/NumberPad';
import GameControls from './components/GameControls';
import WinModal from './components/WinModal';
import { generatePuzzle, checkWin, findConflicts } from './utils/sudoku';
import './App.css';

// Create empty 9x9 notes grid (each cell is a Set)
function createEmptyNotes() {
  return Array(9).fill(null).map(() =>
    Array(9).fill(null).map(() => new Set())
  );
}

function App() {
  const [difficulty, setDifficulty] = useState('medium');
  const [grid, setGrid] = useState([]);
  const [notes, setNotes] = useState(createEmptyNotes());
  const [initialGrid, setInitialGrid] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [conflicts, setConflicts] = useState(new Set());
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [isNotesMode, setIsNotesMode] = useState(false);

  const startNewGame = useCallback((diff = difficulty) => {
    const { puzzle } = generatePuzzle(diff);
    setGrid(puzzle.map(row => [...row]));
    setInitialGrid(puzzle.map(row => [...row]));
    setNotes(createEmptyNotes());
    setSelectedCell(null);
    setConflicts(new Set());
    setTime(0);
    setIsPlaying(true);
    setHasWon(false);
    setIsNotesMode(false);
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

    if (isNotesMode) {
      // Toggle note
      const newNotes = notes.map(r => r.map(c => new Set(c)));
      if (newNotes[row][col].has(num)) {
        newNotes[row][col].delete(num);
      } else {
        newNotes[row][col].add(num);
      }
      setNotes(newNotes);

      // Clear value if adding notes
      if (grid[row][col] !== 0) {
        const newGrid = grid.map(r => [...r]);
        newGrid[row][col] = 0;
        setGrid(newGrid);
        const newConflicts = findConflicts(newGrid);
        setConflicts(newConflicts);
      }
    } else {
      // Normal input mode
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = num;
      setGrid(newGrid);

      // Clear notes when entering a value
      const newNotes = notes.map(r => r.map(c => new Set(c)));
      newNotes[row][col].clear();
      setNotes(newNotes);

      // Check for conflicts
      const newConflicts = findConflicts(newGrid);
      setConflicts(newConflicts);

      // Check for win
      if (checkWin(newGrid)) {
        setHasWon(true);
        setIsPlaying(false);
      }
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

    // Also clear notes
    const newNotes = notes.map(r => r.map(c => new Set(c)));
    newNotes[row][col].clear();
    setNotes(newNotes);

    const newConflicts = findConflicts(newGrid);
    setConflicts(newConflicts);
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    startNewGame(newDifficulty);
  };

  const handleToggleNotesMode = (mode) => {
    setIsNotesMode(mode);
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
    } else if (e.key === 'n' || e.key === 'N') {
      setIsNotesMode(prev => !prev);
    }
  }, [selectedCell, grid, notes, initialGrid, isNotesMode]);

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
          notes={notes}
          initialGrid={initialGrid}
          selectedCell={selectedCell}
          conflicts={conflicts}
          onCellClick={handleCellClick}
        />

        <NumberPad
          onNumberSelect={handleNumberSelect}
          onErase={handleErase}
          isNotesMode={isNotesMode}
          onToggleNotesMode={handleToggleNotesMode}
          disabled={!selectedCell || (selectedCell && initialGrid[selectedCell.row][selectedCell.col] !== 0)}
        />

        <div className="instructions">
          <p>💡 셀 클릭 후 숫자 입력 | 키보드 방향키 이동 | <strong>N키</strong>로 메모 모드 전환</p>
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
