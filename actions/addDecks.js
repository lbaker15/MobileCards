import * as API from '../utils/api'
export const ADD_DECK = 'ADD_DECK'

function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}


export function addDeckPre(toAdd) {
    return (dispatch) => {
        try {
        return Promise.all([
            API.addDeck(toAdd)
        ])
        .then(() => API.getDecks())
        .then((deck) => {
            dispatch(addDeck(deck))
        })
        } catch(err) {
            console.log(err)
        }
    }
}