import * as API from '../utils/api'
export const ADD_CARD = 'ADD_CARD'

function addCard(question, title) {
    return {
        type: ADD_CARD,
        question, title
    }
}

export function addCardPre(question,title) {
    return (dispatch) => {
        try {
        return Promise.all([
            API.submitCard(question,title)
        ])
        .then(() => dispatch(addCard(question, title)))
        } catch(err) {
            console.log(err)
        }
    }
}