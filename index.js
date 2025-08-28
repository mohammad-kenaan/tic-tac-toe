const gameBoardInDom = document.querySelector("#game-board");
const nextRoundBtn = document.querySelector(".next-round");
const newGameBtn = document.querySelector(".new-game");
const cells = document.querySelectorAll(".item");
const playerXScore = document.querySelector("#player-x");
const playerOScore = document.querySelector("#player-o");
const playerXImg = document.querySelector("#player-x-img");
const playerOiImg = document.querySelector("#player-o-img");
const firstUserName = document.querySelector(".first-username");
const secondUserName = document.querySelector(".second-username");


const player = function (name, symbol, playerImg) {
  let score = 0;
  const getName = () => name;
  const getSymbol = () => symbol;
  const getPlayerImg = () => playerImg;
  const increaseScore = () => score++;
  const getScore = () => score;
  const resetScore = () => score = 0;

  return { getName, getSymbol, getPlayerImg, increaseScore, getScore, resetScore }
}

const gameBoard = function () {

  let gameBoardArr = [null, null, null, null, null, null, null, null, null];

  const chooseSquare = function (userSymbol, index) {
    if (isAvailable(index)) {
      gameBoardArr[index] = userSymbol;
      return true;
    }
    return false;
  }

  const getGameBoarderArr = () => gameBoardArr;

  const isAvailable = function (index) {
    if (gameBoardArr[index] === null) return true;
    return false;
  }

  const checkWin = function (arr, userSymbol, index) {

    if (index === 0) {
      if (arr[0] === userSymbol &&
        arr[1] === userSymbol &&
        arr[2] === userSymbol ||
        arr[0] === userSymbol &&
        arr[3] === userSymbol &&
        arr[6] === userSymbol ||
        arr[0] === userSymbol &&
        arr[4] === userSymbol &&
        arr[8] === userSymbol
      ) return true;
      return false;
    }

    else if (index === 1) {
      if (arr[0] === userSymbol &&
        arr[1] === userSymbol &&
        arr[2] === userSymbol ||
        arr[1] === userSymbol &&
        arr[4] === userSymbol &&
        arr[7] === userSymbol
      ) return true;
      return false;
    }

    else if (index === 2) {
      if (arr[0] === userSymbol &&
        arr[1] === userSymbol &&
        arr[2] === userSymbol ||
        arr[2] === userSymbol &&
        arr[4] === userSymbol &&
        arr[6] === userSymbol ||
        arr[2] === userSymbol &&
        arr[5] === userSymbol &&
        arr[8] === userSymbol
      ) return true;
      return false;
    }

    else if (index === 3) {
      if (arr[0] === userSymbol &&
        arr[3] === userSymbol &&
        arr[6] === userSymbol ||
        arr[3] === userSymbol &&
        arr[4] === userSymbol &&
        arr[5] === userSymbol
      ) return true;
      return false;
    }

    else if (index === 4) {
      if (arr[3] === userSymbol &&
        arr[4] === userSymbol &&
        arr[5] === userSymbol ||
        arr[1] === userSymbol &&
        arr[4] === userSymbol &&
        arr[7] === userSymbol ||
        arr[0] === userSymbol &&
        arr[4] === userSymbol &&
        arr[8] === userSymbol ||
        arr[2] === userSymbol &&
        arr[4] === userSymbol &&
        arr[6] === userSymbol
      ) return true;
      return false;
    }

    else if (index === 5) {
      if (arr[3] === userSymbol &&
        arr[4] === userSymbol &&
        arr[5] === userSymbol ||
        arr[2] === userSymbol &&
        arr[5] === userSymbol &&
        arr[8] === userSymbol
      ) return true;
      return false;
    }

    else if (index === 6) {
      if (arr[0] === userSymbol &&
        arr[3] === userSymbol &&
        arr[6] === userSymbol ||
        arr[6] === userSymbol &&
        arr[7] === userSymbol &&
        arr[8] === userSymbol ||
        arr[2] === userSymbol &&
        arr[4] === userSymbol &&
        arr[6] === userSymbol
      ) return true;
      return false;
    }

    else if (index === 7) {
      if (arr[6] === userSymbol &&
        arr[7] === userSymbol &&
        arr[8] === userSymbol ||
        arr[1] === userSymbol &&
        arr[4] === userSymbol &&
        arr[7] === userSymbol
      ) return true;
      return false;
    }

    else if (index === 8) {
      if (arr[6] === userSymbol &&
        arr[7] === userSymbol &&
        arr[8] === userSymbol ||
        arr[2] === userSymbol &&
        arr[5] === userSymbol &&
        arr[8] === userSymbol ||
        arr[0] === userSymbol &&
        arr[4] === userSymbol &&
        arr[8] === userSymbol
      ) return true;
      return false;
    }
  }

  const nextRound = function () {
    gameBoardArr.fill(null);
    cells.forEach(cell => {
      cell.style.backgroundImage = "";
    });

  }

  const gameStop = function () {
    gameBoardArr.fill(9);
  }

  const isFull = function () {
    gameBoardArr.forEach((ele) => {
      if (ele === null) return false;
      return true;
    })
  }

  return {
    chooseSquare, getGameBoarderArr, checkWin, isAvailable, nextRound,
    gameStop, isFull
  }
}

const game = function (playerX, playerO) {
  let gameBoardObj;
  let activePlayer = playerX;
  playerXImg.src = `./assets/images/${playerX.getPlayerImg()}.webp`;
  playerOiImg.src = `./assets/images/${playerO.getPlayerImg()}.webp`;
  firstUserName.textContent = playerX.getName() + ":  " + playerX.getSymbol().toUpperCase();
  secondUserName.textContent = playerO.getName()+ ":  " + playerO.getSymbol().toUpperCase();
  gameBoardObj = gameBoard();
  playRound();

  nextRoundBtn.addEventListener("click", () => {
    gameBoardObj.nextRound();
  })

  newGameBtn.addEventListener("click", () => {
    reset();
  })


  function switchUser() {
    activePlayer = activePlayer === playerX ? playerO : playerX;
  }

  function playRound() {
    gameBoardInDom.addEventListener("click", (e) => {
      let index = Number(e.target.dataset.id);

      if (gameBoardObj.isAvailable(index) === false) {
        console.log("Cell does not available");
      } else {
        e.target.style.backgroundImage = `url('./assets/images/${activePlayer.getSymbol()}.png')`;

        gameBoardObj.chooseSquare(activePlayer.getSymbol(), index);

        // Start check if we have a winner
        if (gameBoardObj.checkWin(gameBoardObj.getGameBoarderArr(),
          activePlayer.getSymbol(), index)) {
          activePlayer.increaseScore();
          gameBoardObj.gameStop();
          document.querySelector("#player-" + activePlayer.getSymbol()).textContent =
            activePlayer.getScore();
        }
        if (gameBoardObj.isFull === true &&
          !gameBoardObj.checkWin(gameBoardObj.getGameBoarderArr(),
            activePlayer.getSymbol(), index)) {
          console.log("The game is a tie!");
        }
        switchUser();
      }
    })

  }

  function reset() {
    playerX.resetScore();
    playerO.resetScore();
    playerXScore.textContent = 0;
    playerOScore.textContent = 0;
    gameBoardObj.nextRound();
  }


}

/* Dialog Control and create new users */
const gameControl = (function () {
  const dialogElem = document.getElementById("dialog");
  const showDialog = document.querySelector(".show");
  const formSubmit = document.querySelector("#confirm-btn");
  const cancelProcess = document.querySelector("#cancel");
  const form = document.getElementById("add-new-users-form");


  showDialog.addEventListener("click", () => {
    dialogElem.showModal();
    window.scrollTo(0, 0);
    form.reset();
  });


  formSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    const username_1 = document.getElementById('username-1').value;
    const playerName_1 = document.getElementById('player-1-img').value.toLowerCase();
    const symbol_1 = document.querySelector('input[name="user-symbol"]:checked').value;

    const username_2 = document.getElementById('username-2').value;
    const playerName_2 = document.getElementById('player-2-img').value.toLowerCase();
    const symbol_2 = symbol_1 == "x" ? "o":"x";

    const playerX = player(username_1, symbol_1, playerName_1);
    const playerO = player(username_2, symbol_2, playerName_2);

    dialogElem.close();
    game(playerX, playerO);
    window.scrollTo(0, 0);
    showDialog.style.visibility = "hidden";

  })

  //change Enter key on Keyboard behavior 
  const formInputs = document.querySelectorAll("#add-new-users-form input");

  formInputs.forEach((input, index) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        let next = formInputs[index + 1];
        if (next) {
          next.focus();
        } else {
          form.submit();
        }
      }
    });
  });
})();
