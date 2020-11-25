const gameBoard = (function () {
  const board = [];

  function newGame() {
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


  return {
    newGame,
    play,
    render,
    roundOver
  }

})();

const game = (function () {
  const cells = document.querySelectorAll(".cell");
  gameBoard.newGame();
  gameBoard.render(cells);
  const playerX = player("Eren", "X");
  const playerY = player("Nazlı", "O");
  let playerTurn = "X";

  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      const rowPosition = Number(e.target.dataset.row);
      const columnPosition = Number(e.target.dataset.column);
      if (playerTurn === playerX.getMarker()) {
        playerX.play([rowPosition, columnPosition]);
        if (gameBoard.roundOver()) {
          console.log("Player X wins the game");
          playerX.addScore();
        } else {
          playerTurn = playerY.getMarker();
        }
      } else {
        playerY.play([rowPosition, columnPosition]);
        if (gameBoard.roundOver()) {
          console.log("Player O wins the game");
          playerY.addScore();
        } else {
          playerTurn = playerX.getMarker();
        }
      }
      gameBoard.render(cells);
    })
  })


})();

function player(name, marker) {
  function getMarker() {
    return marker;
  }

  function getName() {
    return name;
  }

  function play(position) {
    return gameBoard.play(marker, position);
  }

  let score = 0;

  function getScore() {
    return score;
  }

  function addScore() {
    score++;
  }

  return {
    getMarker,
    getName,
    play,
    getScore,
    addScore
  }

}