const requireDeckFile = file => require(`./data/decks/${file}`);

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

export const moveCardTo = (isCorrect = true) => (deck, card) => {
  let correct;
  let inCorrect;
  if (isCorrect) {
    correct = [...deck.correct, card];
    inCorrect = [...deck.inCorrect.filter(c => c.kanji !== card.kanji)];
  } else {
    correct = [...deck.correct];
    inCorrect = [...deck.inCorrect.filter(c => c.kanji !== card.kanji), card];
  }
  const unAnswered = deck.unAnswered.filter(c => c.kanji !== card.kanji);
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

export function fetchDeckSection(deckData, group) {
  const fileName = resolveDeckFileName(deckData, group);
  return fetch('./decks/' + fileName, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => {
    console.log(res);
    return res.json();
  });
}

export function resolveDeckFileName(deckData, group) {
  return `${deckData.label}-${group}.json`;
}
export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
