import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { createDeck } from '../common/Deck';
import { redealButtonPressed } from '../common/Buttons';

const GameDetails2 = ({ gameType }) => {
  const [game, setGame] = useState([]);
  
  useEffect(() => {
    let workDeck = [];
    createDeck(workDeck);
    initializeGame(workDeck);
  }, []);

  function initializeGame(workDeck) {
    const numberOfCards = 4;
    let workGame = JSON.parse(JSON.stringify(game));
    workGame.hand = [];
    workGame.discardPile = [];
    workGame.msg = '';
    let card;
    let i = 0;
    while (i < numberOfCards) {
      card = workDeck.pop();
      workGame.hand.push(card);
      i++;
    }
    card = workDeck.pop();
    workGame.discardPile.push(card);
    workGame.remDeck = workDeck;
    setGame(workGame);
  }

  function drawCardButtonPressed() {
    let workGame = JSON.parse(JSON.stringify(game));
    let workDeck = JSON.parse(JSON.stringify(workGame.remDeck));
    if (workDeck.length < 1) {
      workGame.msg = 'Deck exhausted, game is stalemated';
    }
    let card = workDeck.pop();
    workGame.hand.push(card);
    workGame.remDeck = workDeck;
    setGame(workGame);
  }

  return (
    <div className="game-content">
        
    </div>
  );
};

export default GameDetails2;
