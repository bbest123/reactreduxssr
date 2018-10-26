export const FETCH_DATA_FULFILLED = 'FETCH_DATA_FULFILLED';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const FETCH_DATA_START = 'FETCH_DATA_START';
export const FETCH_IMAGE_FULFILLED = 'FETCH_IMAGE_FULFILLED';
export const FETCH_IMAGE_ERROR = 'FETCH_IMAGE_ERROR';
export const FETCH_IMAGE_START = 'FETCH_IMAGE_START';

/**
 * This function sets the start fetching for results data
 * @returns {{type: string}}
 */
export function setDataStart() {
    return {
        type: FETCH_DATA_START
    };
}

/**
 * This function sets the error details for the results
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function setDataError(payload) {
    return {
        type: FETCH_DATA_ERROR,
        payload: payload
    };
}
/**
 * This function sets teh results data in reducer
 * @param payload
 * @returns {{type: string, payload: {value: *}}}
 */
export function setResultsData(payload) {
    return {
        type: FETCH_DATA_FULFILLED,
        payload: {
            value: payload
        }
    };
}


/**
 * This function sets the start fetching for results data
 * @returns {{type: string}}
 */
export function setImageStart() {
    return {
        type: FETCH_IMAGE_START
    };
}

/**
 * This function sets the error details for the results
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function setImageError(payload) {
    return {
        type: FETCH_IMAGE_ERROR,
        payload: payload
    };
}
/**
 * This function sets teh results data in reducer
 * @param payload
 * @returns {{type: string, payload: {value: *}}}
 */
export function setImagesData(payload) {
    return {
        type: FETCH_IMAGE_FULFILLED,
        payload: {
            value: payload
        }
    };
}

