import React from 'react';

const Navbar = ({gameType}) => {
  return (
    <div className="navbar">
      <div className="navbar">Current Game: {gameType}</div>
      <button>Restart</button>
      <button>Switch Game</button>
    </div>
  );
};

export default Navbar;
