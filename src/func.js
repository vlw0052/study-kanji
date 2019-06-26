import { useEffect } from 'react';
import data from './cards/data.json';
import { localStorageKey } from './deckReducer.js';
/**
 * Creates a new start deck
 * @param {object} deck
 */
export const createNewStartDeck = deck => ({
  JLPTLevel: deck.JLPTLevel,
  group: deck.group,
  correct: [],
  inCorrect: [],
  unAnswered: [...deck.matchCards]
});
export const areCardsEqual = (card1, card2) => {
  if (!card1 || !card2) return false;
  return card1.english === card2.english;
};

export const chooseRandomCard = cards => {
  if (cards.length === 1) {
    return cards[0];
  }
  const randIndex = Math.floor(Math.random() * 1000) % (cards.length - 1);
  return cards[randIndex];
};

export const getRandomItems = (items, { numberOfItems = 9, fnException = item => true } = {}) => {
  let randomItems = [];
  let chosenIndexes = [];
  let triedIndexes = [];
  if (items.length <= numberOfItems) return items;
  for (let i = 0; i < numberOfItems; i++) {
    let randIndex = Math.floor(Math.random() * 1000) % (items.length - 1);
    if (!chosenIndexes.includes(randIndex) && fnException(items[randIndex])) {
      chosenIndexes.push(randIndex);
      randomItems.push(items[randIndex]);
    } else {
      i--;
    }
    if (triedIndexes.includes(randIndex)) {
      triedIndexes.push(randIndex);
    }
    if (triedIndexes.length === items.length) break;
  }
  return randomItems;
};

export const compareBy = card => (card.kanji.trim() ? 'kanji' : 'kana');

export const moveCardTo = (isCorrect = true) => (deck, card) => {
  let correct;
  let inCorrect;
  const compareKey = compareBy(card);
  if (isCorrect) {
    correct = [...deck.correct, card];
    inCorrect = [...deck.inCorrect.filter(c => c[compareKey] !== card[compareKey])];
  } else {
    correct = [...deck.correct];
    inCorrect = [...deck.inCorrect.filter(c => c[compareKey] !== card[compareKey]), card];
  }
  const unAnswered = deck.unAnswered.filter(c => c[compareKey] !== card[compareKey]);
  return {
    ...deck,
    correct,
    inCorrect,
    unAnswered
  };
};

export const getPercentage = (numerator, denominator) => {
  if (denominator <= 0 || numerator <= 0) {
    return 0;
  }
  if (denominator === numerator) return 100;
  return ((numerator / denominator) * 100).toFixed(2);
};

export const getNewAnswerCards = (deck, currentCard) => {
  return shuffle([
    ...getRandomItems([...deck.unAnswered, ...deck.inCorrect, ...deck.correct], {
      fnException: card => {
        return !areCardsEqual(card, currentCard);
      },
      numberOfItems: +process.env.REACT_APP_NUMBER_OF_ANSWERS || 8
    }),
    currentCard
  ]);
};

export function fetchSectionDeck(section) {
  return Promise.resolve(data);
}

export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function fetchDeck(level, group) {
  return fetch(`${process.env.PUBLIC_URL}/decks/${level}-${group}.json`).then(data => data.json());
}
export function useSaveProgress(state) {
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
    console.log('saved', state);
  }, [state]);
}
