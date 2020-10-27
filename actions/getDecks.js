import * as API from '../utils/api'
export const GET_DECKS = 'GET_DECKS'

function getDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}

export function getDecksPre() {
    return (dispatch) => {
        try {
        return Promise.all([
            API.getDecks()
        ])
        .then(decks => dispatch(getDecks(decks)))
        } catch(err) {
            console.log(err)
        }
    }
}