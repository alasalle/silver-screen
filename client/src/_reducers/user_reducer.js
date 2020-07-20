import {
  REGISTER_USER
} from '../_actions/types';


export default function(state={}, action){
  switch(action.type){
      case REGISTER_USER:
          return {...state, status: action.payload }
      default:
          return state;
  }
}