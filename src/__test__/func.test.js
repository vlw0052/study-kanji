import { createNewStartDeck } from '../func'
import deck from './data.json'

describe.only('create a new deck', ()=>{
    const setup = ()=>{
        return {
            newDeck: createNewStartDeck(deck)
        }
    }
    it('should create a new deck with 45 in unanswered array', ()=>{
        const { newDeck } = setup()
        expect(newDeck.unanswered).toHaveLength(45)
    })
    it('should create a with the new deck with JLPT level 4', ()=>{
        const { newDeck } = setup()
        expect(newDeck.JLPTLevel).toEqual(4)
    })
    it('should create a with the new deck with deck group 3', ()=>{
        const { newDeck } = setup()
        expect(newDeck.group).toEqual(3)
    })
})

describe('update a deck', ()=>{
    // it('should move move ')
})