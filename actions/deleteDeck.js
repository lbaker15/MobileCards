import * as API from '../utils/api'
export const DELETE = "DELETE"

function deleteDeck (deck) {
    return {
        type: DELETE,
        deck
    }
}

export function deleteDeckPre ( title ) {
    return (dispatch) => {
        return Promise.all([
            API.deleteDeck(title)
        ])
        .then(() => dispatch(deleteDeck(title)))
    }
}