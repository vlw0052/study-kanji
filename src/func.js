import { useEffect } from 'react';
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
  if (items.length <= numberOfItems) return items.filter(fnException);
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

/**
 * Computes the percentage of of the number passed in, to a fixed 2 decimal points.
 * @param {number} numerator
 * @param {number} denominator
 * @returns {number}
 */
export const getPercentage = (numerator, denominator) => {
  if (denominator <= 0 || numerator <= 0) {
    return 0;
  }
  if (denominator === numerator) return 100;
  return ((numerator / denominator) * 100).toFixed(2);
};

export const getNewAnswerCards = (deck, currentCard) => {
  const randomItems = getRandomItems([...deck.unAnswered, ...deck.inCorrect, ...deck.correct], {
    fnException: card => {
      return !areCardsEqual(card, currentCard);
    },
    numberOfItems: +process.env.REACT_APP_NUMBER_OF_ANSWERS || 8
  });
  return shuffle([...randomItems, currentCard]);
};

export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function fetchDeck(level, group) {
  return fetch(`${process.env.PUBLIC_URL}/decks/JLPT${level}-${group}.json`).then(data => data.json());
}
export function useSaveProgress(state) {
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state]);
}

/**
 * Looks if there is saved grade data in localStorage
 * @param {string} level the level to look for grade
 * @param {number} group the group to look up grade
 */
export function gradeForGroup(level, group) {
  const gradesLocal = localStorage.getItem(`grades`);
  const grades = JSON.parse(gradesLocal);
  if (grades && grades[`${level}-${group}`]) {
    const grade = grades[`${level}-${group}`];
    const result = getPercentage(grade.correct, grade.total).toString();
    return result;
  } else {
    return '';
  }
}

export function saveGradeForGroup(level, group, grade) {
  const gradesLocal = localStorage.getItem(`grades`);
  let grades = JSON.parse(gradesLocal);
  if (grades) {
    grades[`${level}-${group}`] = grade;
    localStorage.setItem('grades', JSON.stringify(grades));
  } else {
    grades = JSON.stringify({
      [`${level}-${group}`]: grade
    });
    localStorage.setItem('grades', grades);
  }
}
