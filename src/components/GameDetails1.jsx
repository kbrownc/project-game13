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
    workGame.ace1 = [];
    workGame.ace2 = [];
    workGame.ace3 = [];
    workGame.ace4 = [];
    workGame.discard = [];
    workGame.msg = '*************Start Game*************';
    let card;
    let i = 0;
    while (i < 1) {
      card = workDeck.pop();
      workGame.pile1.push(card);
      workGame.pile1[i].faceDown = false;
      i++;
    }
    i = 0;
    while (i < 2) {
      card = workDeck.pop();
      workGame.pile2.push(card);
      if (i < 1) {
        workGame.pile2[i].faceDown = true;
      } else {
        workGame.pile2[i].faceDown = false;
      }
      i++;
    }
    i = 0;
    while (i < 3) {
      card = workDeck.pop();
      workGame.pile3.push(card);
      if (i < 2) {
        workGame.pile3[i].faceDown = true;
      } else {
        workGame.pile3[i].faceDown = false;
      }
      i++;
    }
    i = 0;
    while (i < 4) {
      card = workDeck.pop();
      workGame.pile4.push(card);
      if (i < 3) {
        workGame.pile4[i].faceDown = true;
      } else {
        workGame.pile4[i].faceDown = false;
      }
      i++;
    }
    i = 0;
    while (i < 5) {
      card = workDeck.pop();
      workGame.pile5.push(card);
      if (i < 4) {
        workGame.pile5[i].faceDown = true;
      } else {
        workGame.pile5[i].faceDown = false;
      }
      i++;
    }
    i = 0;
    while (i < 6) {
      card = workDeck.pop();
      workGame.pile6.push(card);
      if (i < 5) {
        workGame.pile6[i].faceDown = true;
      } else {
        workGame.pile6[i].faceDown = false;
      }
      i++;
    }
    i = 0;
    while (i < 7) {
      card = workDeck.pop();
      workGame.pile7.push(card);
      if (i < 6) {
        workGame.pile7[i].faceDown = true;
      } else {
        workGame.pile7[i].faceDown = false;
      }
      i++;
    }
    workGame.remDeck = workDeck;
    setGame(workGame);
  }

  function drawCardButtonPressed() {
    const numberOfCards = 3;
    let card;
    let workGame = structuredClone(game);
    let workDeck = JSON.parse(JSON.stringify(game.remDeck));
    if (workDeck.length < 1) {
      workDeck = workGame.discard;
    }
    let i = 0;
    while (i < numberOfCards && workDeck.length > 0) {
      card = workDeck.pop();
      workGame.discard.push(card);
      i++;
    }
    if (workDeck.length < 2) {
      workGame.msg = 'Deck exhausted';
    }
    workGame.remDeck = workDeck;
    setGame(workGame);
  }

  const moveCard = (source, target, sourceIndex, workGame) => {
    let add = workGame[source].slice(sourceIndex, sourceIndex + 1);
    workGame[source].splice(sourceIndex, 1);
    workGame[target].splice(workGame[target].length, 0, ...add);
  };

  // move a pile
  // const movePile = (source, target, changedHandPC, cardsMoved, changedHandPCround) => {
  //   let workMessage = '';
  //   if (target.length > 0 && source.length > 0) {
  //     cardsMoved = checkForMovePile(source, target, 0, cardsMoved, changedHandPCround);
  //     if (cardsMoved) {
  //       moveCard(changedHandPC, source, 0, changedHandPCround);
  //       // NEW: move to handle addition of card to empty pile... and if it can be built on
  //       let cardsMoved = false;
  //       for (let i = 0; i < changedHandPC.length; i++) {
  //         if (changedHandPC.length === 0) break;
  //         [i, cardsMoved] = checkForMove(changedHandPC, source, i, cardsMoved, changedHandPCround);
  //         if (cardsMoved) {
  //           i = -1;
  //           cardsMoved = false;
  //         }
  //       }
  //       cardsMoved = true;
  //       // NEW END
  //       workMessage = endOfGameCheck(changedHandPC);
  //     }
  //   }
  //   return [workMessage, cardsMoved];
  // };

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
    let workGame = structuredClone(game);
    // Source/Target Logic - remove card
    moveCard(
      source.droppableId.toLowerCase(),
      destination.droppableId.toLowerCase(),
      workGame[source.droppableId.toLowerCase()].length - 1,
      workGame
    );

    // update state
    setGame(workGame);
  };

  if (game.discard === undefined) return;

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

        <div className="game-body game-card-aces">
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

        <Droppable droppableId="DISCARD" direction="horizontal">
          {provided => (
            <div className="game-body" ref={provided.innerRef} {...provided.droppableProps}>
              <div className="game-body">
                <div onClick={drawCardButtonPressed}>
                  <img src={require('../cards-other/BACK.png')} alt="" className="game-card" />
                </div>
                {game.discard
                  .filter((item, index, discard) => index === discard.length - 1)
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

        <div className="game-body">
          <Droppable droppableId="PILE1" direction="horizontal">
            {provided => (
              <div className="game-body" ref={provided.innerRef} {...provided.droppableProps}>
                <div>{game.pile1.filter((item, index, pile1) => item.faceDown).length}</div>
                <div className="game-body-col">
                  {game.pile1
                    .filter((item, index, pile1) => !item.faceDown)
                    .filter((item, index, pile1) => index === 0 || index === pile1.length - 1)
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
                <div>{game.pile2.filter((item, index, pile2) => item.faceDown).length}</div>
                <div className="game-body-col">
                  {game.pile2
                    .filter((item, index, pile2) => !item.faceDown)
                    .filter((item, index, pile2) => index === 0 || index === pile2.length - 1)
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
                <div>{game.pile3.filter((item, index, pile3) => item.faceDown).length}</div>
                <div className="game-body-col">
                  {game.pile3
                    .filter((item, index, pile3) => !item.faceDown)
                    .filter((item, index, pile3) => index === 0 || index === pile3.length - 1)
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
                <div>{game.pile4.filter((item, index, pile4) => item.faceDown).length}</div>
                <div className="game-body-col">
                  {game.pile4
                    .filter((item, index, pile4) => !item.faceDown)
                    .filter((item, index, pile4) => index === 0 || index === pile4.length - 1)
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
                <div>{game.pile5.filter((item, index, pile5) => item.faceDown).length}</div>
                <div className="game-body-col">
                  {game.pile5
                    .filter((item, index, pile5) => !item.faceDown)
                    .filter((item, index, pile5) => index === 0 || index === pile5.length - 1)
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
                <div>{game.pile6.filter((item, index, pile6) => item.faceDown).length}</div>
                <div className="game-body-col">
                  {game.pile6
                    .filter((item, index, pile6) => !item.faceDown)
                    .filter((item, index, pile6) => index === 0 || index === pile6.length - 1)
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
                <div>{game.pile7.filter((item, index, pile7) => item.faceDown).length}</div>
                <div className="game-body-col">
                  {game.pile7
                    .filter((item, index, pile7) => !item.faceDown)
                    .filter((item, index, pile7) => index === 0 || index === pile7.length - 1)
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
      </DragDropContext>
    </div>
  );
};

export default GameDetails1;
