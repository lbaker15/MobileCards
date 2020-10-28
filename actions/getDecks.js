import * as API from '../utils/api'
export const GET_DECKS = 'GET_DECKS'

function getDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}

export function getDecksPre() {
    return async function (dispatch) {
        try {
        const decks = await API.getDecks()
        dispatch(getDecks(decks))
        } catch(err) {
            console.log(err)
        }
    }
}