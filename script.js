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


  return {
    newGame,
    play,
    render
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
        playerTurn = playerY.getMarker();
      } else {
        playerY.play([rowPosition, columnPosition]);
        playerTurn = playerX.getMarker();
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

  return {
    getMarker,
    getName,
    play
  }

}