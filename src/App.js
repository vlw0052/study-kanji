import React, { Component, Fragment } from 'react';
import './App.css';
import data from './cards/data.json'
import MainCard from './cards/MainCard';
import { createNewStartDeck, chooseRandomCard, getRandomItems, shuffle, areCardsEqual, getPercentage, moveCardTo } from './func';
import MiniCards from './cards/MiniCards';
class App extends Component {
  constructor(){
    super()
    this.state = {
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
  }
  componentWillMount(){
    this.setDeck(data)
    document.addEventListener('keypress', this.onKeyPress)
  }
  onKeyPress = (event) => {
    const { isAnswered, answerCards } = this.state
    if(event.keyCode === 13 && isAnswered){
      event.preventDefault()
      this.nextCard()
    }else {
      const num = +event.key
      if(!isNaN(num) && num > 0){

        this.onCardChosen(answerCards[num - 1])
      }

    }
  }

  setDeck = (deck) => {
    const startDeck = createNewStartDeck(deck)
    const currentCard = chooseRandomCard(deck.matchCards)
    this.setState({ deck: startDeck, currentCard, answerCards: this.getNewAnswerCards(startDeck, currentCard)  })
  }

  getNewAnswerCards = (deck, currentCard) => {
    return shuffle([ ...getRandomItems([...deck.unAnswered, ...deck.inCorrect, ...deck.correct], { fnException: (card)=> { return !areCardsEqual(card, currentCard) } }), currentCard])
  }

  nextCard = () => {
    const { isCorrectAnswer, deck, currentCard, isAnswered } = this.state
    if(!isAnswered)
      return 
    this.setAnswered(false)
    const newDeck = moveCardTo(isCorrectAnswer)(deck, currentCard)
    const newCurrentCard = chooseRandomCard([...newDeck.unAnswered, ...newDeck.inCorrect]) 
    if(newCurrentCard){
      this.setState({ deck: newDeck, currentCard: newCurrentCard, answerCards: this.getNewAnswerCards(newDeck, newCurrentCard)  })
    } else {
      this.showScore(true)
    }
  }

  showScore(showScore = true){
    this.setState({ showScore })
  }
  
  setCorrectState = (isCorrectAnswer = false) => {
    this.setState({ isCorrectAnswer })
  }

  setAnswered = (isAnswered = false) => {
    this.setState({ isAnswered })
  }

  updateScore = (isCorrect = true) => {
    const { score } = this.state
    const newScore = {
      correct: isCorrect ? score.correct + 1 : score.correct,
      total: score.total + 1 
    }
    this.setState({ score: newScore })
  }

  onCardChosen = (card) => {
    const { currentCard, isAnswered } = this.state    
    if(isAnswered)
      return 
    if(currentCard.kanji === card.kanji){
      this.setCorrectState(true)
      this.updateScore(true)
    } else {
      this.setCorrectState(false)
      this.updateScore(false)
    }
    this.setAnswered(true)
  }

  setAnswerCards = () => {
    const answerCards = this.getNewAnswerCards()
    this.setState({ answerCards })
  }

  render() {
    const { currentCard, score, answerCards, isAnswered } = this.state
    return (
      <div className="App">
        {
          this.state.showScore ?
            <h1>Your score { getPercentage(score.correct, score.total) }  </h1> :
          <Fragment>
            <h3>{score.correct} / {score.total} : { getPercentage(score.correct, score.total) } </h3>
            <MainCard card={ currentCard } onClick={this.nextCard} />
            <div>
              <MiniCards cards={ answerCards } onCardChosen={this.onCardChosen} isAnswered={isAnswered} />
            </div>
          </Fragment> 
        }
      </div>
    );
  }
}

export default App;
