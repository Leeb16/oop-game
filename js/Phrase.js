/* Project 4 - OOP Game App
    Author: Lee Bryan */

class Phrase {
    constructor (phrase){
        this.phrase = phrase.toLowerCase();
    }

// Adds placeholders to the display when the game starts

    addPhraseToDisplay() {
        const phraseToDisplay = document.getElementById("phrase");

        Array.from(this.phrase).forEach(character => {
            const li = document.createElement("li");
            if (character === " ") {
                li.classList.add("space");
                li.textContent = " ";
            } else {
                li.classList.add ("hide", "letter", `${character.toLowerCase()}`);
                li.textContent = "?";
            }
            phraseToDisplay.appendChild (li);
        });
    }

// Checks if the letter chosen is in the phrase

    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

// Updates the display with the correctly selected letters

    showMatchedLetter(letter) {
        let matchedLetters = document.querySelectorAll(`li.${letter}`);
        matchedLetters.forEach(matchedLetter => {
            matchedLetter.textContent = `${letter}`;
            matchedLetter.classList.remove ("hide");
            matchedLetter.classList.add ("show");
        });
    }
}
