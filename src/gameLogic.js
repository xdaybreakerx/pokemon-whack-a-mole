// DOM Search
let startGameButton = document.getElementById("startGameButton");
let stopGameButton = document.getElementById("stopGameButton");

let scoreDisplayText = document.getElementById("currentGameScore");
let highscoreDisplayText = document.getElementById("highScoreDisplay");

let timerDisplayText = document.getElementById("currentTimeRemaining");

let gameRunningInfoContainer = document.getElementById("gameRunningInfo");
let gamePlayContainer = document.getElementById("gameplayArea");

// Variable declaration
let gameTimeRemaining = 0;
let defaultGameDuration = 120;
let gameCountdownInterval = null;
let currentGameScore = 0;
let highestGameScore = 0;

// function hoisting 
// these are all called as soon as page loads
toggleGameControlButtons();
toggleGameplayContent();
updateHighScore();

// event listeners
startGameButton.addEventListener("click", () => {
    startGame(3);
});
stopGameButton.addEventListener("click", () => {
    stopGame();
});

function gameTimeStep() {
    // update score displayed
    scoreDisplayText.innerText = "Score: " + currentGameScore;

    // update time remaining displayed
    timerDisplayText.innerText = "Time Remaining: " + gameTimeRemaining;

    // update the highscore based on score ASAP
    updateHighScore()
}

function toggleGameplayContent() {
    // toggle the score, timer text, and game area elements
    if (gameTimeRemaining > 0) {
        gameRunningInfoContainer.style.display = "inherit";
        gamePlayContainer.style.display = "inherit";
    } else {
        gameRunningInfoContainer.style.display = "none";
        gamePlayContainer.style.display = "none";
    }
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


function startGame(desiredGameTime = defaultGameDuration) {
    gameTimeRemaining = desiredGameTime;
    console.log("Started the game. Game time remaining is now: " + gameTimeRemaining)

    // toggle game controls
    toggleGameControlButtons();

    // toggle gameplay content 
    toggleGameplayContent()

    gameCountdownInterval = setInterval(() => {
        gameTimeRemaining -= 1;
        console.log("Game time remaining is counting down, it is now... " + gameTimeRemaining);

        if (gameTimeRemaining <= 0) {
            // if game has no time remaining, stop subtracting from it
            console.log("Game has finished");

            stopGame()
        }
    }, 1000); // one second

    gameUpdateInterval = setInterval(gameTimeStep, 100);
}


function stopGame() {
    gameTimeRemaining = 0;

    // stop all intervals
    clearInterval(gameCountdownInterval);
    clearInterval(gameUpdateInterval);
    gameTimeStep()

    // toggle game controls
    toggleGameControlButtons();

    // toggle gameplay content 
    toggleGameplayContent()

    console.log("Stopped the game. Game time remaining is now: " + gameTimeRemaining)
}

function updateHighScore() {
    // check localstorage for high score
    highestGameScore = localStorage.getItem("highScore") || 0;

    // compare highest score to current score
    if (currentGameScore > highestGameScore){
        // write to local storage
        localStorage.setItem("highScore", currentGameScore);

        // update high score text
        highestGameScore = currentGameScore;
    }
    // make sure the text is always reflecting the value
    // even if value didn't change, because HTML has placeholder value that is not valid
    highscoreDisplayText.innerText = "High Score: " + highestGameScore;
}