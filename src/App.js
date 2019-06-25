import React, { useReducer, useCallback } from 'react';
import './App.css';
import MainCard from './cards/MainCard';
import MiniCards from './cards/MiniCards';
import SelectionScreen from './components/SelectionScreen/SelectionScreen';
import { ProgressBar } from './components/ProgressBar';
import { Progress } from './components/Progress';
import { deckReducer, initialState } from './deckReducer';
import { createNewStartDeck, chooseRandomCard, getPercentage, moveCardTo, getNewAnswerCards, compareBy, useSaveProgress } from './func';

export const App = props => {
  let [state, dispatch] = useReducer(deckReducer, initialState());
  useSaveProgress(state);
  const nextCard = () => {
    const { isCorrectAnswer, deck, currentCard, isAnswered } = state;
    if (!isAnswered) return;
    const newDeck = moveCardTo(isCorrectAnswer)(deck, currentCard);
    const newCurrentCard = chooseRandomCard([...newDeck.unAnswered, ...newDeck.inCorrect]);
    if (newCurrentCard) {
      dispatch({ type: 'SET_DECK', payload: newDeck });
      dispatch({ type: 'SET_CURRENT_CARD', payload: newCurrentCard });
      dispatch({ type: 'SET_ANSWER_CARDS', payload: getNewAnswerCards(newDeck, newCurrentCard) });
    } else {
      dispatch({ type: 'SHOW_SCORE' });
    }
  };

  const updateScore = (isCorrect = true) => {
    const { score } = state;
    const newScore = {
      correct: isCorrect ? score.correct + 1 : score.correct,
      total: score.total + 1
    };
    dispatch({ type: 'UPDATE_SCORE', payload: newScore });
  };
  const onCardChosen = card => {
    const { currentCard, isAnswered } = state;
    if (isAnswered) return;
    const compareKey = compareBy(card);
    if (currentCard[compareKey] === card[compareKey]) {
      dispatch({ type: 'SET_ANSWERED_CORRECT' });
      updateScore(true);
    } else {
      dispatch({ type: 'SET_ANSWERED_INCORRECT' });
      updateScore(false);
    }
  };
  const selectDeck = (level, group) => {
    fetch(`/decks/${level}-${group}.json`)
      .then(data => data.json())
      .then(data => {
        setDeck(data);
      });
  };
  const setDeck = data => {
    const startDeck = createNewStartDeck(data);
    const currentCard = chooseRandomCard(data.matchCards);
    const answerCards = getNewAnswerCards(startDeck, currentCard);
    dispatch({ type: 'SET_NEW_DECK', payload: { deck: startDeck, currentCard, answerCards } });
  };
  const updateDeck = useCallback(() => {
    dispatch({ type: 'UPDATE_DECK', payload: true });
  }, []);
  const { currentCard, score, isAnswered, isCorrectAnswer, deck, answerCards, updatingDeck } = state;

  if (updatingDeck)
    return (
      <SelectionScreen
        selectDeck={selectDeck}
        back={() => {
          dispatch({ type: 'UPDATE_DECK', payload: false });
        }}
      />
    );
  return (
    <div className='app-container'>
      <div className='progress-header'>
        <Progress color={'lightgreen'} text='Correct' number={deck.correct.length} />
        <Progress color={'red'} text='Incorrect' number={deck.inCorrect.length} />
        <Progress color={'yellow'} text='Remaining' number={deck.unAnswered.length} />
        <ProgressBar numerator={score.correct} denominator={score.total} />
      </div>

      {state.showScore ? (
        <h1>Your score {getPercentage(score.correct, score.total)} </h1>
      ) : (
        <main className='testing-section'>
          <MainCard currentCard={currentCard} onClick={nextCard} isAnswered={isAnswered} isCorrectAnswer={isCorrectAnswer} />
          <MiniCards onCardChosen={onCardChosen} answerCards={answerCards} isAnswered={isAnswered} nextCard={nextCard} />
        </main>
      )}
      <button className='update-deck' onClick={updateDeck}>
        Update Deck
      </button>
    </div>
  );
};

export default App;
