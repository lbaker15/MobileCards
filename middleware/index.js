import thunk from 'redux-thunk'
import {applyMiddleware} from 'redux'
import getData from './get'

export default applyMiddleware(
    thunk,
    getData,
)