import React from 'react';

const Navbar = ({ gameType, setGameType }) => {
  function switchGameButton() {
    setGameType(null);
  }

  return (
    <div className="navbar">
      <div className="navbar">Current Game: {gameType}</div>
      <button>Restart</button>
      <button onClick={() => switchGameButton()}>Switch Game</button>
    </div>
  );
};

export default Navbar;
