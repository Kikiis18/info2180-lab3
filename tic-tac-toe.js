document.addEventListener("DOMContentLoaded", function () {
  const squares = document.querySelectorAll("#board > div");
  const gameState = Array(squares.length).fill(null);
  const status = document.querySelector("#status");
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let currentPlayer = "X";
  let gameOver = false;

  squares.forEach(function (square, index) {
    square.classList.add("square");

    square.addEventListener("mouseenter", function () {
      square.classList.add("hover");
    });

    square.addEventListener("mouseleave", function () {
      square.classList.remove("hover");
    });

    square.addEventListener("click", function () {
      if (gameOver || gameState[index] !== null) {
        return;
      }

      gameState[index] = currentPlayer;
      square.textContent = currentPlayer;
      square.classList.add(currentPlayer);

      const hasWon = winningCombinations.some(function (combination) {
        return combination.every(function (winningIndex) {
          return gameState[winningIndex] === currentPlayer;
        });
      });

      if (hasWon) {
        status.textContent = "Congratulations! " + currentPlayer + " is the Winner!";
        status.classList.add("you-won");
        gameOver = true;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    });
  });
});
