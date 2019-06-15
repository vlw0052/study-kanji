import React from 'react';
import deckData from '../decks.json';
function Levels() {
  console.log(deckData);
  return (
    <ul className='level-list'>
      {Object.keys(deckData.decks).map(k => {
        return (
          <div className='card'>
            <span> {deckData.decks[k].label} </span>;
          </div>
        );
      })}
    </ul>
  );
}

export default Levels;
