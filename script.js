// Doucment elements
const gameContainer = document.getElementById("game-container");
const resetButton = document.getElementById("reset-button");

// Event listeners
gameContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("grid-item") && !gameController.isGameOver()) {
    const cellIndex = e.target.getAttribute("data-cell-index");

    gameController.playerTurn(cellIndex);
  }
});

resetButton.addEventListener("click", () => {
  gameController.resetGame();
})

// Gameboard module to keep track of current state of board
const gameBoard = (() => {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                 [0, 3, 6], [1, 4, 7], [2, 5, 8],
                 [0, 4, 8], [2, 4, 6]];

  const board = ["", "", "", "", "", "", "", "", ""];
  
  const placeMarker = (marker, index) => {
    board[index] = marker
  };

  const isSpotEmpty = (index) => {
    return board[index] === "";
  };

  const isBoardFilled = () => {
    return !board.includes("");
  }

  const hasThreeInRow = (marker) => {
    for (let i = 0; i < lines.length; i++) {
      if (board[lines[i][0]] === marker && board[lines[i][1]] === marker && board[lines[i][2]] === marker) {
        return true;
      }
    }

    return false;
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  }
  
  return { placeMarker, isSpotEmpty, isBoardFilled, hasThreeInRow, reset };
})();

// Game flow module to keep track of and control the flow of the game
const gameController = (() => {
  let player1 = "x"
  let player2 = "o"
  let currentPlayer = player1;
  let gameOver = false;

  const playerTurn = (index) => {
    if (gameBoard.isSpotEmpty(index)) {
      gameBoard.placeMarker(currentPlayer, index);
      displayController.placeMarker(currentPlayer, index);
      checkGameState(currentPlayer);
      switchMarker();
    }
  };

  const checkGameState = (marker) => {
    if (gameBoard.hasThreeInRow(marker)) {
      gameOver = true
      console.log("Winner")
    } else if (gameBoard.isBoardFilled()) {
      gameOver = true
      console.log('No winner')
    } else {
      console.log('No winner yet')
    }
  };

  const switchMarker = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const isGameOver = () => {
    return gameOver;
  };

  const resetGame = () => {
    currentPlayer = player1;
    gameOver = false;
    gameBoard.reset();
    displayController.reset();
  };

  return { playerTurn, isGameOver, resetGame };
})();

// Display controller to build and update the DOM through the game
const displayController = (() => {
  const buildNewGameBoard = () => {
    for (let i = 0; i < 9; i++) {
      const gameCell = document.createElement("div");
      gameCell.classList.add("grid-item");
      gameCell.setAttribute("data-cell-index", i);

      gameContainer.append(gameCell);
    }
  };

  const placeMarker = (marker, index) => {
    const gameCell = document.querySelector(`[data-cell-index="${index}"]`)
    gameCell.innerHTML = marker
  };

  const reset = () => {
    const gameCells = document.querySelectorAll("div.grid-item")
    gameCells.forEach(cell => {
      cell.innerHTML = ""
    })
  };

  return { buildNewGameBoard, placeMarker, reset }
})();

// Players factory for creating players
const Player = (name, marker) => {
  return { name, marker };
};

let playerX = Player("Ayrton", "×")
let playerY = Player("Vicky", "ဝ")
displayController.buildNewGameBoard()