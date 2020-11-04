import {GET_SINGLE} from '../actions/getSingle'

export default function selected (state=null, action) {
    switch(action.type) {
        case GET_SINGLE :
            return action.deck
        default :
            return state
    }
}