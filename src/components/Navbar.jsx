import React from 'react';

const Navbar = ({ gameType, setGameType }) => {

  function switchGameButton() {
    setGameType(0);
  }

  return (
    <div className="navbar">
      <button onClick={() => switchGameButton()}>Switch Game</button>
    </div>
  );
};

export default Navbar;
