import React from 'react';

export const localStorageKey = 'kanji-l';
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
    updatingDeck: true
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
        updatingDeck: false,
        showScore: false
      };
    case 'SET_NEW_DECK':
      return {
        ...state,
        deck: action.payload.deck,
        answerCards: action.payload.answerCards,
        currentCard: action.payload.currentCard,
        isAnswered: false,
        updatingDeck: false,
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
    case 'UPDATE_DECK':
      return {
        ...state,
        updatingDeck: action.payload
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
