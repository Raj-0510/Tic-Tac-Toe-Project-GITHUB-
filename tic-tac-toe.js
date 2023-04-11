const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const gamewin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
// let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameInfo.innerText = "Current Player-X";

    gameGrid = ["", "", "", "", "", "", "", "", ""]
    newGameBtn.classList.remove("active");
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initialise box with css properties again
        box.classList = `box box${index + 1}`;
        box.classList.remove("win")
    }
   )
}
function swapTurn(index) {
    if (currentPlayer == "X") {
        currentPlayer = "O";
        boxes[index].innerText = "X";
    }
    else {
        currentPlayer = "X";
        boxes[index].innerText = "O";
    }
    // Updating UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}
initGame();
function handleClick(index) {
    gameGrid[index] = currentPlayer
    boxes[index].style.pointerEvents = "none";
    // Swap turn
    swapTurn(index);
    //check if someone won
    checkGameOver();
};

function checkGameOver() {
    let answer = ""
    gamewin.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value to win game
        if ((gameGrid[position[0]] != "" && gameGrid[position[1]] != "" && gameGrid[position[2]] != "") &&
            gameGrid[position[0]] == gameGrid[position[1]] & gameGrid[position[1]] == gameGrid[position[2]]) {
            newGameBtn.innerText = "New game"
            newGameBtn.classList.add("active");
            // boxes[gameGrid[position[0]]].classList.add(".win");

            gameInfo.innerText = `Winner-${gameGrid[position[0]]}`;
            answer = `${gameGrid[position[0]]}`
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            boxes.forEach((box, index) => {
                //To disable pointer events
                boxes[index].style.pointerEvents = "none";
            })

        }
        console.log("return")


    })
    //it means we have a winner
    if (answer !== "") {

        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillCount++;
    })
    if (fillCount == 9) {
        gameInfo.innerText = "Draw";
        newGameBtn.classList.add("active");


    }
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {

        handleClick(index);
    })
}
);
newGameBtn.addEventListener("click", () => {
    initGame()
})