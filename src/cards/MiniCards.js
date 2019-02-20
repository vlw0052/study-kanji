import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

export const MiniCards = ({ answerCards, isAnswered, onCardChosen, nextCard }) => {

    const onNumberPress = () => {

    }
    useEffect(() => {
        document.addEventListener('keypress', onNumberPress)
        return document.removeEventListener('keypress', onNumberPress)
    }, [])

    const onKeyDown = (card, isClick = false) => (event) => {
        if (event.keyCode === 13) {
            if(isAnswered){
                nextCard()
            }else {
                setTimeout(() => {
                    onCardChosen(card)
                }, 100)
            }
        }
        if (isClick) {
            onCardChosen(card)
        }
    }
    return (
        <div className={'cards-group col m6 s12'}>
            {
                answerCards.map((card, i) => (
                    <div className="col s4 ">
                        <div tabIndex={0}
                            key={card.english}
                            nice={card.english}
                            onClick={onKeyDown(card, true)}
                            onKeyDown={onKeyDown(card)}
                            className="mini-card card">
                            {/* <div className="mini-card__number"> { i + 1 } </div> */}
                            <div className="mini-card__kanji"> {isAnswered && card.kanji} </div>
                            <div className="mini-card__word"> {card.english} </div>
                        </div>
                    </div>
                )
                )
            }
        </div>
    )
}
MiniCards.propTypes = {
    onCardChosen: PropTypes.func,
}
export default MiniCards