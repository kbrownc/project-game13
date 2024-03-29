import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { createDeck } from '../common/Deck';
import { redealButtonPressed } from '../common/Buttons';

const GameDetails2 = () => {
  const [game, setGame] = useState([]);
  const cardOffset = '35px';

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
    workGame.pilea = [];
    workGame.pileb = [];
    workGame.pilec = [];
    workGame.piled = [];
    workGame.discard = [];
    workGame.msg = 'Start Game';
    let card;
    let j = 1;
    let i;
    while (j < 5) {
      i = 0;
      while (i < 4) {
        card = workDeck.pop();
        workGame['pile' + j].push(card);
        if (i < 3) {
          workGame['pile' + j][i].faceDown = true;
        } else {
          workGame['pile' + j][i].faceDown = false;
        }
        i++;
      }
      j++;
    }
    // Define anchor card
    card = workDeck.pop();
    workGame.pilea.push(card);
    workGame.pilea[0].faceDown = false;

    workGame.remDeck = workDeck;
    setGame(workGame);
  }

  function drawCardButtonPressed() {
    const numberOfCards = 3;
    let card;
    let workGame = structuredClone(game);
    let workDeck = JSON.parse(JSON.stringify(game.remDeck));
    workGame.msg = ' ';
    if (workDeck.length < 1) {
      workDeck = workGame.discard;
      workGame.discard = [];
      workGame.msg = 'Deck refreshed';
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

  const moveCards = (source, target, sourceIndex, workGame) => {
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

    moveCards(
      source.droppableId.toLowerCase(),
      destination.droppableId.toLowerCase(),
      workGame[source.droppableId.toLowerCase()].length - 1,
      workGame
    );

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
          <span>4-pile</span>
        </div>
        <div>
          <button className="game-startButton" onClick={() => redealButtonPressed(initializeGame)}>
            Redeal
          </button>
          <span> {game.msg}</span>
        </div>

        <div className="game-body game-width">
          <Droppable droppableId="DISCARD" direction="horizontal">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div className="game-body game-discard">
                  <div onClick={drawCardButtonPressed}>
                    {game.remDeck.length + game.discard.length > 0 ? (
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

        <div className="game-body-column game-relative">
          <div className="game-body">
            <Droppable droppableId="PILE1" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div
                    className="game-body"
                    style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'white' }}
                  >
                    {game.pile1.filter((item, index, pile1) => item.faceDown).length > 0 ? (
                      <div>
                        <img className="game-card" src={require(`../cards-other/BACK.png`)} alt="" />
                      </div>
                    ) : (
                      <div className="game-card"></div>
                    )}
                    {game.pile1
                      .filter((item, index, pile1) => !item.faceDown)
                      .map((item, index) => (
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
            <Droppable droppableId="PILEA" direction="horizontal">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="game-body">
                    {game.pilea.map((item, index) => (
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
            <Droppable droppableId="PILE2" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div
                    className="game-body"
                    style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'pink' }}
                  >
                    {game.pile2.filter((item, index, pile2) => item.faceDown).length > 0 ? (
                      <div>
                        <img className="game-card" src={require(`../cards-other/BACK.png`)} alt="" />
                      </div>
                    ) : (
                      <div className="game-card"></div>
                    )}
                    {game.pile2
                      .filter((item, index, pile2) => !item.faceDown)
                      .map((item, index) => (
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
            <Droppable droppableId="PILEB" direction="horizontal">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="game-body">
                    {game.pileb.map((item, index) => (
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
            <Droppable droppableId="PILE3" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div
                    className="game-body"
                    style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'pink' }}
                  >
                    {game.pile3.filter((item, index, pile3) => item.faceDown).length > 0 ? (
                      <div>
                        <img className="game-card" src={require(`../cards-other/BACK.png`)} alt="" />
                      </div>
                    ) : (
                      <div className="game-card"></div>
                    )}
                    {game.pile3
                      .filter((item, index, pile3) => !item.faceDown)
                      .map((item, index) => (
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
            <Droppable droppableId="PILEC" direction="horizontal">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="game-body">
                    {game.pilec.map((item, index) => (
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
            <Droppable droppableId="PILE4" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div
                    className="game-body"
                    style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'pink' }}
                  >
                    {game.pile4.filter((item, index, pile4) => item.faceDown).length > 0 ? (
                      <div>
                        <img className="game-card" src={require(`../cards-other/BACK.png`)} alt="" />
                      </div>
                    ) : (
                      <div className="game-card"></div>
                    )}
                    {game.pile4
                      .filter((item, index, pile4) => !item.faceDown)
                      .map((item, index) => (
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
            <Droppable droppableId="PILED" direction="horizontal">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="game-body">
                    {game.piled.map((item, index) => (
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
      </DragDropContext>
    </div>
  );
};

export default GameDetails2;
