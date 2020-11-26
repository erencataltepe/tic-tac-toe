const gameBoard = (function () {
  let board = [];
  const playerXNameText = document.getElementById("player-x-name");
  const playerONameText = document.getElementById("player-o-name");
  const displayText = document.getElementById("result");

  function newGame() {
    board = []
    playerXNameText.textContent = "Player X";
    playerONameText.textContent = "Player O";
    displayText.textContent = "";
    for (let i = 0; i < 3; i++) {
      let subArr = [];
      for (let j = 0; j < 3; j++) {
        subArr.push("");
      }
      board.push(subArr);
    }
  }

  function play(marker, position) {
    const rowPosition = position[0];
    const columnPosition = position[1];
    if (isValid(rowPosition, columnPosition)) {
      board[rowPosition][columnPosition] = marker;
      return true;
    } else {
      return false;
    }
  }

  function isValid(rowPosition, columnPosition) {
    if (board[rowPosition][columnPosition] == "") {
      return true;
    } else {
      return false;
    }
  }

  function render(cells) {
    let tempBoard = [].concat(...board);
    for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = tempBoard[i];
    }
  }

  function roundOver() {
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] != "" && (board[i][0] == board[i][1] && board[i][0] == board[i][2])) {
        return true;
      } else if (board[0][i] != "" && (board[0][i] == board[1][i] && board[0][i] == board[2][i])) {
        return true;
      }
    }



    if (board[0][0] != "" && (board[0][0] == board[1][1] && board[0][0] == board[2][2])) {
      return true;
    } else if (board[2][0] != "" && (board[2][0] == board[1][1] && board[2][0] == board[0][2])) {
      return true;
    }

    return false;
  }

  function isATie(cells) {

    for (let i = 0; i < cells.length; i++) {
      if (cells[i].textContent == "") {
        return false;
      }
    }
    return true;

  }

  return {
    newGame,
    play,
    render,
    roundOver,
    isATie
  }

})();

const game = (function () {
  const cells = document.querySelectorAll(".cell");
  const newGameButton = document.getElementById("new-game-button");

  const resultText = document.getElementById("result");


  gameBoard.newGame();
  gameBoard.render(cells);

  const playerX = player("X");
  const playerO = player("O");

  let playerTurn = "X";

  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      playGame(e);
    })
  })

  newGameButton.addEventListener("click", () => {
    gameBoard.newGame();
    gameBoard.render(cells);
    playerTurn = "X";
  })



  function playGame(event) {
    const rowPosition = Number(event.target.dataset.row);
    const columnPosition = Number(event.target.dataset.column);
    if (!gameBoard.roundOver()) {
      if (gameBoard.isATie(cells)) {
        resultText.textContent = "It is a tie!!!";
      }
      if (playerTurn === playerX.getMarker()) {
        playerX.play([rowPosition, columnPosition]);
        if (gameBoard.roundOver()) {
          gameBoard.render(cells);
          resultText.textContent = `Player ${playerX.getName()} wins the game!!`
          return true;
        } else {
          playerTurn = playerO.getMarker();
        }
        if (gameBoard.isATie(cells)) {
          resultText.textContent = "It is a tie!!!";
        }
      } else {
        playerO.play([rowPosition, columnPosition]);
        if (gameBoard.roundOver()) {
          gameBoard.render(cells);
          resultText.textContent = `Player ${playerO.getName()} wins the game!!`
          return true;
        } else {
          playerTurn = playerX.getMarker();
        }
      }
    }
    gameBoard.render(cells);
  }

})();

function player(marker) {
  let name = marker;

  function getMarker() {
    return marker;
  }

  function getName() {
    return name;
  }

  function setName(newName) {
    name = newName;
  }

  function play(position) {
    return gameBoard.play(marker, position);
  }



  return {
    getMarker,
    getName,
    play,
    setName
  }

}