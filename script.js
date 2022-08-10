// Doucment elements
const gameContainer = document.getElementById("game-container");
const gameWrapper = document.getElementById("game-wrapper");
const newGameButton = document.getElementById("new-game-button");
const startGameButton = document.getElementById("start-game-button")
const purpleMarker = '<div class="marker"><div class="circle shadow"></div><div class="circle"><div class="circle shine"></div></div></div>'
const yellowMarker = '<div class="marker yellow"><div class="circle shadow"></div><div class="circle"><div class="circle shine"></div></div></div>'
const backButton = document.getElementById("back-button")
const playerForm = document.getElementById("player-form")

// Event listeners
gameContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("grid-item") && !gameController.isGameOver()) {
    const cellIndex = e.target.getAttribute("data-cell-index");

    gameController.playerTurn(cellIndex);
  }
});

newGameButton.addEventListener("click", () => {
  gameController.newGame();
});

startGameButton.addEventListener("click", () => {
  let player1 = playerForm.elements["player1"].value;
  let player2 = playerForm.elements["player2"].value;

  gameController.setPlayers(player1, player2);
  playerForm.parentElement.classList.toggle("submit");
  gameWrapper.classList.toggle("show");
});

backButton.addEventListener("click", () => {
  playerForm.parentElement.classList.toggle("submit");
  gameWrapper.classList.toggle("show");
  gameController.resetGame()
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

// Players factory for creating players
const Player = (name, marker) => {
  let winCount = 0;

  const addWin = () => {
    winCount++;
  };

  const getWinCount = () => {
    return winCount;
  };

  return { name, marker, addWin, getWinCount };
};

// Game flow module to keep track of and control the flow of the game
const gameController = (() => {
  let player1 = { name: "P1", marker: purpleMarker}
  let player2 = { name: "P2", marker: yellowMarker }
  let currentPlayer = player1;
  let gameOver = false;

  const setPlayers = (p1, p2) => {
    player1 = Player(p1, purpleMarker);
    player2 = Player(p2, yellowMarker);
    displayController.setScoreboardNames(player1, player2);
    currentPlayer = player1;
  };

  const playerTurn = (index) => {
    if (gameBoard.isSpotEmpty(index)) {
      gameBoard.placeMarker(currentPlayer.marker, index);
      displayController.placeMarker(currentPlayer.marker, index);
      checkGameState(currentPlayer.marker);
      switchMarker();
    }
  };

  const checkGameState = (marker) => {
    if (gameBoard.hasThreeInRow(marker)) {
      gameOver = true
      updateScore();
      displayController.gameNotification(`🎉 Congratulations! ${currentPlayer.name} wins! 🎉`)
    } else if (gameBoard.isBoardFilled()) {
      gameOver = true
      displayController.gameNotification("🤷🏻‍♂️ Draw game! Nobody wins... 🤷🏻‍♂️")
    } else {
      console.log('No winner yet')
    }
  };

  const updateScore = () => {
    if (currentPlayer === player1) {
      player1.addWin();
    } else {
      player2.addWin();
    }
    displayController.updateScores(player1, player2);
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

  const newGame = () => {
    currentPlayer = player1;
    gameOver = false;
    gameBoard.reset();
    displayController.clearGameBoard();
  };

  const resetGame = () => {
    currentPlayer = player1;
    gameOver = false;
    gameBoard.reset();
    displayController.reset();
  };

  return { playerTurn, isGameOver, resetGame, setPlayers, newGame };
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

  const clearGameBoard = () => {
    const gameCells = document.querySelectorAll("div.grid-item")
    gameCells.forEach(cell => {
      cell.innerHTML = ""
    })
    gameNotificationDiv.classList.add("is-hidden");
  };

  const reset = () => {
    clearGameBoard();
    playerOneScore.innerHTML = 0;
    playerTwoScore.innerHTML = 0;
  };

  const gameNotification = (message) => {
    gameNotificationDiv.innerHTML = message;
    gameNotificationDiv.classList.toggle("is-hidden");
  };

  const setScoreboardNames = (p1, p2) => {
    playerOneName.innerHTML = p1.name;
    playerTwoName.innerHTML = p2.name;
  };

  const updateScores = (p1, p2) => {
    playerOneScore.innerHTML = p1.getWinCount();
    playerTwoScore.innerHTML = p2.getWinCount();
  };

  const playerOneName = document.getElementById("p1-name");
  const playerTwoName = document.getElementById("p2-name"); 
  const playerOneScore = document.getElementById("p1-score");
  const playerTwoScore = document.getElementById("p2-score");
  const gameNotificationDiv = document.getElementById("game-notification")

  return { buildNewGameBoard, placeMarker, clearGameBoard, reset, gameNotification, setScoreboardNames, updateScores }
})();

displayController.buildNewGameBoard()