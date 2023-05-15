import React, { useState } from 'react';
import Navbar from './Navbar';
import Game from './Game';

function App() {
  const [gameType, setGameType] = useState(2);

  return (
    <div className="app">
      <div className="container">
        <Navbar gameType={gameType} />
        <Game gameType={gameType} />
      </div>
    </div>
  );
}

export default App;
