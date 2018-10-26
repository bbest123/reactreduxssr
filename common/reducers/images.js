import {FETCH_IMAGE_START, FETCH_IMAGE_FULFILLED, FETCH_IMAGE_ERROR} from '../actions/actionCreators';

/**
 * This reducer sets the results data
 * @param state
 * @param action
 * @returns {{data: string}}
 */
export default function results(state = {data: ''}, action) {
    switch (action.type) {
        /* Fetch data for start results */
        case FETCH_IMAGE_START:
            state = {...state, fetching: true, fetched: false, name: action.payload, data: ''};
            break;
        /* Fetch data for results after completion */
        case FETCH_IMAGE_FULFILLED:
            state = {
                ...state, fetched: true,
                fetching: false, data: action.payload.value
            };
            break;
        /* Fetch data for results error */
        case FETCH_IMAGE_ERROR:
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
