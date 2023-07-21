import React, { useState } from 'react';
import Navbar from './Navbar';
import Game from './Game';

function App() {
  const [gameType, setGameType] = useState(4);

  return (
    <div className="app">
      <div className="container">
        <Navbar gameType={gameType} setGameType={setGameType}/>
        <Game gameType={gameType} setGameType={setGameType} />
      </div>
    </div>
  );
}

export default App;
