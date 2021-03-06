import React from 'react';
import { getRandomItems, compareBy } from '../func';

export default function MainCard({ currentCard, isAnswered, isCorrectAnswer, onClick }) {
  if (!currentCard) return <h2>Choose a deck</h2>;
  const mainKey = compareBy(currentCard);
  return (
    <div className={`main-card card ${isAnswered && isCorrectAnswer ? 'correct' : ''} ${isAnswered ? 'answered' : ''}`}>
      <a href={`https://jisho.org/search/%23kanji%20${currentCard ? currentCard[mainKey] : ''}`} target='_blank' rel='noopener noreferrer'>
        <img className='jisho-link' src={`${process.env.PUBLIC_URL}/jisho.png`} alt='Link to jisho' />
      </a>
      <h2>
        {currentCard[mainKey]} {isAnswered ? ':' + currentCard.english : ''}
      </h2>
      {isAnswered &&
        currentCard.examples &&
        getRandomItems(currentCard.examples, { numberOfItems: 4 }).map((ex, i) => (
          <div className='examples' key={`${i}-${ex.englishWord}`}>
            {' '}
            {ex.kanjiWord} ({ex.kanaWord}) : {ex.englishWord}{' '}
          </div>
        ))}
      {isAnswered && (
        <div onClick={onClick} className='next-button'>
          <i className='small material-icons'>arrow_forward</i>
        </div>
      )}
    </div>
  );
}
