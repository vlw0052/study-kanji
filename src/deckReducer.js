import React from 'react'
export const initialState = {
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
    showScore: false
}

export const CardContext = React.createContext(initialState)

export function deckReducer(state, action) {
    switch (action.type) {
        case 'SET_DECK':
            return {
                ...state,
                deck: action.payload
            }
        case 'SET_CURRENT_CARD':
            return {
                ...state,
                currentCard: action.payload
            }
        case 'SET_ANSWERED_CORRECT':
            return {
                ...state,
                isAnswered: true,
                isCorrectAnswer: true
            }
        case 'SET_ANSWERED_INCORRECT':
            return {
                ...state,
                isAnswered: true,
                isCorrectAnswer: false
            }
        case 'SET_ANSWER_CARDS':
            return {
                ...state,
                isAnswered: false,
                answerCards: action.payload
            }
        case 'SHOW_SCORE':
            return {
                ...state,
                showScore: true
            }
        case 'HIDE_SCORE':
            return {
                ...state,
                showScore: false
            }
    }
    return state
}
