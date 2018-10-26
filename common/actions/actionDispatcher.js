import Promise from 'bluebird';
import {setDataStart, setDataError, setResultsData} from './actionCreators';
import fetch from 'isomorphic-fetch';

/**
 * Initial load function would be initially called for phone context root
 * @param req
 */
function initialLoad(req) {
    /* returning dispatch to calling function */
    return (dispatch) => {
        return dispatch(dispatchInitialCall());
    }
}

function dispatchInitialCall() {
    return (dispatch) => Promise.all([
        dispatch(loadInitialData())
    ].map(function (promise) {
        return Promise.resolve(promise).reflect();
    }));
}

function loadInitialData() {
    return dispatch => {
        return fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(json => dispatch(setResultsData(json)))
    }
}

module.exports = {initialLoad};
