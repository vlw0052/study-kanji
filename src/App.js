import React, { useReducer, useCallback } from 'react';
import './App.css';
import MainCard from './cards/MainCard';
import MiniCards from './cards/MiniCards';
import SelectionScreen from './components/SelectionScreen/SelectionScreen';
import { ProgressBar } from './components/ProgressBar';
import { Progress } from './components/Progress';
import { deckReducer, initialState, Actions } from './deckReducer';
import {
  createNewStartDeck,
  chooseRandomCard,
  moveCardTo,
  getNewAnswerCards,
  compareBy,
  useSaveProgress,
  fetchDeck,
  saveGradeForGroup
} from './func';
import { ScoreSection } from './components/ScoreSection';

export const App = props => {
  let [state, dispatch] = useReducer(deckReducer, initialState());
  useSaveProgress(state);
  const nextCard = () => {
    const { isCorrectAnswer, deck, currentCard, isAnswered } = state;
    if (!isAnswered) return;
    const newDeck = moveCardTo(isCorrectAnswer)(deck, currentCard);
    const newCurrentCard = chooseRandomCard([...newDeck.unAnswered, ...newDeck.inCorrect]);
    if (newCurrentCard) {
      dispatch(Actions.setDeck(newDeck));
      dispatch(Actions.setCurrentCard(newCurrentCard));
      dispatch(Actions.setAnswerCards(getNewAnswerCards(newDeck, newCurrentCard)));
    } else {
      saveGradeForGroup(state.deck.JLPTLevel, state.deck.group, state.score);
      dispatch(Actions.showScore());
    }
  };

  const updateScore = (isCorrect = true) => {
    const { score } = state;
    const newScore = {
      correct: isCorrect ? score.correct + 1 : score.correct,
      total: score.total + 1
    };
    dispatch(Actions.updateScore(newScore));
  };
  const onCardChosen = card => {
    const { currentCard, isAnswered } = state;
    if (isAnswered) return;
    const compareKey = compareBy(card);
    if (currentCard[compareKey] === card[compareKey]) {
      dispatch(Actions.correctAnswer());
      updateScore(true);
    } else {
      dispatch(Actions.incorrectAnswer());
      updateScore(false);
    }
  };
  const selectDeck = (level, group) => {
    fetchDeck(level, group).then(data => {
      setDeck(data);
    });
  };
  const setDeck = data => {
    const startDeck = createNewStartDeck(data);
    const currentCard = chooseRandomCard(data.matchCards);
    const answerCards = getNewAnswerCards(startDeck, currentCard);
    dispatch(Actions.setNewDeck(startDeck, currentCard, answerCards));
  };
  const playAgain = () => {
    dispatch(Actions.retryDeck());
  };
  const updateDeck = useCallback(() => {
    dispatch(Actions.showSelectionScreen(true));
  }, []);
  const { currentCard, score, isAnswered, isCorrectAnswer, deck, answerCards, showSelectionScreen } = state;

  if (showSelectionScreen)
    return (
      <SelectionScreen
        selectDeck={selectDeck}
        back={() => {
          dispatch(Actions.showSelectionScreen(false));
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
        <ScoreSection score={score} onChangeDeck={updateDeck} onPlayAgain={playAgain} />
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
