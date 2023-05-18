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
    workGame.aceSpades = [{cardValue: 7, code: "7-D", faceValue: "7", suit: "D"}];
    workGame.aceHearts = [{cardValue: 7, code: "7-D", faceValue: "7", suit: "D"}];
    workGame.aceDiamonds = [{cardValue: 7, code: "7-D", faceValue: "7", suit: "D"}];
    workGame.aceClubs = [{cardValue: 7, code: "7-D", faceValue: "7", suit: "D"}];
    workGame.discardPile = [{cardValue: 7, code: "7-D", faceValue: "7", suit: "D"}];
    workGame.msg = '*************Start Game';
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
    //let workGame = JSON.parse(JSON.stringify(game));
    let workGame = structuredClone(game);
    let workDeck = JSON.parse(JSON.stringify(game.remDeck));
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

    // moving cards within and between piles and the DISCARD pile
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

  if (game.discardPile === undefined) return;
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

        <Droppable droppableId="ACEPILE" direction="horizontal">
          {provided => (
            <div className="game-body" ref={provided.innerRef} {...provided.droppableProps}>
              <div className="game-body">
                {game.aceSpades
                .filter((item, index, aceSpades) => index === aceSpades.length - 1)
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

              <div className="game-body">
                {game.aceHearts
                .filter((item, index, aceHearts) => index === aceHearts.length - 1)
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

              <div className="game-body">
                {game.aceDiamonds
                .filter((item, index, aceDiamonds) => index === aceDiamonds.length - 1)
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

              <div className="game-body">
                {game.aceClubs
                .filter((item, index, aceClubs) => index === aceClubs.length - 1)
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

        <Droppable droppableId="PILE" direction="horizontal">
          {provided => (
            <div className="game-body" ref={provided.innerRef} {...provided.droppableProps}>
              <div className="game-body">
                {game.pile1
                .filter((item, index, pile1) => index === pile1.length - 1)
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

              <div className="game-body">
                {game.pile2
                .filter((item, index, pile2) => index === pile2.length - 1)
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

              <div className="game-body">
                {game.pile3
                .filter((item, index, pile3) => index === pile3.length - 1)
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

              <div className="game-body">
                {game.pile4
                .filter((item, index, pile4) => index === pile4.length - 1)
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

              <div className="game-body">
                {game.pile5
                .filter((item, index, pile5) => index === pile5.length - 1)
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

              <div className="game-body">
                {game.pile6
                .filter((item, index, pile6) => index === pile6.length - 1)
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

              <div className="game-body">
                {game.pile7
                .filter((item, index, pile7) => index === pile7.length - 1)
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

        <Droppable droppableId="DISCARD" direction="horizontal">
          {provided => (
            <div className="game-body" ref={provided.innerRef} {...provided.droppableProps}>
              <div className="game-body">
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

      </DragDropContext>
    </div>
  );
};

export default GameDetails1;
