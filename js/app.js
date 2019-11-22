/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;
//Create new game object and click event listeners
document.getElementById('btn__reset').addEventListener('click', () => {
  game = new Game();
  game.startGame();
});

const keys = document.querySelectorAll('.key');
keys.forEach(key => {
  key.addEventListener('click', (e) => {
    game.handleInteraction(e.target);
  });
});
