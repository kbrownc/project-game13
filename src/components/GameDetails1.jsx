import React, { useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { createDeck } from '../common/Deck';
import { redealButtonPressed, alertOtherPlayer, doneButtonPressed } from '../common/Buttons';

const GameDetails1 = ({ gameType }) => {
  
  useEffect(() => {
    let workDeck = [];
    createDeck(workDeck);
    initializeGame(workDeck);
  }, []);

  function initializeGame(workDeck) {
    const numberOfCards = 10;
    workGame.hand = [];
    workGame.discardPile = [];
    workGame.gameDone = false;
    workGame.messages[0].msg = 'Not your turn';
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
    updateGame(workGame, workMsgOn);
  }

  function drawCardButtonPressed() {
    let workGame = JSON.parse(JSON.stringify(game));
    let workDeck = JSON.parse(JSON.stringify(workGame.remDeck));
    if (workDeck.length < 1) return;
    if (workDeck.length < 2) {
      workGame.messages[0].msg = 'Deck exhausted, game is stalemated';
      workGame.messages[1].msg = 'Deck exhausted, game is stalemated';
    }
    let card = workDeck.pop();
    workGame.hand.push(card);
    workGame.remDeck = workDeck;
    updateGame(workGame, workMsgOn);
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
    if (workGame.whoseTurn === id) {
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
  }

    // update state
    updateGame(workGame, workMsgOn);
  };

//<button className="game-startButton" onClick={() => redealButtonPressed(initializeGame)}>

  return (
    <div className="game-content">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="game-header1">
          <span>** Game 1 - Gin Rummy **</span>
          {contacts
            .filter((item, index, contacts) => item.id === player2)
            .map(contact => (
              <span key={contact.id} className="game-opponent">
                Your opponent is: {contact.name}
              </span>
            ))}
        </div>

        <div className="game-header2">
          <button className="game-startButton" onClick={() => redealButtonPressed(initializeGame)}>
            Redeal
          </button>
          {workMsgOn && <span className="game-chatButton">{alertMessage}</span>}
          <button className="game-startButton" onClick={() => alertOtherPlayer(workMsgOn, setMessageOn, updateGame, game)}>
            Chat ?
          </button>
        </div>

        {id === game.messages[0].player ? (
          <div className="game-msg">{game.messages[0].msg}</div>
        ) : (
          <div className="game-msg">{game.messages[1].msg}</div>
        )}

        <div className="game-header3">
          <div>
            {!game.gameDone ? (
              <button className="game-oppButton" onClick={() => setPlayer2('')}>
                Opponent
              </button>
            ) : null}
            {game.whoseTurn === id && !game.gameDone ? (
              <button className="game-startButton" onClick={() => doneButtonPressed(game, id, player2, updateGame, workMsgOn)}>
                Done
              </button>
            ) : null}
          </div>
          <div>
            {game.whoseTurn === id && !game.gameDone ? (
              <button className="game-startButton" onClick={knockButtonPressed}>
                Knock
              </button>
            ) : null}
            {game.whoseTurn === id && !game.gameDone ? (
              <button className="game-startButton" onClick={ginButtonPressed}>
                Gin
              </button>
            ) : null}
          </div>
        </div>

        {game.gameDone ? (
          <Droppable droppableId="HAND2" direction="horizontal">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div className="game-body">
                  <span>Opponent</span>
                  {game.hand2.map((item, index) => (
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
        ) : null}

        <Droppable droppableId="DISCARD" direction="horizontal">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div className="game-body-discard">
              <span>Click to draw card =></span>
                { game.whoseTurn === id && !game.gameDone
                  ? <div onClick={drawCardButtonPressed}>
                      <img src={require('../cards-other/BACK.png')} alt="" className="game-card" /> 
                    </div> 
                  : <div>
                      <img src={require('../cards-other/BACK.png')} alt="" className="game-card" /> 
                    </div> }       
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
                <span>Your hand</span>
                {game.hand.map((item, index) => (
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
