// DOM Search
let startGameButton = document.getElementById("startGameButton");
let stopGameButton = document.getElementById("stopGameButton");

let scoreDisplayText = document.getElementById("currentGameScore");
let highscoreDisplayText = document.getElementById("highScoreDisplay");

let timerDisplayText = document.getElementById("currentTimeRemaining");

// Variable declaration
let gameTimeRemaining = 0;
let defaultGameDuration = 120;
let gameCountdownInterval = null;
let currentGameScore = 0;
let highestGameScore = 0;

function gameTimeStep(){
    // update score displayed
    scoreDisplayText.innerText = "Score: " + currentGameScore;

    // update time remaining displayed
    timerDisplayText.innerText = "Time Remaining: " + gameTimeRemaining;
}

function toggleGameControlButtons() {

    // check gameTimeRemaining
    if (gameTimeRemaining > 0) {

        // game has started
        // reveal or hide startGameButton
        startGameButton.style.display = "none";
        stopGameButton.style.display = "inherit";

    } else {

        // game has finished
        // hide or reveal stopGameButton
        startGameButton.style.display = "inherit";
        stopGameButton.style.display = "none";
    }
}
toggleGameControlButtons()

function startGame(desiredGameTime = defaultGameDuration) {
    gameTimeRemaining = desiredGameTime;
    console.log("Started the game. Game time remaining is now: " + gameTimeRemaining)

    // toggle game controls
    toggleGameControlButtons();

    gameCountdownInterval = setInterval(() => {
        gameTimeRemaining -= 1;
        console.log("Game time remaining is counting down, it is now... " + gameTimeRemaining);

        if (gameTimeRemaining <= 0) {
            // if game has no time remaining, stop subtracting from it
            clearInterval(gameCountdownInterval)
            console.log("Game has finished");

            stopGame()
        }
    }, 1000); // one second

    gameUpdateInterval = setInterval(gameTimeStep, 100);
}


function stopGame() {
    gameTimeRemaining = 0;

    toggleGameControlButtons();

    console.log("Stopped the game. Game time remaining is now: " + gameTimeRemaining)
}

startGameButton.addEventListener("click", () => {
    startGame(3);
});

stopGameButton.addEventListener("click", () => {
    stopGame();
});

