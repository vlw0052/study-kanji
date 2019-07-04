import { createNewStartDeck, moveCardTo, getPercentage, fetchDeck, gradeForGroup } from '../func';
import deck from './data.json';

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

describe('moves card to correct section', () => {
  const setup = () => {
    return {
      newDeck: createNewStartDeck(deck)
    };
  };
  it('should move card to incorrect pile', () => {
    const { newDeck } = setup();
    const updatedDeck = moveCardTo(false)(newDeck, newDeck.unAnswered[0]);
    expect(updatedDeck.inCorrect).toHaveLength(1);
  });

  it('should remove card to unanswered pile', () => {
    const { newDeck } = setup();
    const updatedDeck = moveCardTo(false)(newDeck, newDeck.unAnswered[0]);
    expect(updatedDeck.unAnswered).toHaveLength(44);
  });

  it('should move card to correct pile', () => {
    const { newDeck } = setup();
    const updatedDeck = moveCardTo(true)(newDeck, newDeck.unAnswered[0]);
    expect(updatedDeck.correct).toHaveLength(1);
  });
});
describe('percentage calculations', () => {
  it('should be 80', () => {
    expect(getPercentage(8, 10)).toEqual('80.00');
  });
  it('should be 0', () => {
    expect(getPercentage(0, 10)).toEqual(0);
    expect(getPercentage(10, 0)).toEqual(0);
  });

  it('should be 10.00', () => {
    expect(getPercentage(10, 100)).toEqual('10.00');
  });
});

describe('should fetch json data', () => {
  beforeEach(() => {
    const mockFetch = Promise.resolve({
      json: () => Promise.resolve({})
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);
  });
  afterEach(() => {
    global.fetch.mockClear();
  });
  it('should fetch json data for JLPT level1-1', done => {
    fetchDeck('JLPT1', 1).then(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(`${process.env.PUBLIC_URL}/decks/JLPT1-1.json`);
      done();
    });
  });

  it('should fetch json data for JLPT level2-10', done => {
    fetchDeck('JLPT2', 10).then(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(`${process.env.PUBLIC_URL}/decks/JLPT2-10.json`);
      done();
    });
  });

  it('should fetch json data for JLPT level7-2', done => {
    fetchDeck('JLPT7', 2).then(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(`${process.env.PUBLIC_URL}/decks/JLPT7-2.json`);
      global.fetch.mockClear();
      done();
    });
  });
});

describe.only('retrieving grade data', () => {
  beforeAll(() => {
    const initialState = {
      grades: JSON.stringify({
        [`JLPT3-1`]: '95',
        [`JLPT3-2`]: '100'
      })
    };
    Object.defineProperty(window, 'localStorage', {
      value: makeMockLocalStorage(initialState)
    });
  });

  it('should get empty string', () => {
    expect(gradeForGroup('JLPT3', 23)).toBe('');
  });
  it('should retrieve 95 from localStorage for group JLPT3-1', () => {
    const initialStorage = { grades: JSON.stringify({ 'JLPT3-2': '100' }) };
    expect(gradeForGroup('JLPT3', 1)).toBe('95');
  });

  it('should retrieve 100 from localStorage for group JLPT3-1', () => {
    expect(gradeForGroup('JLPT3', 2)).toBe('100');
  });
});

function makeMockLocalStorage(initialState = {}) {
  let state = initialState;
  return {
    getItem: function(key) {
      return state[key];
    },
    setItem: function(key, value) {
      state[key] = value.toString();
    },
    clear: function() {
      state = {};
    },
    removeItem: function(key) {
      delete state[key];
    }
  };
}
