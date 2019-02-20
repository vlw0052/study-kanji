import React from 'react'
import { getRandomItems } from '../func';

export default function MainCard({ currentCard, isAnswered, isCorrectAnswer, onClick }) {
        if(!currentCard) return 'No Card'
        return (
            <div className={`main-card card col m6 s12 ${isAnswered && isCorrectAnswer ? 'correct':''} ${isAnswered ? 'answered':''}`}>
                <a href={`https://jisho.org/search/%23kanji%20${currentCard ? currentCard.kanji : '' }`} target='_blank' rel="noopener noreferrer">
                <img className="jisho-link" src={'/jisho.png'} alt="Link to jisho" >
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

