// DOM Search
let startGameButton = document.getElementById("startGameButton")
let stopGameButton = document.getElementById("stopGameButton")

// Variable declaration
let gameTimeRemaining = 0;
let defaultGameDuration = 120;
let gameCountdownInterval = null;

function startGame(desiredGameTime = defaultGameDuration) {
    gameTimeRemaining = desiredGameTime;
    console.log("Started the game. Game time remaining is now: " + gameTimeRemaining)

    gameCountdownInterval = setInterval(() => {
        gameTimeRemaining -= 1;
        console.log("Game time remaining is counting down, it is now... " + gameTimeRemaining);

        if (gameTimeRemaining <= 0) {
            // if game has no time remaining, stop subtracting from it
            clearInterval(gameCountdownInterval)
        }
    }, 1000); // one second
}

startGameButton.addEventListener("click", () => {
    startGame();
});

function stopGame() {
    gameTimeRemaining = 0;
    console.log("Stopped the game. Game time remainign is now: " + gameTimeRemaining)
}

stopGameButton.addEventListener("click", () => {
    stopGame();
});

