let board = Array(9).fill('');
let currentPlayer = 'X';
let isGameOver = false;
let vsAI = false;

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');

function drawBoard() {
  boardEl.innerHTML = '';
  board.forEach((cell, index) => {
    const cellEl = document.createElement('div');
    cellEl.classList.add('cell');
    cellEl.textContent = cell;
    cellEl.onclick = () => handleCellClick(index);
    boardEl.appendChild(cellEl);
  });
}

function handleCellClick(index) {
  if (board[index] || isGameOver) return;
  board[index] = currentPlayer;
  drawBoard();
  if (checkWinner()) {
    statusEl.textContent = `${currentPlayer} wins!`;
    isGameOver = true;
    return;
  } else if (board.every(cell => cell)) {
    statusEl.textContent = "It's a draw!";
    isGameOver = true;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusEl.textContent = `${currentPlayer}'s turn`;

  if (vsAI && currentPlayer === 'O' && !isGameOver) {
    setTimeout(aiMove, 500);
  }
}

function aiMove() {
  const emptyIndices = board.map((val, idx) => val === '' ? idx : null).filter(v => v !== null);
  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  handleCellClick(randomIndex);
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  isGameOver = false;
  vsAI = false;
  statusEl.textContent = "X's turn";
  drawBoard();
}

function playWithAI() {
  resetGame();
  vsAI = true;
}

resetGame();
