import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { createDeck } from '../common/Deck';
import { redealButtonPressed } from '../common/Buttons';

const GameDetails1 = ({ gameType }) => {
  const [game, setGame] = useState([]);
  
  useEffect(() => {
    let workDeck = [];
    createDeck(workDeck);
    initializeGame(workDeck);
  }, []);

  function initializeGame(workDeck) {
    let workGame = JSON.parse(JSON.stringify(game));
    workGame.pile1 = [];
    workGame.pile2 = [];
    workGame.pile3 = [];
    workGame.pile4 = [];
    workGame.pile5 = [];
    workGame.pile6 = [];
    workGame.pile7 = [];
    workGame.aceSpades = [];
    workGame.aceHearts = [];
    workGame.aceDiamonds = [];
    workGame.aceClubs = [];
    workGame.discardPile = [];
    workGame.msg = 'Start Game';
    let card;
    let i = 0;
    while (i < 1) {
      card = workDeck.pop();
      workGame.pile1.push(card);
      i++;
    }
    i = 0;
    while (i < 2) {
      card = workDeck.pop();
      workGame.pile2.push(card);
      i++;
    }
    i = 0;
    while (i < 3) {
      card = workDeck.pop();
      workGame.pile3.push(card);
      i++;
    }
    i = 0;
    while (i < 4) {
      card = workDeck.pop();
      workGame.pile4.push(card);
      i++;
    }
    i = 0;
    while (i < 5) {
      card = workDeck.pop();
      workGame.pile5.push(card);
      i++;
    }
    i = 0;
    while (i < 6) {
      card = workDeck.pop();
      workGame.pile6.push(card);
      i++;
    }
    i = 0;
    while (i < 7) {
      card = workDeck.pop();
      workGame.pile7.push(card);
      i++;
    }
    workGame.remDeck = workDeck;
    setGame(workGame);
  }

  function drawCardButtonPressed() {
    const numberOfCards = 3;
    let card;
    let workGame = JSON.parse(JSON.stringify(game));
    let workDeck = JSON.parse(JSON.stringify(workGame.remDeck));
    let i = 0;
    while (i < numberOfCards && workDeck.length > 0) {
      card = workDeck.pop();
      workGame.discardPile.push(card);
      i++;
    }
    if (workDeck.length < 1) return;
    if (workDeck.length < 2) {
      workGame.msg = 'Deck exhausted';
    }
    workGame.remDeck = workDeck;
    setGame(workGame);
  }

  const onDragEnd = result => {
    if (!result.destination) return;
    // store where the card was initially and where it was dropped
    const { destination, source } = result;
    // make sure there is a change (moved item outside of draggable context area)
    if (!destination || !source) {
      return;
    }
    // make sure there is a change (moved item & returned it to same place)
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // moving cards within and between your hand and the DISCARD pile 
    // (NOTE: only allowed for the player whose turn it is)
    let add;
    let workGame = JSON.parse(JSON.stringify(game));
    
      // Source Logic - remove card
      if (source.droppableId === 'HAND') {
        add = workGame.hand.slice(source.index, source.index + 1);
        workGame.hand.splice(source.index, 1);
      } else if (source.droppableId === 'DISCARD') {
        add = workGame.discardPile.slice(workGame.discardPile.length - 1);
        workGame.discardPile.splice(workGame.discardPile.length - 1, 1);
      }

      // Destination Logic
      if (destination.droppableId === 'HAND') {
        workGame.hand.splice(destination.index, 0, ...add);
      } else if (destination.droppableId === 'DISCARD') {
        workGame.discardPile.splice(workGame.discardPile.length, 0, ...add);
      }
  

    // update state
    setGame(workGame);
  };

  if (game.discardPile === undefined ) return
  return (
    <div className="game-content">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="game-header1">
          <span>** Game 1 - Gin Rummy **</span>
        </div>
        <div className="game-header2">
          <button className="game-startButton" onClick={() => redealButtonPressed(initializeGame)}>
            Redeal
          </button>
        </div>
          <div className="game-msg">{game.msg}</div>
        
          <Droppable droppableId="HAND2" direction="horizontal">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div className="game-body">
                  
                  {game.pile1.map((item, index) => (
                    <Draggable draggableId={item.code} index={index} key={item.code}>
                      {provided => (
                        <img
                          className="game-card"
                          src={require(`../cards/${item.code}.png`)}
                          alt=""
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        

        <Droppable droppableId="DISCARD" direction="horizontal">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div className="game-body-discard">
              <span>Click =></span>
                
                   <div onClick={drawCardButtonPressed}>
                      <img src={require('../cards-other/BACK.png')} alt="" className="game-card" /> 
                    </div> 
                        
                {game.discardPile
                  .filter((item, index, discardPile) => index === discardPile.length - 1)
                  .map((item, index) => (
                    <Draggable draggableId={item.code} index={index} key={item.code}>
                      {provided => (
                        <img
                          className="game-card"
                          src={require(`../cards/${item.code}.png`)}
                          alt=""
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>

        <Droppable droppableId="HAND" direction="horizontal">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div className="game-body">
                {game.pile2.map((item, index) => (
                  <Draggable draggableId={item.code} index={index} key={item.code}>
                    {provided => (
                      <img
                        className="game-card"
                        src={require(`../cards/${item.code}.png`)}
                        alt=""
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default GameDetails1;
