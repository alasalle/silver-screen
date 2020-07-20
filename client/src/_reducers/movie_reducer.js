import {
    ADD_MOVIE
} from '../_actions/types';
 

export default function(state={}, action){
    switch(action.type){
        case ADD_MOVIE:
            return {...state, status: action.payload }
        default:
            return state;
    }
}