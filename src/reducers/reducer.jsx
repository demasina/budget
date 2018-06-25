import { combineReducers } from 'redux';
import {ADD_NAME} from '../actions/action'

var nameList=['Afonya', 'Sabrina']

function names(state = nameList, action) {
    switch (action.type) {
        case ADD_NAME:
        return 
            [...state,
            {text: action.text}]

        default:
        return state;
    }
}

const reducer = combineReducers({names})

export default reducer;