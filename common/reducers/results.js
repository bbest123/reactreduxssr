import {FETCH_DATA_START, FETCH_DATA_FULFILLED, FETCH_DATA_ERROR} from '../actions/actionCreators';

/**
 * This reducer sets the results data
 * @param state
 * @param action
 * @returns {{data: string}}
 */
export default function results(state = {data: ''}, action) {
    switch (action.type) {
        /* Fetch data for start results */
        case FETCH_DATA_START:
            state = {...state, fetching: true, fetched: false, name: action.payload, data: ''};
            break;
        /* Fetch data for results after completion */
        case FETCH_DATA_FULFILLED:
            state = {
                ...state, fetched: true,
                fetching: false, data: action.payload.value
            };
            break;
        /* Fetch data for results error */
        case FETCH_DATA_ERROR:
            state = {
                ...state, fetched: false,
                fetching: false, data: action.payload.value
            };
            break;
        default:
            /* Return default state */
            return state;
    }
    return state;
}
