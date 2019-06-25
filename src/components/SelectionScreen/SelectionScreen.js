import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { decks } from '../../decks.json';

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
          ? Object.keys(decks).map(l => (
              <div title={`${decks[l].label}`} onClick={selectLevel(l)} className='level'>
                {decks[l].label}
              </div>
            ))
          : Array.from(new Array(decks[selectedLevel].numberOfSections)).map((_, l) => (
              <div title={`${l + 1}`} onClick={() => props.selectDeck(selectedLevel, l + 1)} className='level'>
                {l + 1}
              </div>
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
