import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import results from './results';
import images from './images';

/**
 * Combine all the reducers
 * @type {Function}
 */
const rootReducer = combineReducers({
    routing: routeReducer,
    images,
    results
});
export default rootReducer;
