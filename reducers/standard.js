import {GET_DECKS} from '../actions/getDecks'
import {ADD_DECK} from '../actions/addDecks'
import {ADD_CARD} from '../actions/addCard'
import {DELETE} from '../actions/deleteDeck'

export default function standard (state=[], action) {
    switch(action.type) {
        case GET_DECKS :
            console.log("reducer fired", state, action)
            return state.concat(action.decks)
        case ADD_DECK :
            const newArray = [action.deck]
            return newArray
        case DELETE :
            const next = { ...state[0] }
            delete next[action.deck]
            return [next]
        case ADD_CARD :      
            const theDeck = state[0][action.title]
            const toPush = action.question
            theDeck.questions.push(toPush)
            const obj = {
                ...state[0],
                [action.title]: {
                    "title": action.title,
                    "questions": theDeck.questions
                }
            }
            return [obj]
        default :
            return state
    }
}