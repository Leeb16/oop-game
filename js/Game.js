/* Project 4 - OOP Game App
    Author: Lee Bryan */

const startScreen = document.querySelector('.start');

class Game {
    constructor () {
        this.missed = 0; // Used to track the number of guesses by the player
        this.phrases = [
            new Phrase ("Break a leg"),
            new Phrase ("Bite the bullet"),
            new Phrase ("Speak of the devil"),
            new Phrase ("A piece of cake"),
            new Phrase ("When pigs fly")
        ];
        this.activePhrase = null; // The Phrase object currently in play
    }

// This section hides the start screen overlay, selects and displays the phrase

    startGame () {
        startScreen.classList.remove ("win", "lose");
        startScreen.style.display = "none";
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

// Selects a random phrase from the array

    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    handleInteraction (selectedLetter) {
        // Disables the selected letter's onscreen keyboard button
        selectedLetter.disabled = true;  
        // If the phrase does not include the guessed letter the wrong class is added to the selected letter and removes a life
        if (!this.activePhrase.checkLetter(selectedLetter.textContent)) {
            selectedLetter.classList.add('wrong');
            this.removeLife();
        } 
        // If the phrase does include the guessed letter the chosen class is added to the selected letter and the guessed letter is displayed
        else { 
            selectedLetter.classList.add("chosen");
            this.activePhrase.showMatchedLetter(selectedLetter.textContent);
            // Calls gameover if the game is won
            if (this.checkForWin()) {
                this.gameOver(true);
              }
        }
    }

    // Method for removing a life. If the player guessed wrongly 5 times then gameOver() is called and ends the game

    removeLife() {
        let index = this.missed;
        let currentScoreboardItem = document.getElementsByClassName("tries");
        currentScoreboardItem[index].firstElementChild.src = "images/lostHeart.png";
        currentScoreboardItem[index].firstElementChild.alt = "Lost Heart Icon";
        this.missed += 1;

         if (this.missed === 5) {
            this.gameOver();
         }
     } 

    // Checks to see if the player has revealed all of the letters in the active phrase

    checkForWin () {
        const phraseLetters = document.querySelectorAll('#phrase .hide'); // Gets list of hidden letters
        return phraseLetters.length === 0; // If there are no hidden letters left the game is won
    }

    // Updates the overlay depending on the outcome of the game with a delay of 1 second to allow the user the read the final answer
   
    gameOver () {
        window.setTimeout (() => {
        startScreen.style.display = '';
        const h1 = document.getElementById("game-over-message");
        const gif = document.getElementById("gif");
        const startButton = document.querySelector('.start button');
    
    // If the game is won
        if (this.checkForWin()) {
            h1.textContent = "Well Done You've Won!";
            startScreen.classList.add ("win");
            gif.src = "images/win.gif";
            gif.style.display = 'inline';
    // If the game is lost
         }  else {
            h1.textContent = "Game Over!";
            startScreen.classList.add ("lose");
            gif.src = 'images/lose.gif';
            gif.style.display = 'inline';
        }

        this.resetBoard();
        this.resetGamePhrase();
        this.resetLives();
        startScreen.style.display = 'flex';
        startButton.focus();
        }, 1000);

    }

   // This method resets the keyboard buttons so they are all available to select

     resetBoard() {
        const keyboard = document.querySelectorAll('button.key');
        keyboard.forEach(key => {
            key.classList.remove('wrong');
            key.classList.remove('chosen');
            key.classList.add('key');
            key.disabled = false;
        })        
    }
    
    //This method resets the heart images to the live heart image

    resetLives() {
        const allHearts = document.querySelectorAll('li [src="images/lostHeart.png"]');
        allHearts.forEach(heart => heart.src = 'images/liveHeart.png');
        this.missed = 0;
        this.activePhrase = null;
    }
    
    // This method resets the phrase by removing all the li elements from the Phrase ul element
    
    resetGamePhrase() {
        const usedGame = document
        .getElementById("phrase")
        .getElementsByTagName("li");
    
        while (usedGame.length > 0) {
            usedGame[0].remove();
        }
    }
}
