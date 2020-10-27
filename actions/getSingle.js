import * as API from '../utils/api'
export const GET_SINGLE = 'GET_SINGLE'

function getSingle(deck) {
    return {
        type: GET_SINGLE,
        deck
    }
}

export function getSinglePre(title) {
    return (dispatch) => {
        try {
        return Promise.all([
            API.getSingleDeck(title)
        ])
        .then(() => dispatch(getSingle(title)))
        } catch(err) {
            console.log(err)
        }
    }
}