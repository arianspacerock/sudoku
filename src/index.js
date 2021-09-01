module.exports = function solveSudoku(matrix) {
  // your solution
  const checkRow = (row, n) => {
    return !matrix[row].some((num) => num === n);
  }

  const checkCol = (col, n) => {
    return !matrix.some((line) => line[col] === n);
  }

  const checkSquare = (row, col, n) => {
    for (let i = 0; i < Math.sqrt(matrix.length); i++) {
      for (let j = 0; j < Math.sqrt(matrix.length); j++) {
        if (matrix[i + row][j + col] === n) {
          return false;
        }
      }
    }
    return true;
  }

  const cellExists = (row, col, n) => {
    return checkRow(row, n) &&
        checkCol(col, n) &&
        checkSquare(row - row % 3, col - col % 3, n);

  }

  const solve = () => {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix.length; col++) {
        if (matrix[row][col] === 0) {
          for (let num = 1; num <= matrix.length; num++) {
            if (cellExists(row, col, num, matrix)) {
              matrix[row][col] = num;
              if (solve()) {
                return true;
              } else {
                matrix[row][col] = 0;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  solve();
  return matrix;
}

