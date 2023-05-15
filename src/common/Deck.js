
function createDeck(workDeck) {
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['C', 'D', 'H', 'S'];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < values.length; j++) {
        workDeck.push({ code: values[j] + '-' + suits[i] });
      }
    }
    workDeck = suffleDeck(workDeck);
    workDeck = addDetailsToDeck(workDeck);
  }

  function suffleDeck(workDeck) {
    for (let i = 0; i < workDeck.length; i++) {
      let j = Math.floor(Math.random() * workDeck.length);
      let temp = workDeck[i];
      workDeck[i] = workDeck[j];
      workDeck[j] = temp;
    }
    return workDeck;
  }

  function addDetailsToDeck(workDeck) {
    for (let i = 0; i < workDeck.length; i++) {
      let result = getValue(workDeck[i].code);
      workDeck[i].faceValue = result[2];
      workDeck[i].suit = result[1];
      workDeck[i].cardValue = result[0];
    }
    return workDeck;
  }

  function getValue(card) {
    let data = card.split('-');
    let faceValue = data[0];
    let suit = data[1];
    if (isNaN(faceValue)) {
      if (faceValue === 'A') {
        return [1, suit, faceValue];
      } else if (faceValue === 'K') {
        return [13, suit, faceValue];
      } else if (faceValue === 'Q') {
        return [12, suit, faceValue];
      } else {
        return [11, suit, faceValue];
      }
    }
    return [parseInt(faceValue), suit, faceValue];
  }

export { createDeck };
