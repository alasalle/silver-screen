import { combineReducers } from 'redux';
// import movies from './movie_reducer';
import users from './user_reducer';

const rootReducer = combineReducers({
    // movies,
    users
});

export default rootReducer;