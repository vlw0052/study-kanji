import { createNewStartDeck, resolveDeckFileName } from '../func';
import deck from './data.json';
import decksData from '../decks.json';

describe('create a new deck', () => {
  const setup = () => {
    return {
      newDeck: createNewStartDeck(deck)
    };
  };
  it('should create a new deck with 45 in unanswered array', () => {
    const { newDeck } = setup();
    expect(newDeck.unAnswered).toHaveLength(45);
  });
  it('should create a with the new deck with JLPT level 4', () => {
    const { newDeck } = setup();
    expect(newDeck.JLPTLevel).toEqual(4);
  });
  it('should create a with the new deck with deck group 3', () => {
    const { newDeck } = setup();
    expect(newDeck.group).toEqual(3);
  });
});

describe('resolving file names', () => {
  it('should resolve the correct file name according to input', () => {
    const JLPT2deck = decksData.decks['JLPT2'];
    expect(resolveDeckFileName(JLPT2deck, 1)).toEqual('JLPT2-1.json');
  });

  it('should resolve the correct file name according to input', () => {
    const JLPT5deck = decksData.decks['JLPT5'];
    expect(resolveDeckFileName(JLPT5deck, 7)).toEqual('JLPT5-7.json');
  });

  it('should resolve the correct file name according to input', () => {
    const JLPT3deck = decksData.decks['JLPT3'];
    expect(resolveDeckFileName(JLPT3deck, 1)).toEqual('JLPT3-1.json');
  });
});
