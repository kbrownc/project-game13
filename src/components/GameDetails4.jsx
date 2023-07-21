import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { createDeck } from '../common/Deck';
import { redealButtonPressed } from '../common/Buttons';

const GameDetails4 = () => {
  const [game, setGame] = useState([]);
  const cardOffset = '75px';

  useEffect(() => {
    let workDeck = [];
    createDeck(workDeck);
    initializeGame(workDeck);
  }, []);

  function initializeGame(workDeck) {
    let workGame = JSON.parse(JSON.stringify(game));
    workGame.row1 = [];
    workGame.row2 = [];
    workGame.row3 = [];
    workGame.row4 = [];
    workGame.row5 = [];
    workGame.row6 = [];
    workGame.row7 = [];
    workGame.discard = [];
    workGame.msg = 'Start Game';
    let card;

    let j = 1;
    let i;
    while (j < 8) {
      i = 0;
      while (i < j) {
        card = workDeck.pop();
        workGame['row' + j].push(card);
        i++;
      }
      j++;
    }

    workGame.remDeck = workDeck;
    setGame(workGame);
  }

  function drawCardButtonPressed() {
    let card;
    let workGame = structuredClone(game);
    let workDeck = JSON.parse(JSON.stringify(game.remDeck));
    workGame.msg = ' ';
    if (workDeck.length > 0) {
      card = workDeck.pop();
      workGame.discard.push(card);
    }
    if (workDeck.length < 1) {
      workGame.msg = 'Deck exhausted';
    }
    workGame.remDeck = workDeck;
    setGame(workGame);
  }

  const moveCards = (source, target, sourceIndex, workGame) => {
    let add = workGame[source].slice(sourceIndex);
    workGame[source].splice(sourceIndex, 1);
    workGame[target].splice(workGame[target].length, 0, ...add);
  };

  const flipTopCard = (source, workGame) => {
    // does rowN have any faceup cards (if YES stop)
    for (let i = 0; i < workGame[source].length; i++) {
      if (workGame[source][i].faceDown === false) {
        return;
      }
    }
    // does rowN have at least 1 facedowan (if YES continue)
    let found = false;
    for (let i = 0; i < workGame[source].length; i++) {
      if (workGame[source][i].faceDown === true) {
        found = true;
        break;
      }
    }
    if (!found) return;

    // turn last faceDown card faceup
    workGame[source].forEach((item, index) => {
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

    let workGame = structuredClone(game);

    // Source/Target Logic - Move card(s)

    if (workGame.row1.length > 0) {
      moveCards(
        source.droppableId.toLowerCase(),
        destination.droppableId.toLowerCase(),
        workGame[source.droppableId.toLowerCase()].length - 3,
        workGame
      );
    } else {
      // invalid move (no move of cards)
      workGame.msg = 'Invalid move';
    }

    // Turn card face up if none are currently face up
    if (source.droppableId.includes('ROW')) {
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
          <span>Triangle</span>
        </div>
        <div>
          <button className="game-startButton" onClick={() => redealButtonPressed(initializeGame)}>
            Redeal
          </button>
          <span> {game.msg}</span>
        </div>

        <div className="game-body-column game-relative">
          <div className="game-body">
            <Droppable droppableId="ROW1" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="game-body">
                    {game.row1.map((item, index) => (
                      <Draggable draggableId={item.code} index={index} key={item.code}>
                        {provided => (
                          <div style={{ position: 'absolute', left: `calc(${index + 4} * ${cardOffset})` }}>
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
        </div>

        <div className="game-body-column game-relative">
          <div className="game-body">
            <Droppable droppableId="ROW2" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="game-body">
                    {game.row2.map((item, index) => (
                      <Draggable draggableId={item.code} index={index} key={item.code}>
                        {provided => (
                          <div style={{ position: 'absolute', left: `calc(${index + 3.5} * ${cardOffset})` }}>
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
        </div>

        <div className="game-body-column game-relative">
          <div className="game-body">
            <Droppable droppableId="ROW3" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="game-body">
                    {game.row3.map((item, index) => (
                      <Draggable draggableId={item.code} index={index} key={item.code}>
                        {provided => (
                          <div style={{ position: 'absolute', left: `calc(${index + 3} * ${cardOffset})` }}>
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
        </div>

        <div className="game-body-column game-relative">
          <div className="game-body">
            <Droppable droppableId="ROW4" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="game-body">
                    {game.row4.map((item, index) => (
                      <Draggable draggableId={item.code} index={index} key={item.code}>
                        {provided => (
                          <div style={{ position: 'absolute', left: `calc(${index + 2.5} * ${cardOffset})` }}>
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
        </div>

        <div className="game-body-column game-relative">
          <div className="game-body">
            <Droppable droppableId="ROW5" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="game-body">
                    {game.row5.map((item, index) => (
                      <Draggable draggableId={item.code} index={index} key={item.code}>
                        {provided => (
                          <div style={{ position: 'absolute', left: `calc(${index + 2} * ${cardOffset})` }}>
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
        </div>

        <div className="game-body-column game-relative">
          <div className="game-body">
            <Droppable droppableId="ROW6" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="game-body">
                    {game.row6.map((item, index) => (
                      <Draggable draggableId={item.code} index={index} key={item.code}>
                        {provided => (
                          <div style={{ position: 'absolute', left: `calc(${index + 1.5} * ${cardOffset})` }}>
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
        </div>

        <div className="game-body-column game-relative">
          <div className="game-body">
            <Droppable droppableId="ROW7" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="game-body">
                    {game.row7.map((item, index) => (
                      <Draggable draggableId={item.code} index={index} key={item.code}>
                        {provided => (
                          <div style={{ position: 'absolute', left: `calc(${index + 1} * ${cardOffset})` }}>
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
        </div>

        <div>
          <Droppable droppableId="DISCARD" direction="horizontal">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div className="game-body game-discard" 
                    style={{ position: 'absolute', left: `calc(1 * ${cardOffset})` }}>
                  <div onClick={drawCardButtonPressed}>
                    {game.remDeck.length > 0 ? (
                      <img src={require('../cards-other/BACK.png')} alt="" className="game-card" />
                    ) : null}
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
        </div>
      </DragDropContext>
    </div>
  );
};

export default GameDetails4;
