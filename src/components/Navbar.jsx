import React from 'react';

const Navbar = ({ gameType, setGameType }) => {

  function switchGameButton() {
    setGameType(null);
  }

  return (
    <div className="navbar">
      <button onClick={() => switchGameButton()}>Switch Game</button>
    </div>
  );
};

export default Navbar;
