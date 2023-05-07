var board = ['', '', '', '', '', '', '', '', ''];
var currentPlayer = 'X';
var isAgainstAI = true; // Variable que indica si se juega contra la IA

// Añadir evento de click a cada celda
var cells = document.getElementsByClassName('cell');
for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', function(e) {
    var index = Array.prototype.indexOf.call(cells, e.target);
    makeMove(index);
  });
}

function makeMove(index) {
  if (board[index] === '') {
    board[index] = currentPlayer;
    cells[index].innerText = currentPlayer;

    if (checkWin(currentPlayer)) {
      showResult(currentPlayer + ' wins!');
    } else if (board.indexOf('') === -1) {
      showResult('It\'s a tie!');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

      if (isAgainstAI && currentPlayer === 'O') {
        makeAIMove();
      }
    }
  }
}

function makeAIMove() {
  var emptyCells = [];
  for (var i = 0; i < board.length; i++) {
    if (board[i] === '') {
      emptyCells.push(i);
    }
  }

  var randomIndex = Math.floor(Math.random() * emptyCells.length);
  var aiMove = emptyCells[randomIndex];

  setTimeout(function() {
    makeMove(aiMove);
  }, 500);
}

function checkWin(player) {
  var winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (var i = 0; i < winningCombinations.length; i++) {
    var [a, b, c] = winningCombinations[i];
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }

  return false;
}

function showResult(message) {
  setTimeout(function() {
    alert(message);
    resetBoard();
  }, 500);
}

function resetBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';

  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
  }
}

function toggleGameModeVs() {
  isAgainstAI = false;
  resetBoard();
}
function toggleGameModeIa() {
  isAgainstAI = true;
  resetBoard();
}

// Iniciar juego
resetBoard();
