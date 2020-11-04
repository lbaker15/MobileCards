import { combineReducers } from 'redux'
import standard from './standard'
import selected from './selected'
import darkMode from './darkMode'

export default combineReducers({
    standard,
    selected,
    darkMode,
})