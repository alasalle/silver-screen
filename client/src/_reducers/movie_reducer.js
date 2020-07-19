import {
    CREATE_MOVIE
} from '../_actions/types';
 

export default function(state={}, action){
    switch(action.type){
        case CREATE_MOVIE:
            return {...state, status: action.payload }
        default:
            return state;
    }
}