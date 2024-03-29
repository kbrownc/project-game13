import React, { useState } from 'react';

function SelectGame({ gameType, setGameType }) {
  const [selectedGameIds, setSelectedGameIds] = useState([gameType]);
  const gameList = [{ id: 1, name: "Solitaire"},
                    { id: 2, name: "4-pile"},
                    { id: 3, name: "1-pile"},
                    { id: 4, name: "Triangle"}];

  function handleSubmit(e) {
    if (selectedGameIds.length > 0) {
      setGameType(selectedGameIds[0]);
    }
  }

  function handleCheckboxChange(solId) {
    setSelectedGameIds([solId])
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Choose Game</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {gameList.map(sol => (
              <div key={sol.id}>
                <input
                  type="radio"
                  name="games-select"
                  key="{sol}"
                  checked={ selectedGameIds.includes(sol.id) ? 'checked' : ''}
                  value={selectedGameIds.includes(sol.id)}
                  onChange={() => handleCheckboxChange(sol.id)}
                />
                <label className="modal-label">
                  {sol.name}
                </label>
              </div>
            ))}
            <button type="submit" className="modal-button">
              SELECT
            </button>
          </form>
        </div>
      </div>
      <div className="modal-content">
        <h2>Instructions</h2>
        <p>Select one of solitaire games listed</p>
        <p>above and hit the select button.</p>
        <p>Selected game is not saved for the next time you play.</p>
      </div>
    </div>
  )
}

export default SelectGame;
