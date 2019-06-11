import React, { useState, useReducer, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';
import data from './cards/data.json';
import MainCard from './cards/MainCard';
import { createNewStartDeck, chooseRandomCard, getPercentage, moveCardTo, getNewAnswerCards } from './func';
import MiniCards from './cards/MiniCards';
import { ProgressBar } from './ProgressBar';
import { Progress } from './Progress';
import { deckReducer, initialState } from './deckReducer';
import StatusConnectionBar from './StatusConnectionBar';
import * as Events from './Events';

export const App = () => {
  let [state, dispatch] = useReducer(deckReducer, initialState);
  let [socket, setSocket] = useState(null);
  let [connectionStatus, setStatus] = useState(false);

  useEffect(() => {
    const startDeck = createNewStartDeck(data);
    const currentCard = chooseRandomCard(data.matchCards);
    dispatch({ type: 'SET_DECK', payload: startDeck });
    dispatch({ type: 'SET_CURRENT_CARD', payload: currentCard });
    dispatch({ type: 'SET_ANSWER_CARDS', payload: getNewAnswerCards(startDeck, currentCard) });
  }, []);

  useEffect(() => {
    connectToSocket();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit(Events.CURRENT_KANJI, { currentCard, answerCards });
    }
  }, [socket, state.currentCard]);
  const connectToSocket = () => {
    const socketUrl = process.env.REACT_APP_SOCKET;
    const socket = io(socketUrl);
    setSocket(socket);
    socket.on('connect', () => {
      setStatus(true);
    });
    socket.on('disconnect', () => {
      setStatus(false);
    });
  };

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
    dispatch({ type: 'UPDATE_SCORE', score: newScore });
  };

  const onCardChosen = card => {
    const { currentCard, isAnswered } = state;
    if (isAnswered) return;
    if (currentCard.kanji === card.kanji) {
      dispatch({ type: 'SET_ANSWERED_CORRECT' });
      updateScore(true);
    } else {
      dispatch({ type: 'SET_ANSWERED_INCORRECT' });
      updateScore(false);
    }
  };

  const { currentCard, score, isAnswered, isCorrectAnswer, deck, answerCards } = state;
  return (
    <div className='app-container'>
      <div className='progress-header'>
        <Progress color={'lightgreen'} text='Correct' number={deck.correct.length} />
        <Progress color={'red'} text='Incorrect' number={deck.inCorrect.length} />
        <Progress color={'yellow'} text='Remaining' number={deck.unAnswered.length} />
        <ProgressBar numerator={score.correct} denominator={score.total} />
      </div>
      <div className='container'>
        {state.showScore ? (
          <h1>Your score {getPercentage(score.correct, score.total)} </h1>
        ) : (
          <main className='testing-section'>
            <MainCard currentCard={currentCard} onClick={nextCard} isAnswered={isAnswered} isCorrectAnswer={isCorrectAnswer} />
            <MiniCards onCardChosen={onCardChosen} answerCards={answerCards} isAnswered={isAnswered} nextCard={nextCard} />
          </main>
        )}
      </div>
      <StatusConnectionBar status={connectionStatus} />
    </div>
  );
};

export default App;
