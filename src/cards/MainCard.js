import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getRandomItems } from '../func';

export default function MainCard(props) {
        const { card } = props
        return (
            <div>
                <h2 onClick={props.onClick}>{card.kanji} : {card.english}</h2>
                {
                    card.examples 
                        && 
                    getRandomItems(card.examples, { numberOfItems: 4 }).map((ex, i)=><div key={`${i}-${ex.englishWord}`}> {ex.kanjiWord} ({ex.kanaWord}) : {ex.englishWord}  </div>)
                }
            </div>
        )
}

