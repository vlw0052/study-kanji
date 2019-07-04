import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { decks } from '../../decks.json';
import Level from './Level.js';
import { gradeForGroup } from '../../func.js';

function SelectionScreen(props) {
  const [selectedLevel, setLevel] = useState(null);

  const selectLevel = l => _ => {
    setLevel(l);
  };
  const back = _ => {
    if (!selectedLevel) props.back();
    setLevel(null);
  };

  return (
    <div className='selection'>
      <h3>{selectedLevel ? 'Select A Group' : 'Select Your Level'}</h3>
      <div className='levels'>
        {!selectedLevel
          ? Object.keys(decks)
              .reverse()
              .map(l => (
                <Level key={decks[l].label} title={`${decks[l].label}`} onClick={selectLevel(l)}>
                  {decks[l].label}
                </Level>
              ))
          : Array.from(new Array(decks[selectedLevel].numberOfSections)).map((_, l) => (
              <Level
                key={l}
                grade={gradeForGroup(selectedLevel, l + 1)}
                title={`${selectedLevel} Group ${l + 1}`}
                onClick={() => props.selectDeck(selectedLevel, l + 1)}
              >
                {l + 1}
              </Level>
            ))}
        <button className='level btn' onClick={back} title='Back'>
          <i className='material-icons'>arrow_backward</i>
        </button>
      </div>
    </div>
  );
}
SelectionScreen.propTypes = {
  onLevelSelection: PropTypes.func
};
export default SelectionScreen;
