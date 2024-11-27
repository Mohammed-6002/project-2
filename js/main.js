const cells = document.querySelectorAll(".cell");
const winnerMessage = document.querySelector(".winner-message");
const winnerText = document.querySelector(".winner-text");
const resetButton = document.querySelector(".reset-button");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let boardState = Array(9).fill(null);
let score = { X: 0, O: 0 };

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  });
}

function isDraw() {
  return boardState.every(cell => cell !== null);
}

function handleClick(event) {
  const index = event.target.dataset.index;
  
  if (boardState[index] === null && winnerMessage.classList.contains("hidden")) {
    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer);

    if (checkWinner()) {
      score[currentPlayer]++;
      updateScoreboard();
      winnerText.textContent = `Speler ${currentPlayer} wint!`;
      winnerMessage.classList.remove("hidden");
    } else if (isDraw()) {
      winnerText.textContent = "Het is een gelijkspel!";
      winnerMessage.classList.remove("hidden");
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function updateScoreboard() {
  scoreX.textContent = score.X;
  scoreO.textContent = score.O;

  if (score.X === 5 || score.O === 5) {
    winnerText.textContent = `Speler ${currentPlayer} heeft 5 punten behaald en gewonnen!`;
  }
}

function resetGame() {
  boardState.fill(null);
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
  currentPlayer = "X";
  winnerMessage.classList.add("hidden");
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);








  