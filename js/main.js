document.addEventListener("DOMContentLoaded", () => {
    const player1Input = document.querySelector("#player1");
    const player2Input = document.querySelector("#player2");
    const startButton = document.querySelector(".start");
    const restartButton = document.querySelector(".restart");
    const board = document.querySelector(".board");
    const message = document.querySelector(".message");
    const scores = {
      X: document.querySelector(".score[data-player='X']"),
      O: document.querySelector(".score[data-player='O']"),
    };
  
    let boardState = Array(9).fill("");
    let currentPlayer = "X";
    let score = { X: 0, O: 0 };
    let player1, player2;
    let gameOver = false;
  
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
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          return boardState[a];
        }
      }
      return boardState.includes("") ? null : "Tie";
    }
  
    function updateScore() {
      scores.X.textContent = `${player1}: ${score.X}`;
      scores.O.textContent = `${player2}: ${score.O}`;
    }
  
    function resetBoard() {
      boardState.fill("");
      board.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
      });
      gameOver = false;
      message.textContent = `${currentPlayer === "X" ? player1 : player2}'s beurt`;
    }
  
    function createBoard() {
      board.innerHTML = "";
      boardState.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
      });
    }
  
    function handleMove(e) {
      if (gameOver) return;
  
      const cell = e.target;
      const index = cell.dataset.index;
  
      if (!boardState[index]) {
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");
  
        const winner = checkWinner();
  
        if (winner) {
          if (winner === "Tie") {
            message.textContent = "Het is gelijkspel!";
          } else {
            score[currentPlayer]++;
            updateScore();
  
            if (score[currentPlayer] >= 5) {
              message.textContent = `${currentPlayer === "X" ? player1 : player2} wint het spel!`;
            } else {
              message.textContent = `${currentPlayer === "X" ? player1 : player2} wint deze ronde!`;
            }
          }
          gameOver = true;
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          message.textContent = `${currentPlayer === "X" ? player1 : player2}'s beurt`;
        }
      }
    }
  
    startButton.addEventListener("click", () => {
      player1 = player1Input.value || "Speler 1";
      player2 = player2Input.value || "Speler 2";
      score = { X: 0, O: 0 };
      currentPlayer = "X";
      updateScore();
      createBoard();
      document.querySelector(".settings").classList.add("hidden");
      document.querySelector(".game").classList.remove("hidden");
      message.textContent = `${player1}'s beurt`;
    });
  
    restartButton.addEventListener("click", resetBoard);
  });
  