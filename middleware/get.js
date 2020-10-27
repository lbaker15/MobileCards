import {GET_DECKS} from '../actions/getDecks'

const getData = (store) => (next) => (action) => {
    if (action.type === GET_DECKS) {
        console.log("Decks", action.decks)
    }
    return next(action)
}

export default getData