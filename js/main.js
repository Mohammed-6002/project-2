const cells = document.querySelectorAll(".cell");
const winnerMessage = document.querySelector(".winner-message");
const winnerText = document.querySelector(".winner-text");
const nextRoundButton = document.querySelector(".next-round-button");
const scoreX = document.querySelector("#scoreX");
const scoreO = document.querySelector("#scoreO");
const gamemodeButtons = document.querySelectorAll(".gamemode-button");

let currentPlayer = "X";
let boardState = Array(9).fill(null);
let score = { X: 0, O: 0 };
let gamemode = "";

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

  if (boardState[index] === null && winnerMessage.classList.contains("hidden") && score.X < 5 && score.O < 5) {
    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer);

    if (checkWinner()) {
      score[currentPlayer]++;
      updateScoreboard();
      winnerText.textContent = `Speler ${currentPlayer} wint deze ronde!`;
      winnerMessage.classList.remove("hidden");

      if (score[currentPlayer] === 5) {
        winnerText.textContent = `Speler ${currentPlayer} heeft 5 punten behaald en gewonnen!`;
        nextRoundButton.textContent = "Play again";
        nextRoundButton.classList.remove("hidden");
        cells.forEach(cell => cell.removeEventListener("click", handleClick));
      } else {
        nextRoundButton.textContent = "Next Round";
        nextRoundButton.classList.remove("hidden");
      }
    } else if (isDraw()) {
      winnerText.textContent = "Het is een gelijkspel!";
      winnerMessage.classList.remove("hidden");
      nextRoundButton.textContent = "Next Round";
      nextRoundButton.classList.remove("hidden");
      cells.forEach(cell => cell.removeEventListener("click", handleClick));
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";

      if (gamemode === "computer" && currentPlayer === "O") {
        setTimeout(computerMove, 500);
      }
    }
  }
}

function computerMove() {
  const availableCells = boardState
    .map((value, index) => (value === null ? index : null))
    .filter(index => index !== null);
  const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

  if (randomIndex !== undefined) {
    const cell = cells[randomIndex];
    cell.click();
  }
}

function updateScoreboard() {
  scoreX.textContent = score.X;
  scoreO.textContent = score.O;
}

function startNextRound() {
  boardState.fill(null);
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
  currentPlayer = "X";
  winnerMessage.classList.add("hidden");
  nextRoundButton.classList.add("hidden");
  cells.forEach(cell => cell.addEventListener("click", handleClick));
}

function resetGame() {
  score.X = 0;
  score.O = 0;
  updateScoreboard();
  boardState.fill(null);
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
  currentPlayer = "X";
  winnerMessage.classList.add("hidden");
  nextRoundButton.classList.add("hidden");
  cells.forEach(cell => cell.addEventListener("click", handleClick));
}

function selectGamemode(mode) {
  gamemode = mode;
  document.querySelector(".gamemode-selection").classList.add("hidden");
  document.querySelector(".board").classList.remove("hidden");
  document.querySelector(".scoreboard").classList.remove("hidden");
  cells.forEach(cell => cell.addEventListener("click", handleClick));
}

nextRoundButton.classList.add("hidden");

gamemodeButtons.forEach(button => {
  button.addEventListener("click", () => selectGamemode(button.dataset.mode));
});

nextRoundButton.addEventListener("click", function() {
  if (score.X === 5 || score.O === 5) {
    resetGame();
  } else {
    startNextRound();
  }
});













  