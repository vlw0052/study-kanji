import React from 'react';
import { shallow } from 'enzyme';
import MainCard from '../MainCard';

var kanji;

const setup = overrideProps => {
  const props = Object.assign({
    currentCard: kanji,
    ...overrideProps
  });
  const wrapper = shallow(<MainCard {...props} />);
  return {
    wrapper
  };
};

describe('Card', () => {
  it('should have next button', () => {
    const { wrapper } = setup({ isAnswered: true, isCorrectAnswer: true });
    expect(wrapper.exists('.next-button')).toBe(true);
  });
  it('should not have next button', () => {
    const { wrapper } = setup({ isAnswered: false });
    expect(wrapper.exists('.next-button')).toBe(false);
  });

  it('should have a list of examples', () => {
    const { wrapper } = setup({ isAnswered: true });
    expect(wrapper.find('.examples').exists()).toBe(true);
  });
  it('should have a list of 4 examples', () => {
    const { wrapper } = setup({ isAnswered: true });
    expect(wrapper.find('.examples')).toHaveLength(4);
  });

  it('should call onClick Function', () => {
    const onClick = jest.fn();
    const { wrapper } = setup({ isAnswered: true, onClick });
    wrapper.find('.next-button').simulate('click');
    expect(onClick).toBeCalled();
  });
});

kanji = {
  examples: [
    {
      kanjiWord: '船便',
      kanaWord: 'ふなびん ',
      englishWord: 'Surface mail (ship)',
      JLPTLevel: 3
    },
    {
      kanjiWord: '宅配便',
      kanaWord: 'たくはいびん ',
      englishWord: 'Express home delivery',
      JLPTLevel: 2
    },
    {
      kanjiWord: '郵便',
      kanaWord: 'ゆうびん ',
      englishWord: 'Mail, postal service',
      JLPTLevel: 2
    },
    {
      kanjiWord: '郵便局',
      kanaWord: 'ゆうびんきょく ',
      englishWord: 'Post office',
      JLPTLevel: 2
    }
  ],
  kanji: '便',
  kana: 'ベン',
  english: 'Convenient',
  onYomi: 'ベン, ビン',
  kunYomi: 'たよ(り)'
};
