/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

//Setting up the Phrase class. Phrases can only be letters and spaces.
class Phrase { //creates phrase class
  constructor(phrase) {
    this.phrase = phrase.toLowerCase(); //creates phrase property that converts input to lowercase
  }
  //adds letter placeholders to the display when the game starts.
  addPhraseToDisplay() {
    //Targets the phrase
    const phraseElement = document.querySelector('#phrase ul');
    const splitPhrase = this.phrase.split('');
    splitPhrase.forEach(character => {
      const liElementChar = document.createElement('li');
      liElementChar.innerHTML = (`${character}`);
      phraseElement.append(liElementChar);
      liElementChar.classList.add('hide');
      if (character === ' ') {
        liElementChar.classList.add('space');
      } else {
        liElementChar.classList.add('letter');
      }
    });
  }
  //Checks to see if the letter selected by the player matches a letter in the phrase
  checkLetter(letter) {
    console.log(this.phrase);
    if (this.phrase.includes(letter)) {
      return true;
    } else {
      return false;
    }
  }
  //reveals the letter(s) on the board that matches the player's selection.
  showMatchedLetter(letter) {
    const liElement = document.getElementsByClassName('letter');
    for (let i = 0; i < liElement.length; i++) {
      if (liElement[i].innerHTML === letter) {
        liElement[i].className = 'letter show';
        console.log('Success'); //track if letter is matched in the console

      } else {
        console.log('Fail'); //track if letter is not matched in the console
      }
    }
  }

}
