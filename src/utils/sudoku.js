// Sudoku puzzle generation and validation utilities

// Generate a complete valid Sudoku grid
function generateCompleteGrid() {
  const grid = Array(9).fill(null).map(() => Array(9).fill(0));
  fillGrid(grid);
  return grid;
}

function fillGrid(grid) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        const shuffled = shuffleArray([...numbers]);
        
        for (const num of shuffled) {
          if (isValidPlacement(grid, row, col, num)) {
            grid[row][col] = num;
            
            if (fillGrid(grid)) {
              return true;
            }
            
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Check if placing a number at a position is valid
export function isValidPlacement(grid, row, col, num) {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }
  
  // Check column
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false;
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[boxRow + i][boxCol + j] === num) return false;
    }
  }
  
  return true;
}

// Generate a puzzle by removing numbers from complete grid
export function generatePuzzle(difficulty = 'medium') {
  const solution = generateCompleteGrid();
  const puzzle = solution.map(row => [...row]);
  
  // Number of cells to remove based on difficulty
  const cellsToRemove = {
    easy: 30,
    medium: 40,
    hard: 50,
    expert: 55
  }[difficulty] || 40;
  
  let removed = 0;
  const positions = [];
  
  for (let i = 0; i < 81; i++) {
    positions.push(i);
  }
  
  shuffleArray(positions);
  
  for (const pos of positions) {
    if (removed >= cellsToRemove) break;
    
    const row = Math.floor(pos / 9);
    const col = pos % 9;
    
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }
  
  return { puzzle, solution };
}

// Check if the puzzle is completely and correctly filled
export function checkWin(grid, solution) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] !== solution[row][col]) {
        return false;
      }
    }
  }
  return true;
}

// Find conflicts in the current grid
export function findConflicts(grid) {
  const conflicts = new Set();
  
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = grid[row][col];
      if (num === 0) continue;
      
      // Check row
      for (let x = 0; x < 9; x++) {
        if (x !== col && grid[row][x] === num) {
          conflicts.add(`${row}-${col}`);
          conflicts.add(`${row}-${x}`);
        }
      }
      
      // Check column
      for (let x = 0; x < 9; x++) {
        if (x !== row && grid[x][col] === num) {
          conflicts.add(`${row}-${col}`);
          conflicts.add(`${x}-${col}`);
        }
      }
      
      // Check 3x3 box
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const r = boxRow + i;
          const c = boxCol + j;
          if ((r !== row || c !== col) && grid[r][c] === num) {
            conflicts.add(`${row}-${col}`);
            conflicts.add(`${r}-${c}`);
          }
        }
      }
    }
  }
  
  return conflicts;
}
