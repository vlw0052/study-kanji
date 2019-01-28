import React from 'react';
import { shallow } from 'enzyme'
import MainCard from '../MainCard';

var kanji;

const setup = overrideProps => {
  const props = Object.assign({
    card: kanji
  }, )
  const wrapper = shallow(<MainCard { ...props } />)
  return {
    wrapper
  }
}

describe('Card', ()=>{

  it('should render', ()=>{
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })
})


kanji = {
  "examples": [
      {
          "kanjiWord": "船便",
          "kanaWord": "ふなびん ",
          "englishWord": "Surface mail (ship)",
          "JLPTLevel": 3
      },
      {
          "kanjiWord": "宅配便",
          "kanaWord": "たくはいびん ",
          "englishWord": "Express home delivery",
          "JLPTLevel": 2
      },
      {
          "kanjiWord": "郵便",
          "kanaWord": "ゆうびん ",
          "englishWord": "Mail, postal service",
          "JLPTLevel": 2
      },
      {
          "kanjiWord": "郵便局",
          "kanaWord": "ゆうびんきょく ",
          "englishWord": "Post office",
          "JLPTLevel": 2
      }
  ],
  "kanji": "便",
  "kana": "ベン",
  "english": "Convenient",
  "onYomi": "ベン, ビン",
  "kunYomi": "たよ(り)"
}