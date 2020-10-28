import {GET_SINGLE} from '../actions/getSingle'
import {ADD_CARD} from '../actions/addCard'


export default function selected (state=null, action) {
    switch(action.type) {
        case GET_SINGLE :
            return action.deck
        default :
            return state
    }
}