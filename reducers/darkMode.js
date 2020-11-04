import {DARK_MODE} from '../actions/darkMode'


export default function darkMode (state=true, action) {
    switch(action.type) {
        case DARK_MODE :
            return action.status
        default :
            return state
    }
}
