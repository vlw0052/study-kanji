import React from 'react';

export const localStorageKey = 'kanji-l';
export const ActionTypes = {
  SET_ANSWERED_CORRECT: 'SET_ANSWERED_CORRECT',
  SET_ANSWERED_INCORRECT: 'SET_ANSWERED_INCORRECT',
  SET_DECK: 'SET_DECK',
  SET_CURRENT_CARD: 'SET_CURRENT_CARD',
  SET_ANSWER_CARDS: 'SET_ANSWER_CARDS',
  SHOW_SCORE: 'SHOW_SCORE',
  UPDATE_SCORE: 'UPDATE_SCORE',
  SET_NEW_DECK: 'SET_NEW_DECK',
  SELECTION_SCREEN: 'SELECTION_SCREEN',
  RETRY_DECK: 'RETRY_DECK'
};
export const initialState = (reset = false) => {
  if (localStorage.getItem(localStorageKey) && !reset) {
    const localStorageData = JSON.parse(localStorage.getItem(localStorageKey));
    if (localStorageData) return localStorageData;
  }
  return {
    currentCard: null,
    deck: {
      JLPTLevel: null,
      group: null,
      correct: [],
      inCorrect: [],
      unAnswered: []
    },
    score: {
      correct: 0,
      total: 0
    },
    isAnswered: false,
    isCorrectAnswer: true,
    answerCards: [],
    showScore: false,
    showSelectionScreen: true
  };
};

export const CardContext = React.createContext(initialState);

const handlers = {
  [ActionTypes.SET_DECK]: ({ action }) => ({
    deck: action.payload,
    showSelectionScreen: false,
    showScore: false
  }),
  [ActionTypes.SET_NEW_DECK]: ({ action }) => ({
    deck: action.payload.deck,
    answerCards: action.payload.answerCards,
    currentCard: action.payload.currentCard,
    isAnswered: false,
    showSelectionScreen: false,
    showScore: false,
    score: initialState(true).score
  }),
  [ActionTypes.RETRY_DECK]: ({ state, action }) => ({
    deck: {
      ...state.deck,
      correct: [],
      inCorrect: [],
      unAnswered: [...state.deck.correct, ...state.deck.inCorrect, ...state.deck.unAnswered]
    },
    isAnswered: false,
    showSelectionScreen: false,
    showScore: false,
    score: initialState(true).score
  }),
  [ActionTypes.SET_CURRENT_CARD]: ({ action }) => ({
    currentCard: action.payload
  }),
  [ActionTypes.SET_ANSWERED_CORRECT]: () => ({
    isAnswered: true,
    isCorrectAnswer: true
  }),
  [ActionTypes.SET_ANSWERED_INCORRECT]: () => ({
    isAnswered: true,
    isCorrectAnswer: false
  }),
  [ActionTypes.SET_ANSWER_CARDS]: ({ action }) => ({
    isAnswered: false,
    answerCards: action.payload
  }),
  [ActionTypes.SHOW_SCORE]: () => ({
    showScore: true
  }),
  [ActionTypes.HIDE_SCORE]: () => ({
    showScore: false
  }),
  [ActionTypes.SELECTION_SCREEN]: ({ action }) => ({
    showSelectionScreen: action.payload
  }),
  [ActionTypes.UPDATE_SCORE]: ({ action }) => ({
    score: action.payload
  })
};

export function deckReducer(state, action) {
  if (action.type in handlers)
    return {
      ...state,
      ...handlers[action.type]({ state, action })
    };
  return state;
}

export const Actions = {
  correctAnswer: () => ({ type: ActionTypes.SET_ANSWERED_CORRECT }),
  incorrectAnswer: () => ({ type: ActionTypes.SET_ANSWERED_INCORRECT }),
  setDeck: newDeck => ({ type: ActionTypes.SET_DECK, payload: newDeck }),
  setCurrentCard: newCurrentCard => ({ type: ActionTypes.SET_CURRENT_CARD, payload: newCurrentCard }),
  setAnswerCards: newAnswerCards => ({ type: ActionTypes.SET_ANSWER_CARDS, payload: newAnswerCards }),
  showScore: () => ({ type: ActionTypes.SHOW_SCORE }),
  updateScore: newScore => ({ type: ActionTypes.UPDATE_SCORE, payload: newScore }),
  setNewDeck: (deck, currentCard, answerCards) => ({ type: ActionTypes.SET_NEW_DECK, payload: { deck, currentCard, answerCards } }),
  showSelectionScreen: isSelectionScreen => ({ type: ActionTypes.SELECTION_SCREEN, payload: isSelectionScreen }),
  retryDeck: () => ({ type: ActionTypes.RETRY_DECK })
};
