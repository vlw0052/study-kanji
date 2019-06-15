import React from 'react';
import Levels from './Levels';
import Groups from './Groups';

function DeckSelection() {
  return (
    <nav className={'deck-selection'}>
      <Levels />
      <Groups />
    </nav>
  );
}
export default DeckSelection;
