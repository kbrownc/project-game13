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
    workGame.discard2 = [];
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
    let add = workGame[source].slice(sourceIndex, sourceIndex + 1);
    workGame[source].splice(sourceIndex, 1);
    workGame[target].splice(workGame[target].length, 0, ...add);
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

    if (
      source.droppableId.includes('ROW')
    ) {
      moveCards(
        source.droppableId.toLowerCase(),
        destination.droppableId.toLowerCase(),
        source.index,
        workGame
      )
    } else  if (source.droppableId === 'DISCARD'){
      moveCards(
        source.droppableId.toLowerCase(),
        destination.droppableId.toLowerCase(),
        workGame[source.droppableId.toLowerCase()].length - 1,
        workGame
      )
    } else {
      // invalid move (no move of cards)
      workGame.msg = 'Invalid move';
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
          <Droppable droppableId="DISCARD2" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="game-body game-discard2"
                style={{
                  position: 'absolute',
                  top: 10,
                  left: `calc(8 * ${cardOffset})`,
                  backgroundColor: snapshot.isDraggingOver ? 'blue' : 'green',
                }}
              >
                {game.discard2
                  .filter((item, index, discard2) => index === discard2.length - 1)
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
                <div style={{ position: 'absolute', top: 15, left: `calc(1 * ${cardOffset})` }}>
                  Place cards here
                </div>
              </div>
            )}
          </Droppable>
        </div>

        <div className="game-body-column game-relative">
          <div className="game-body">
            <Droppable droppableId="ROW1" direction="horizontal">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="game-body">
                  {game.row1.map((item, index) => (
                    <Draggable draggableId={item.code} index={index} key={item.code}>
                      {provided => (
                        <div
                          style={{
                            position: 'absolute',
                            top: 5,
                            left: `calc(${index + 4} * ${cardOffset})`,
                          }}
                        >
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
              )}
            </Droppable>
          </div>
        </div>

        <div className="game-body-column game-relative">
          <div className="game-body">
            <Droppable droppableId="ROW2" direction="horizontal">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="game-body">
                  {game.row2.map((item, index) => (
                    <Draggable draggableId={item.code} index={index} key={item.code}>
                      {provided => (
                        <div
                          style={{
                            position: 'absolute',
                            top: 20,
                            left: `calc(${index + 3.5} * ${cardOffset})`,
                          }}
                        >
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
              )}
            </Droppable>
          </div>
        </div>

        <div className="game-body-column game-relative">
          <div className="game-body">
            <Droppable droppableId="ROW3" direction="horizontal">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="game-body">
                  {game.row3.map((item, index) => (
                    <Draggable draggableId={item.code} index={index} key={item.code}>
                      {provided => (
                        <div
                          style={{
                            position: 'absolute',
                            top: 35,
                            left: `calc(${index + 3} * ${cardOffset})`,
                          }}
                        >
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
              )}
            </Droppable>
          </div>
        </div>

        <div className="game-body-column game-relative">
          <div className="game-body">
            <Droppable droppableId="ROW4" direction="horizontal">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="game-body">
                  {game.row4.map((item, index) => (
                    <Draggable draggableId={item.code} index={index} key={item.code}>
                      {provided => (
                        <div
                          style={{
                            position: 'absolute',
                            top: 50,
                            left: `calc(${index + 2.5} * ${cardOffset})`,
                          }}
                        >
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
              )}
            </Droppable>
          </div>
        </div>

        <div className="game-body-column game-relative">
          <div className="game-body">
            <Droppable droppableId="ROW5" direction="horizontal">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="game-body">
                  {game.row5.map((item, index) => (
                    <Draggable draggableId={item.code} index={index} key={item.code}>
                      {provided => (
                        <div
                          style={{
                            position: 'absolute',
                            top: 65,
                            left: `calc(${index + 2} * ${cardOffset})`,
                          }}
                        >
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
              )}
            </Droppable>
          </div>
        </div>

        <div className="game-body-column game-relative">
          <div className="game-body">
            <Droppable droppableId="ROW6" direction="horizontal">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="game-body">
                  {game.row6.map((item, index) => (
                    <Draggable draggableId={item.code} index={index} key={item.code}>
                      {provided => (
                        <div
                          style={{
                            position: 'absolute',
                            top: 80,
                            left: `calc(${index + 1.5} * ${cardOffset})`,
                          }}
                        >
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
              )}
            </Droppable>
          </div>
        </div>

        <div className="game-body-column game-relative">
          <div className="game-body">
            <Droppable droppableId="ROW7" direction="horizontal">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="game-body">
                  {game.row7.map((item, index) => (
                    <Draggable draggableId={item.code} index={index} key={item.code}>
                      {provided => (
                        <div
                          style={{
                            position: 'absolute',
                            top: 95,
                            left: `calc(${index + 1} * ${cardOffset})`,
                          }}
                        >
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
              )}
            </Droppable>
          </div>
        </div>

        <div className="game-body-column game-relative">
          <Droppable droppableId="DISCARD" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="game-body game-discard"
                style={{
                  position: 'absolute',
                  top: 200,
                  left: `calc(1 * ${cardOffset})`,
                  backgroundColor: snapshot.isDraggingOver ? 'blue' : 'white',
                }}
              >
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
                <div style={{ position: 'absolute', top: 0, left: `calc(2.2 * ${cardOffset})` }}>
                  Cards left: {game.remDeck.length}
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
