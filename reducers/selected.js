import {GET_SINGLE} from '../actions/getSingle'
import {ADD_CARD} from '../actions/addCard'


export default function selected (state=null, action) {
    switch(action.type) {
        case GET_SINGLE :
            return action.deck
        case ADD_CARD :
            console.log(state)
            //const newState = state[0][action.title.title].questions.concat(action.question)
            //Object.assign([], state, newState)
            //const newQues = state.selected.questions.concat(action.question)
            //Object.assign(state.selected.questions, newQues)
            return state
        default :
            return state
    }
}