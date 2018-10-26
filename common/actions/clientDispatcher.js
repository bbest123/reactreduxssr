import {setImagesData} from './actionCreators';

function fetchImageData(val) {
    return (dispatch) => {
        return fetch('https://jsonplaceholder.typicode.com/photos/' + val)
            .then(response => response.json())
            .then(json => dispatch(setImagesData(json)))
    }
}

module.exports = {fetchImageData}