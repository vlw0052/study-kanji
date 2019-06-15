import axios from 'axios';
import fs from 'fs';
import _ from 'lodash';

async function doRequest(level) {
  const url = 'http://studykanji.net/kanjiquiz/getdeck';
  const body = {
    level
  };
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const { data } = await axios.post(url, body, config);
  return data;
}

function transformDecks(decks) {
  return decks.map(deck => ({
    JLPTLevel: deck.JLPTLevel,
    group: deck.Group,
    matchCards: deck.MatchCards.map(transformCard)
  }));
}
function transformCard(card) {
  return {
    examples: card.Examples.map(transformExample),
    kanji: card.Kanji,
    kana: card.Kana,
    english: card.English,
    onYomi: card.OnYomi,
    kunYomi: card.KunYomi
  };
}
function transformExample(example) {
  return {
    kanjiWord: example.KanjiWord,
    kanaWord: example.KanaWord,
    englishWord: example.EnglishWord,
    JLPTLevel: example.JLPTLevel
  };
}
function loopThroughDecks() {
  let allDeckPromises = [];
  for (let level = 7; level >= 1; level--) {
    for (let group = 1; group <= 20; group++) {
      allDeckPromises.push(doRequest(`${level}-${group}`));
    }
  }
  return Promise.all(allDeckPromises);
}

const pipe = (...fns) => d =>
  fns
    .reverse()
    .splice(1)
    .reduce((cum, fn) => fn(cum), fns[fns.length - 1](d));
/*
loopThroughDecks().then(decks => {
  pipe(
    saveDecks,
    transformDecks,
    filterDecks
  )(decks);
});
*/
function filterDecks(decks) {
  return decks.filter(deck => !!deck.MatchCards.length);
}
function saveDecks(decks) {
  return decks.map(deck => {
    console.log(deck);
    console.log('*****************DONE');
    fs.writeFile(`decks/JLPT${deck.JLPTLevel}-${deck.group}.json`, JSON.stringify(deck), (err, d) => {});
    return `JLPT${deck.JLPTLevel}-${deck.group}`;
  });
}
