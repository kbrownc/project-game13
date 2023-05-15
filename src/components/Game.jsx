import React, { useState, useEffect } from 'react';
import SelectGame from './SelectGame';
//import GameDetails1 from './GameDetails1';
import GameDetails2 from './GameDetails2';
import GameDetails3 from './GameDetails3';
import GameDetails4 from './GameDetails4';

const Game = ({gameType}) => {

  // const gameBoard = (
  //   gameType === '1'
  //   ? <GameDetails1 />
  //   : gameType === '2'
  //   ?  <GameDetails2 />
  //   : gameType === '3'
  //   ?  <GameDetails3 />
  //   : gameType === '4'
  //   ?  <GameDetails4 />
  //   : <h2>Game under construction</h2>
  // );

  const gameBoard = (<GameDetails2 />);

  return !gameType ? (
    <SelectGame /> )
  : (
    gameBoard
  );
};

export default Game;
