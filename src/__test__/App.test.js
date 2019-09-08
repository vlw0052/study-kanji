import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('allows user to select a level', async () => {
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
    return Promise.resolve({
      json: () => Promise.resolve(fakeDeckResponse())
    });
  });

  const { getByText, debug, getByTitle, findByText } = render(<App />);

  fireEvent.click(getByText(/hiragana/i));

  expect(getByText(/select.*group/i)).not.toBeNull();

  fireEvent.click(getByTitle(/7 group 1/i));

  expect(await findByText(/^correct.*0/i)).not.toBeNull();
});

function fakeDeckResponse() {
  return {
    JLPTLevel: 5,
    group: 1,
    matchCards: [
      {
        examples: [
          {
            kanjiWord: '一つ',
            kanaWord: 'ひとつ ',
            englishWord: 'One thing',
            JLPTLevel: 5
          },
          {
            kanjiWord: '一人',
            kanaWord: 'ひとり ',
            englishWord: 'One person, alone',
            JLPTLevel: 5
          },
          {
            kanjiWord: '一日',
            kanaWord: 'ついたち ',
            englishWord: 'First day of the month',
            JLPTLevel: 5
          },
          {
            kanjiWord: '一生',
            kanaWord: 'いっしょう ',
            englishWord: 'Whole life, a lifetime',
            JLPTLevel: 5
          },
          {
            kanjiWord: '万一',
            kanaWord: 'まんいち ',
            englishWord: 'By some chance',
            JLPTLevel: 5
          },
          {
            kanjiWord: '一時',
            kanaWord: 'いちじ ',
            englishWord: "One o'clock",
            JLPTLevel: 5
          },
          {
            kanjiWord: '一言',
            kanaWord: 'ひとこと ',
            englishWord: 'Single word',
            JLPTLevel: 5
          },
          {
            kanjiWord: '一方',
            kanaWord: 'いっぽう ',
            englishWord: 'One (esp. of two), the other',
            JLPTLevel: 4
          },
          {
            kanjiWord: '同一',
            kanaWord: 'どういつ ',
            englishWord: 'Identity, sameness',
            JLPTLevel: 4
          },
          {
            kanjiWord: '一体',
            kanaWord: 'いったい ',
            englishWord: 'What the hell?',
            JLPTLevel: 4
          },
          {
            kanjiWord: '一周',
            kanaWord: 'いっしゅう ',
            englishWord: 'Once around, a revolution',
            JLPTLevel: 3
          },
          {
            kanjiWord: '一定',
            kanaWord: 'いってい ',
            englishWord: 'Fixed, settled, constant',
            JLPTLevel: 3
          },
          {
            kanjiWord: '一面',
            kanaWord: 'いちめん ',
            englishWord: 'One face, one surface',
            JLPTLevel: 3
          },
          {
            kanjiWord: '一昨日',
            kanaWord: 'おととい ',
            englishWord: 'Day before yesterday',
            JLPTLevel: 3
          },
          {
            kanjiWord: '一昨年',
            kanaWord: 'おととし ',
            englishWord: 'Year before last',
            JLPTLevel: 3
          },
          {
            kanjiWord: '一部',
            kanaWord: 'いちぶ ',
            englishWord: 'One part, one portion',
            JLPTLevel: 3
          },
          {
            kanjiWord: '第一',
            kanaWord: 'だいいち ',
            englishWord: 'First, foremost, number one',
            JLPTLevel: 3
          },
          {
            kanjiWord: '一番',
            kanaWord: 'いちばん ',
            englishWord: 'Best, first, number one',
            JLPTLevel: 3
          },
          {
            kanjiWord: '一種',
            kanaWord: 'いっしゅ ',
            englishWord: 'Species, kind, variety',
            JLPTLevel: 3
          },
          {
            kanjiWord: '一様',
            kanaWord: 'いちよう ',
            englishWord: 'Uniformity, evenness',
            JLPTLevel: 3
          },
          {
            kanjiWord: '一般',
            kanaWord: 'いっぱん ',
            englishWord: 'General, liberal, universal',
            JLPTLevel: 2
          },
          {
            kanjiWord: '一緒',
            kanaWord: 'いっしょ ',
            englishWord: 'Together, at the same time',
            JLPTLevel: 2
          },
          {
            kanjiWord: '択一',
            kanaWord: 'たくいつ',
            englishWord: 'Choosing an alternative',
            JLPTLevel: 1
          },
          {
            kanjiWord: '逐一',
            kanaWord: 'ちくいち',
            englishWord: 'One by one, in detail, minutely',
            JLPTLevel: 1
          },
          {
            kanjiWord: '一致',
            kanaWord: 'いっち ',
            englishWord: 'Coincidence, agreement',
            JLPTLevel: 1
          },
          {
            kanjiWord: '唯一',
            kanaWord: 'ゆいいつ ',
            englishWord: 'Only, sole, unique',
            JLPTLevel: 1
          },
          {
            kanjiWord: '統一',
            kanaWord: 'とういつ ',
            englishWord: 'Unity, consolidation',
            JLPTLevel: 1
          },
          {
            kanjiWord: '一瞬',
            kanaWord: 'いっしゅん ',
            englishWord: 'Moment, instant',
            JLPTLevel: 1
          },
          {
            kanjiWord: '一生懸命',
            kanaWord: 'いっしょうけんめい ',
            englishWord: 'Very hard, with utmost effort',
            JLPTLevel: 1
          }
        ],
        kanji: '一',
        kana: 'イチ',
        english: 'One',
        onYomi: 'イチ, イツ',
        kunYomi: 'ひと, ひと(つ)'
      },
      {
        examples: [
          {
            kanjiWord: '二つ',
            kanaWord: 'ふたつ ',
            englishWord: 'Two things',
            JLPTLevel: 5
          },
          {
            kanjiWord: '二十日',
            kanaWord: 'はつか ',
            englishWord: 'Twenty days',
            JLPTLevel: 5
          },
          {
            kanjiWord: '二日',
            kanaWord: 'ふつか ',
            englishWord: 'Two days',
            JLPTLevel: 5
          },
          {
            kanjiWord: '二階',
            kanaWord: 'にかい ',
            englishWord: 'Second floor, upstairs',
            JLPTLevel: 3
          },
          {
            kanjiWord: '二十歳',
            kanaWord: 'はたち ',
            englishWord: '20 years old',
            JLPTLevel: 2
          }
        ],
        kanji: '二',
        kana: 'ニ',
        english: 'Two',
        onYomi: 'ニ, ジ',
        kunYomi: 'ふた, ふた(つ), ふたた(び)'
      }
    ]
  };
}
