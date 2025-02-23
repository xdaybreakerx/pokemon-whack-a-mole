// DOM Search
let startGameButton = document.getElementById("startGameButton");
let stopGameButton = document.getElementById("stopGameButton");

let scoreDisplayText = document.getElementById("currentGameScore");
let highscoreDisplayText = document.getElementById("highScoreDisplay");

let timerDisplayText = document.getElementById("currentTimeRemaining");

let gameRunningInfoContainer = document.getElementById("gameRunningInfo");
let gamePlayContainer = document.getElementById("gameplayArea");

let spawnableAreas = document.getElementsByClassName("whackamoleSpawnArea");

// Variable declaration
let gameTimeRemaining = 0;
let defaultGameDuration = 120;
let gameCountdownInterval = null;

let currentGameScore = 0;
let highestGameScore = 0;

let spawningInterval = null;
let fastSpawningInterval = null;
let despawnerInterval = null;

// function hoisting 
// these are all called as soon as page loads
toggleGameControlButtons();
toggleGameplayContent();
updateHighScore();

Array.from(spawnableAreas).forEach(area => {
    area.addEventListener("click", (event) => {
        whackamoleHandleClick(event);
    });
});

// event listeners
startGameButton.addEventListener("click", () => {
    startGame(10);
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

async function spawnMole() {

    // handle the bug where a pokemon appears once after the game is over 
    if (gameTimeRemaining <= 0) {
        return;
    }

    // pick a random spawnable area
    let randomNumberWithinArrayRange = Math.floor(Math.random() * spawnableAreas.length);
    let chosenSpawnArea = spawnableAreas[randomNumberWithinArrayRange];

    // grab an image from PokeAPI 
    let randomPokemonNumber = Math.floor(Math.random() * 1025) + 1;
    let apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemonNumber);
    let apiData = await apiResponse.json();

    // create img with src from PokeAPI 
    // let whackamoleImage = document.createElement("img");
    // whackamoleImage.src = apiData.sprites.other.home.front_default;

    // put img into spawnable area 
    chosenSpawnArea.src = apiData.sprites.other.home.front_default;

    // chosenSpawnArea.appendChild(whackamoleImage);
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

function toggleCursor() {
    if (gameTimeRemaining > 0) {
        document.body.style.cursor = 'url(./assets/hammer.gif), auto';
    } else {
        document.body.style.cursor = '';
    }
}

function startGame(desiredGameTime = defaultGameDuration) {
    gameTimeRemaining = desiredGameTime;
    console.log("Started the game. Game time remaining is now: " + gameTimeRemaining)

    currentGameScore = 0;

    wipeImagesFromSpawningAreas();

    // toggle game controls
    toggleGameControlButtons();

    // toggle gameplay content 
    toggleGameplayContent();

    // toggle cursor 
    toggleCursor();


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

    // TO DO : Refactor for multiple spawning intervals, or find a way to make it a different duration on each repititon 
    spawningInterval = setInterval(() => {
        spawnMole();
    }, 1000)
    fastSpawningInterval = setInterval(() => {
        spawnMole();
    }, 500);
    // Randomly despawn or delete a whackamole from the game
    despawnerInterval = setInterval(() => {
        deleteRandomWhackamole();
    }, 500);
}

function stopGame() {
    gameTimeRemaining = 0;

    // stop all intervals
    clearInterval(gameCountdownInterval);
    clearInterval(gameUpdateInterval);
    clearInterval(spawningInterval);
    clearInterval(fastSpawningInterval);
    clearInterval(despawnerInterval);
    gameTimeStep();

    // toggle game controls
    toggleGameControlButtons();
    // toggle game content
    // toggleGameplayContent();
    wipeImagesFromSpawningAreas();

    // toggle the cursor
    toggleCursor();

    console.log("Stopped the game. Game time remaining is now: " + gameTimeRemaining);
}

function updateHighScore() {
    // check localstorage for high score
    highestGameScore = localStorage.getItem("highScore") || 0;

    // compare highest score to current score
    if (currentGameScore > highestGameScore) {
        // write to local storage
        localStorage.setItem("highScore", currentGameScore);

        // update high score text
        highestGameScore = currentGameScore;
    }
    // make sure the text is always reflecting the value
    // even if value didn't change, because HTML has placeholder value that is not valid
    highscoreDisplayText.innerText = "High Score: " + highestGameScore;
}

function wipeImagesFromSpawningAreas() {
    // loop through spawnableAreas
    Array.from(spawnableAreas).forEach(area => {
        // set the src property of each to ""
        area.src = "./assets/hole.png";
    });
}

function whackamoleHandleClick(event) {
    if (event.target.src != "./assets/hole.png") {
        currentGameScore++;
        event.target.src = "./assets/hole.png";
        console.log("Clicked on a mole! Score increased, it's now: " + currentGameScore);
    }
}

function deleteRandomWhackamole() {
    // pick one random spawnableArea
    let randomNumberWithinArrayRange = Math.floor(Math.random() * spawnableAreas.length);
    let chosenSpawnArea = spawnableAreas[randomNumberWithinArrayRange];

    // set its src property to hole.png
    chosenSpawnArea.src = "./assets/hole.png";
}