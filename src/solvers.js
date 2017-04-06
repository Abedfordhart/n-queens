/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(numRooks) {
  var solutionBoard = new Board({n: numRooks});
  for (var i = 0; i < numRooks; i++) {
    solutionBoard.get(i)[i] = 1;
  }

  var solution = solutionBoard.rows(); //fixme

  console.log('Single solution for ' + numRooks + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCounter = function(n) {
    if (n === 0) {
      return 1;
    } else {
      return n * solutionCounter(n - 1); 
    }
  };
  var solutionCount = solutionCounter(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(numQueens) {
  var solutionBoard = new Board({n: numQueens});
  var count = 0;

  var masterColIndex = 0;

  var findSolution = function(rowIndex, colIndex) {
    solutionBoard.get(rowIndex)[colIndex] = 1;
    count++;
    
    if (!solutionBoard.hasAnyRowConflicts() && 
        !solutionBoard.hasAnyColConflicts() &&
        !solutionBoard.hasAnyMajorDiagonalConflicts() &&
        !solutionBoard.hasAnyMinorDiagonalConflicts() &&
        count === numQueens) {
      
      return solutionBoard;

    } else if (!solutionBoard.hasAnyRowConflicts() && 
        !solutionBoard.hasAnyColConflicts() &&
        !solutionBoard.hasAnyMajorDiagonalConflicts() &&
        !solutionBoard.hasAnyMinorDiagonalConflicts()) {
      
      findSolution(rowIndex + 1, 0);

    } else {
      if (colIndex + 1 >= numQueens) {
        solutionBoard = new Board({n: numQueens});
        masterColIndex++;
        count = 0;
        findSolution(0, masterColIndex);
      } else {
        solutionBoard.get(rowIndex)[colIndex] = 0;
        count--;
        findSolution(rowIndex, colIndex + 1);
      }
    }
  };

  if (numQueens === 0 || numQueens === 2 || numQueens === 3) {
    solution = [];
  } else {
    findSolution(0, 0);    
  }

  var solution = solutionBoard.rows();

  console.log('Single solution for ' + numQueens + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var countBoard = new Board({n: n});
  
  if (n === 2 || n === 3) {
    return solutionCount;
  } 

  var counter = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      countBoard.togglePiece(row, i);

      if (!countBoard.hasAnyQueensConflicts()) {
        counter(row + 1);
      }
      countBoard.togglePiece(row, i);
    }
  }
  
  counter(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
