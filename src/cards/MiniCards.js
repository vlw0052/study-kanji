import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MiniCards extends Component {
    static propTypes = {
        cards: PropTypes.array,
        isAnswered: PropTypes.bool
    }
    static defaultProps = {
        isAnswered: false
    }
    componentWillMount(){
        document.addEventListener('keypress', this.onNumberPress)
    }
    onKeyDown = (card, isClick = false) => (event) => {
        if(event.keyCode === 13){
            setTimeout(()=>{
                this.props.onCardChosen(card)   
            }, 100)
        }
        if(isClick){
            this.props.onCardChosen(card)   
        }
    }

    render() {
        const { cards, isAnswered } = this.props
        return (
            <div className={'cards-group'}>
                {
                    cards.map((card, i) => (
                        <div tabIndex={i+1} key={ card.english } onClick={this.onKeyDown(card, true)} onKeyDown={this.onKeyDown(card)} className="mini-card">
                            <div className="mini-card__number"> { i + 1 } </div>
                            <div className="mini-card__kanji"> { isAnswered && card.kanji } </div>
                            <div className="mini-card__word"> { card.english } </div>
                        </div>
                        ) 
                    )
                }
            </div>
        )
    }
}
