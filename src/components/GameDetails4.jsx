import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { createDeck } from '../common/Deck';
import { redealButtonPressed } from '../common/Buttons';

const GameDetails4 = ({ gameType }) => {
  const [game, setGame] = useState([]);
  const cardOffset = '55px';

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

    // card = workDeck.pop();
    // workGame.ace1.push(card);
    // card = workDeck.pop();
    // workGame.ace2.push(card);
    // card = workDeck.pop();
    // workGame.ace3.push(card);
    // card = workDeck.pop();
    // workGame.ace4.push(card);

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

  const movePile = (source, target, sourceIndex, workGame) => {
    let add = workGame[source].slice(sourceIndex);
    workGame[source].splice(sourceIndex, add.length);
    workGame[target].splice(workGame[target].length, 0, ...add);
  };

  const flipTopCard = (source, workGame) => {
    // does pileN have any faceup cards (if YES stop)
    for (let i = 0; i < workGame[source].length; i++) {
      if (workGame[source][i].faceDown === false) {
        return;
      }
    }
    // does pileN have at least 1 facedowan (if YES continue)
    for (let i = 0; i < workGame[source].length; i++) {
      if (workGame[source][i].faceDown === true) {
        break;
      }
    }
    // turn last faceDown card faceup
    workGame[source]
      .filter((item, index, source) => item.faceDown)
      .map((item, index) => {
        if (index === workGame[source].length - 1) {
          item.faceDown = false;
        }
      });
  };

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

    // move 1 card or entire faceup array
    //    if needs to recognize when last card in array was moved
    //    else needs to recognize when non last card was moved

    if (source.index === 1) {
      moveCard(
        source.droppableId.toLowerCase(),
        destination.droppableId.toLowerCase(),
        workGame[source.droppableId.toLowerCase()].length - 1,
        workGame
      );
    } else {
      movePile(
        source.droppableId.toLowerCase(),
        destination.droppableId.toLowerCase(),
        workGame[source.droppableId.toLowerCase()].length - 1,
        workGame
      );
    }

    // Turn card face up if none are currently face up
    if (source.droppableId.includes('PILE')) {
      flipTopCard(source.droppableId.toLowerCase(), workGame);
    }

    // update state
    setGame(workGame);
  };

  if (game.discard === undefined) return;

  return (
    <div className="game-content">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="game-header1">
          <span>** Game 4 - Solataire TEST **</span>
        </div>

        <div className="game-body game-relative">
          <Droppable droppableId="PILE1" direction="horizontal">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                
                <div className="game-body">
                  {game.pile1
                    .filter((item, index, pile1) => !item.faceDown)
                    .filter((item, index, pile1) => index === 0 || index === pile1.length - 1)
                    .map((item, index) => (
                      <Draggable draggableId={item.code} index={index} key={item.code}>
                        {provided => (
                          <div style={{position: 'absolute', top: `calc(${index} * ${cardOffset})` }}>
                            <img
                              className="game-card"
                              src={require(`../cards/${item.code}.png`)}
                              alt=""
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                            />
                          </div>
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
                   
                    .map((item, index) => (
                      <Draggable draggableId={item.code} index={index} key={item.code}>
                        {provided => (
                          <div style={{position: 'absolute', top: `calc(${index} * ${cardOffset})` }}>
                            <img
                              className="game-card"
                              src={require(`../cards/${item.code}.png`)}
                              alt=""
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                            />
                          </div>
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
                    
                    .map((item, index) => (
                      <Draggable draggableId={item.code} index={index} key={item.code}>
                        {provided => (
                          <div style={{position: 'absolute', top: `calc(${index} * ${cardOffset})` }}>
                          <img
                            className="game-card"
                            src={require(`../cards/${item.code}.png`)}
                            alt=""
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                          />
                          </div>
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

export default GameDetails4;
