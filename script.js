const gameBoard = (function () {
  const cells = document.querySelectorAll(".cell");
  const board = [];

  function render() {
    let cellIndex = 0;
    for (let i = 0; i < 3; i++) {
      let subArr = [];
      for (let j = 0; j < 3; j++) {
        subArr.push(cells[cellIndex].textContent);
        cellIndex++;
      }
      board.push(subArr);
    }
  }

  function newGame() {
    for (let i = 0; i < 3; i++) {
      let subArr = [];
      for (let j = 0; j < 3; j++) {
        subArr.push("");
      }
      board.push(subArr);
    }
  }

  console.log(board);
  return {
    render,
    newGame
  }

})();

const game = (function () {
  gameBoard.newGame();
})();