

const player = function (name, symbol) {
  let score = 0;
  const getName = () => name;
  const getSymbol = () => symbol;
  const increaseScore = () => score++;
  const getScore = () => score;

  return { getName, getSymbol, increaseScore, getScore }
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

  const reset = function () {
    gameBoardArr.fill(null);
  }


  return { chooseSquare, getGameBoarderArr, checkWin, isAvailable, reset }
}

const game = function () {
  let gameBoardObj;
  const playerX = player("MHD", "X");
  const playerO = player("Eyad", "O");
  let activePlayer = playerX;
  gameBoardObj = gameBoard();

  playRound();


  function switchUser() {
    activePlayer = activePlayer === playerX ? playerO : playerX;
  }


  function playRound() {
    for (let i = 0; i < 9; i++) {
      let index = Number(prompt(activePlayer.getName() + " Enter your index"));
      while (gameBoardObj.isAvailable(index) === false ||
        index > 8) {
        index = Number(prompt(activePlayer.getName() + " Enter different index"));
      }

      gameBoardObj.chooseSquare(activePlayer.getSymbol(), index);
      console.log(activePlayer.getName() + " Choose: " + activePlayer.getSymbol
        + " at index Number: " + index);
      // Start check if we have a winner
      if (i > 4 && gameBoardObj.checkWin(gameBoardObj.getGameBoarderArr(),
        activePlayer.getSymbol(), index)) {
        console.log("The winner is: " + activePlayer.getName());
        activePlayer.increaseScore();
        break;
      }
      if (!gameBoardObj.checkWin(gameBoardObj.getGameBoarderArr(),
        activePlayer.getSymbol(), index) && i === 8) {
        console.log("The game is a tie!");
      }

      switchUser();
    }
  }

}


// game();


/* Dialog Control and create new users */
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
  const playerName_1 = document.getElementById('player-1-img').value;
  const symbol_1 = "x";

  const username_2 = document.getElementById('username-2').value;
  const playerName_2 = document.getElementById('player-2-img').value;
  const symbol_2 = "x";

  // Create Players obj

  window.scrollTo(0, 0);
  dialogElem.close();
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