import React from 'react';
import { getPercentage } from '../../func';
import Level from '../SelectionScreen/Level';

function ScoreSection(props) {
  return (
    <div className='score'>
      <h1>You scored {getPercentage(props.score.correct, props.score.total)}% </h1>

      <div className='score-buttons'>
        <Level title='Play Again'>Play Again</Level>
        <Level title='Change Deck'>Change Deck</Level>
      </div>
    </div>
  );
}

export default ScoreSection;
