import React from 'react';
import {connect} from 'react-redux';
import {fetchImageData} from '../actions/clientDispatcher'
@connect(
    state => ({
        images: state.images
    })
)

export default class Prepaid extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.dispatch(fetchImageData(1));
    }

    loadData() {
        this.props.dispatch(fetchImageData(2));
    }

    render() {
        return (
            <div>
                {(this.props.images.data.url !== "undefined") ? <img src={this.props.images.data.url}></img> : ""}
                <button type="button" onClick={(event) => {
                    this.loadData(), event.stopPropagation();
                }}>Reload different image
                </button>
            </div>
        );
    }
}