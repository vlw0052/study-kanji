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
  if (localStorage.getItem(localStorageKey) && !reset) return JSON.parse(localStorage.getItem(localStorageKey));
  return {
    section: null,
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

export function deckReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SECTION':
      return {
        ...state,
        section: action.payload
      };
    case 'SET_DECK':
      return {
        ...state,
        deck: action.payload,
        showSelectionScreen: false,
        showScore: false
      };
    case 'SET_NEW_DECK':
      return {
        ...state,
        deck: action.payload.deck,
        answerCards: action.payload.answerCards,
        currentCard: action.payload.currentCard,
        isAnswered: false,
        showSelectionScreen: false,
        showScore: false,
        score: initialState(true).score
      };
    case 'RETRY_DECK':
      return {
        ...state,
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
      };
    case 'SET_CURRENT_CARD':
      return {
        ...state,
        currentCard: action.payload
      };
    case 'SET_ANSWERED_CORRECT':
      return {
        ...state,
        isAnswered: true,
        isCorrectAnswer: true
      };
    case 'SET_ANSWERED_INCORRECT':
      return {
        ...state,
        isAnswered: true,
        isCorrectAnswer: false
      };
    case 'SET_ANSWER_CARDS':
      return {
        ...state,
        isAnswered: false,
        answerCards: action.payload
      };
    case 'SHOW_SCORE':
      return {
        ...state,
        showScore: true
      };
    case 'HIDE_SCORE':
      return {
        ...state,
        showScore: false
      };
    case 'SELECTION_SCREEN':
      return {
        ...state,
        showSelectionScreen: action.payload
      };
    case 'UPDATE_SCORE':
      return {
        ...state,
        score: action.payload
      };
    default:
      return state;
  }
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
