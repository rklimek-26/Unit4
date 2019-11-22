/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases()
    this.activePhrase = null;
  }
  createPhrases() {
    const phraseList = [{ //this is a list of the actual phrases that the Phrase object is representing
        phrase: 'Only a life lived for others is a life worthwhile'
      },
      {
        phrase: 'Expect nothing live frugally on surprise'
      },
      {
        phrase: 'Everything has beauty but not everyone sees it'
      },
      {
        phrase: 'Success is the best revenge for anything'
      },
      {
        phrase: 'Nothing will work unless you do'
      },
    ];
    return phraseList;
  }

  /*This method should select and then return a random phrase
  from the array of phrases stored in the Game class’s `phrases` property */
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  };

  //Begins game by hiding the start screen, selecting a random phrase, and displaying it to user
  startGame() {
    const overlay = document.querySelector('div #overlay').style.display = 'none';
    const phrase = new Phrase(game.getRandomPhrase().phrase);
    this.activePhrase = phrase;
    phrase.addPhraseToDisplay();
  };
  /*checks to see if the button clicked by the player matches a letter in the phrase,
  and then directs the game based on a correct or incorrect guess */
  handleInteraction(button) {
    button.disabled = true; //Disables the selected letter’s onscreen keyboard button.

    //checks wether the button clicked matches the phrase's letter
    const checkLetter = game.activePhrase.checkLetter(button.textContent);
    if (!checkLetter) {
      button.className = "wrong";
      this.removeLife();
    } else {
      button.className = "chosen";
      game.activePhrase.showMatchedLetter(button.textContent);

      if (this.checkForWin()) {
        this.gameOver(true);
      }
    }
  }
  //checks to see if the player has revealed all of the letters in the active phrase
  checkForWin() {
    const fullPhrase = document.querySelectorAll('.letter').length;
    const correctlyPickedLetters = document.querySelectorAll('.show').length;
    if (fullPhrase === correctlyPickedLetters) {
      return true
    };

  };
  //removes a life from the scoreboard, by replacing one of the liveHeart.png images with a lostHeart.png image
  removeLife() {
    document.querySelectorAll(".tries")[this.missed].
    getElementsByTagName("img")[0].src = "images/lostHeart.png";
    this.missed += 1;
    if (this.missed === 5) {
      this.gameOver(this.checkForWin());
    }
  }
  /*displays the original start screen overlay until the game is won or lost.
  Depending on the outcome, the appropriate screen will show */
  gameOver(gameWon) {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "";

    if (gameWon) {
      document.getElementById("game-over-message").innerHTML = "Congratulations! You won the game!";
      overlay.className = "win";
    } else {
      document.getElementById("game-over-message").innerHTML = "Sorry, better luck next time!";
      overlay.className = "lose";
    }
    //Remove the previous phrase
    let ul = document.getElementById("phrase").getElementsByTagName("ul")[0];

    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }

    //unlock the keys that were used last round
    let usedKeys = document.querySelectorAll('.wrong, .chosen');
    usedKeys.forEach(key => {
      key.disabled = false;
      key.className = "key";
    });

    //replenish hearts on game board (use similar language as removeLife())
    this.missed = 0;
    const tries = document.querySelectorAll(".tries");
    tries.forEach((heartImg) => {
      heartImg.getElementsByTagName("img")[0].src = "images/liveHeart.png";
    });
  }
}
