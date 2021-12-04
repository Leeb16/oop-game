/* Project 4 - OOP Game App
    Author: Lee Bryan */

let game;
const startButton = document.getElementById('btn__reset');
const keyboard = document.querySelectorAll("div.keyrow button");

startButton.focus();

// Starts a new game when the start button is clicked

startButton.addEventListener ("click", () => {
    game = new Game();
    game.startGame();
});

// Listens for clicked letters on the screen

keyboard.forEach(key => {
    key.addEventListener('click', (e) => game.handleInteraction(e.target));
});

// Listens for typed keys

document.addEventListener ("keyup", (e) => {
    [...keyboard].forEach (key => {
        if (key.textContent === e.key) {
            game.handleInteraction (key);
        }
    });
});