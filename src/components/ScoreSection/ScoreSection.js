import React from 'react';
import { getPercentage } from '../../func';
import Level from '../SelectionScreen/Level';
import PropTypes from 'prop-types';

function ScoreSection(props) {
  return (
    <div className='score'>
      <h1>You scored {getPercentage(props.score.correct, props.score.total)}% </h1>

      <div className='score-buttons'>
        <h2>Level: {JSON.stringify(props.currentDeck)}</h2>
        <Level title='Play Again' onClick={props.onPlayAgain}>
          Play Again
        </Level>
        <Level title='Change Deck' onClick={props.onChangeDeck}>
          Change Deck
        </Level>
      </div>
    </div>
  );
}

ScoreSection.propTypes = {
  onPlayAgain: PropTypes.func.isRequired,
  onChangeDeck: PropTypes.func.isRequired,
  currentDeck: PropTypes.object.isRequired,
  score: PropTypes.shape({
    correct: PropTypes.number,
    total: PropTypes.number
  }).isRequired
};
export default ScoreSection;
