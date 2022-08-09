// Doucment elements
const gameContainer = document.getElementById("game-container");

// Event listeners
gameContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("grid-item")) {
    const cellIndex = e.target.getAttribute("data-cell-index");

    gameController.playerTurn(cellIndex);
  }
});

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
  
  return { placeMarker, isSpotEmpty, isBoardFilled, hasThreeInRow };
})();

// Game flow module to keep track of and control the flow of the game
const gameController = (() => {
  let currentPlayer = "x"
  let notCurrentPlayer = "o"

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
      console.log("Winner")
    } else if (gameBoard.isBoardFilled()) {
      console.log('No winner')
    } else {
      console.log('No winner yet')
    }
  }

  const switchMarker = () => {
    [currentPlayer, notCurrentPlayer] = [notCurrentPlayer, currentPlayer]
  }

  return { playerTurn };
})();

// Display controller to build and update the DOM through the game
const displayController = ((gameBoard) => {
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

  return { buildNewGameBoard, placeMarker }
})(gameBoard);

// Players factory for creating players
const Player = (name, marker) => {
  return { name, marker };
};

let playerX = Player("Ayrton", "×")
let playerY = Player("Vicky", "ဝ")
displayController.buildNewGameBoard()