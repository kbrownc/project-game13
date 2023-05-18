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
    workGame.ace1 = [{cardValue: 9, code: "9-S", faceValue: "9", suit: "S"}];
    workGame.ace2 = [];
    workGame.ace3 = [];
    workGame.ace4 = [];
    workGame.discardPile = [];
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
    console.log(game)
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
    //let workGame = JSON.parse(JSON.stringify(game));
    let workGame = structuredClone(game);
    // Source Logic - remove card
    if (source.droppableId === 'PILE1') {
      add = workGame.pile1.slice(source.index, source.index + 1);
      workGame.pile1.splice(source.index, 1);
    } else if (source.droppableId === 'PILE2') {
      add = workGame.pile2.slice(workGame.pile2.length - 1);
      workGame.pile2.splice(workGame.pile2.length - 1, 1);
    } else if (source.droppableId === 'PILE3') {
      add = workGame.pile3.slice(workGame.pile3.length - 1);
      workGame.pile3.splice(workGame.pile3.length - 1, 1);
    } else if (source.droppableId === 'PILE4') {
      add = workGame.pile4.slice(workGame.pile4.length - 1);
      workGame.pile4.splice(workGame.pile4.length - 1, 1);
    } else if (source.droppableId === 'PILE5') {
      add = workGame.pile5.slice(workGame.pile5.length - 1);
      workGame.pile5.splice(workGame.pile5.length - 1, 1);
    } else if (source.droppableId === 'PILE6') {
      add = workGame.pile6.slice(workGame.pile6.length - 1);
      workGame.pile6.splice(workGame.pile6.length - 1, 1);
    } else if (source.droppableId === 'PILE7') {
      add = workGame.pile7.slice(workGame.pile7.length - 1);
      workGame.pile7.splice(workGame.pile7.length - 1, 1);
    } else if (source.droppableId === 'DISCARD') {
      add = workGame.discardPile.slice(workGame.discardPile.length - 1);
      workGame.discardPile.splice(workGame.discardPile.length - 1, 1);
    } else if (source.droppableId === 'ACE1') {
      add = workGame.ace1.slice(workGame.ace1.length - 1);
      workGame.ace1.splice(workGame.ace1.length - 1, 1);
    } else if (source.droppableId === 'ACE2') {
      add = workGame.ace2.slice(workGame.ace2.length - 1);
      workGame.ace2.splice(workGame.ace2.length - 1, 1);
    } else if (source.droppableId === 'ACE3') {
      add = workGame.ace3.slice(workGame.ace3.length - 1);
      workGame.ace3.splice(workGame.ace3.length - 1, 1);
    } else if (source.droppableId === 'ACE4') {
      add = workGame.ace4.slice(workGame.ace4.length - 1);
      workGame.ace4.splice(workGame.ace4.length - 1, 1);
    }
    // Destination Logic
    if (destination.droppableId === 'PILE1') {
      workGame.pile1.splice(destination.index, 0, ...add);
    } else if (destination.droppableId === 'PILE2') {
      workGame.pile2.splice(workGame.pile2.length, 0, ...add);
    } else if (destination.droppableId === 'PILE3') {
      workGame.pile3.splice(workGame.pile3.length, 0, ...add);
    } else if (destination.droppableId === 'PILE4') {
      workGame.pile4.splice(workGame.pile4.length, 0, ...add);
    } else if (destination.droppableId === 'PILE5') {
      workGame.pile5.splice(workGame.pile5.length, 0, ...add);
    } else if (destination.droppableId === 'PILE6') {
      workGame.pile6.splice(workGame.pile6.length, 0, ...add);
    } else if (destination.droppableId === 'PILE7') {
      workGame.pile7.splice(workGame.pile7.length, 0, ...add);
    } else if (destination.droppableId === 'DISCARD') {
      workGame.discardPile.splice(workGame.discardPile.length, 0, ...add);
    } else if (destination.droppableId === 'ACE1') {
      workGame.ace1.splice(workGame.ace1.length, 0, ...add);
    } else if (destination.droppableId === 'ACE2') {
      workGame.ace2.splice(workGame.ace2.length, 0, ...add);
    } else if (destination.droppableId === 'ACE3') {
      workGame.ace3.splice(workGame.ace3.length, 0, ...add);
    } else if (destination.droppableId === 'ACE4') {
      workGame.ace4.splice(workGame.ace4.length, 0, ...add);
    }
    // update state
    setGame(workGame);
  };

  if (game.discardPile === undefined) return;
  return (
    <div className="game-content">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="game-header1">
          <span>** Game 1 - Solataire **</span>
        </div>
        <div className="game-header2">
          <button className="game-startButton" onClick={() => redealButtonPressed(initializeGame)}>
            Redeal
          </button>
        </div>
        <div className="game-msg">{game.msg}</div>

        <div className="game-body">
          <Droppable droppableId="ACE1" direction="horizontal">
            {provided => (
              <div className="game-body" ref={provided.innerRef} {...provided.droppableProps}>
                <div className="game-body">
                  {game.ace1
                    .filter((item, index, ace1) => index === ace1.length - 1)
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

          <Droppable droppableId="ACE2" direction="horizontal">
            {provided => (
              <div className="game-body" ref={provided.innerRef} {...provided.droppableProps}>
                <div className="game-body">
                  {game.ace2
                    .filter((item, index, ace2) => index === ace2.length - 1)
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

          <Droppable droppableId="ACE3" direction="horizontal">
            {provided => (
              <div className="game-body" ref={provided.innerRef} {...provided.droppableProps}>
                <div className="game-body">
                  {game.ace3
                    .filter((item, index, ace3) => index === ace3.length - 1)
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

          <Droppable droppableId="ACE4" direction="horizontal">
            {provided => (
              <div className="game-body" ref={provided.innerRef} {...provided.droppableProps}>
                <div className="game-body">
                  {game.ace4
                    .filter((item, index, ace4) => index === ace4.length - 1)
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
        </div>

        <div className="game-body">
          <Droppable droppableId="PILE1" direction="horizontal">
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
              </div>
            )}
          </Droppable>

          <Droppable droppableId="PILE2" direction="horizontal">
            {provided => (
              <div className="game-body" ref={provided.innerRef} {...provided.droppableProps}>
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
              </div>
            )}
          </Droppable>

          <Droppable droppableId="PILE3" direction="horizontal">
            {provided => (
              <div className="game-body" ref={provided.innerRef} {...provided.droppableProps}>
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
              </div>
            )}
          </Droppable>

          <Droppable droppableId="PILE4" direction="horizontal">
            {provided => (
              <div className="game-body" ref={provided.innerRef} {...provided.droppableProps}>
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
              </div>
            )}
          </Droppable>

          <Droppable droppableId="PILE5" direction="horizontal">
            {provided => (
              <div className="game-body" ref={provided.innerRef} {...provided.droppableProps}>
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
              </div>
            )}
          </Droppable>

          <Droppable droppableId="PILE6" direction="horizontal">
            {provided => (
              <div className="game-body" ref={provided.innerRef} {...provided.droppableProps}>
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
              </div>
            )}
          </Droppable>

          <Droppable droppableId="PILE7" direction="horizontal">
            {provided => (
              <div className="game-body" ref={provided.innerRef} {...provided.droppableProps}>
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
        </div>

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
