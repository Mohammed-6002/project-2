const cells = document.querySelectorAll(".cell");
const winnerMessage = document.querySelector(".winner-message");
const winnerText = document.querySelector(".winner-text");
const resetButton = document.querySelector(".reset-button");

let currentPlayer = "X";
let boardState = Array(9).fill(null);

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
  return winningCombinations.find(combination => {
    const [a, b, c] = combination;
    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  });
}

function isDraw() {
  return boardState.every(cell => cell !== null);
}

function handleClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  // Controleer of de cel al is ingevuld en of er al een winnaar is
  if (!boardState[index] && winnerMessage.classList.contains("hidden")) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    const winner = checkWinner();
    if (winner) {
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



  