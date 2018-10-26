import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

@connect(
    state => ({
        results: state.results
    })
)

export default class Phones extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className="id">{this.props.results.data.userId}</div>
                <div className="title">{this.props.results.data.title}</div>
                <header>
                    <nav>
                        <ul>
                            <li><Link to='images'>View images</Link></li>
                        </ul>
                    </nav>
                </header>
            </div>
        );
    }
}