import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { compareBy } from '../func';

export const MiniCards = ({ answerCards, isAnswered, onCardChosen, nextCard }) => {
  const refs = useRef({});
  const onNumberPress = event => {
    const number = Number(+event.key);
    if (number > 0 && number <= 9) {
      onCardChosen(answerCards[number - 1]);
      focusCard(number - 1);
    }
    if (isAnswered && event.keyCode === 13) {
      nextCard();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', onNumberPress);
    return document.removeEventListener('keypress', onNumberPress);
  }, [answerCards]);
  const focusCard = index => {
    if (refs.current[index]) refs.current[index].focus();
  };
  const addRef = (reference, index) => {
    refs.current[index] = reference;
  };
  const onKeyDown = (card, isClick = false) => event => {
    if (event.keyCode === 13) {
      if (isAnswered) {
        nextCard();
      } else {
        Promise.resolve(null).then(() => {
          onCardChosen(card);
        });
      }
    }
    if (isClick) {
      onCardChosen(card);
    }
  };
  return (
    <div className={'cards-group'}>
      {answerCards.map((card, i) => (
        <div key={card.english + ' ' + card[compareBy(card)]}>
          <div
            ref={ref => addRef(ref, i)}
            tabIndex={0}
            title={card.english}
            onClick={onKeyDown(card, true)}
            onKeyDown={onKeyDown(card)}
            className='mini-card card'
          >
            <div className='mini-card__number'> {i + 1} </div>
            <div className='mini-card__kanji'> {isAnswered && card.kanji} </div>
            <div className='mini-card__word'> {card.english} </div>
          </div>
        </div>
      ))}
    </div>
  );
};
MiniCards.propTypes = {
  onCardChosen: PropTypes.func
};
export default MiniCards;
