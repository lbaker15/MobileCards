import {GET_DECKS} from '../actions/getDecks'

const getData = (store) => (next) => (action) => {
    return next(action)
}

export default getData