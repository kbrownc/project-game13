import { createDeck } from '../common/Deck';

  function redealButtonPressed(initializeGame) {
    let workDeck = [];
    createDeck(workDeck);
    let redeal = true;
    initializeGame(workDeck, redeal);
  }

  export { redealButtonPressed };
