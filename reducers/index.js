import { combineReducers } from 'redux'
import standard from './standard'
import selected from './selected'

export default combineReducers({
    standard,
    selected,
})