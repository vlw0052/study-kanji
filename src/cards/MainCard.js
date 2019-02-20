import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { getRandomItems } from '../func';
import { CardContext } from '../deckReducer'

export default function MainCard({ currentCard, isAnswered, isCorrectAnswer, onClick }) {
        if(!currentCard) return 'No Card'
        return (
            <div className={`main-card card col m6 s12 ${isAnswered && isCorrectAnswer ? 'correct':''} ${isAnswered ? 'answered':''}`}>
                <a href={`https://jisho.org/search/%23kanji%20${currentCard ? currentCard.kanji : '' }`} target='_blank'>
                <img className="jisho-link" src={'/jisho.png'} title="Link to jisho" >
                </img>
                </a>
                <h2>{currentCard.kanji} {isAnswered ? ':' + currentCard.english:''}</h2>
                {
                    isAnswered && currentCard.examples 
                        && 
                    getRandomItems(currentCard.examples, { numberOfItems: 4 }).map((ex, i)=><div key={`${i}-${ex.englishWord}`}> {ex.kanjiWord} ({ex.kanaWord}) : {ex.englishWord}  </div>)
                }
                { isAnswered && <div onClick={onClick} className="next-button">
                   <i className="small material-icons">
                   arrow_forward
                   </i>
                </div>}
            </div>
        )
}

