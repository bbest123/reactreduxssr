import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import history from '../common/history';
import debug from 'debug';
import configureStore from '../common/store/configureStore';
import {syncHistory} from 'redux-simple-router';
import {Router} from 'react-router-dom';
import Routes from '../common/routes';

const clientDebug = debug('app:client');
const rootElement = document.getElementById('app');
window.React = React; // For chrome dev tool support

const reduxRouterMiddleware = syncHistory(history);
const store = configureStore(window.__INITIAL_STATE__, reduxRouterMiddleware);
clientDebug('rehydrating app');
const isProduction = process.env.NODE_ENV === 'production';
console.log("Prod ***",isProduction)
ReactDOM.render(
    <Provider store={ store }>
        <Router history={history}>
            <Routes />
        </Router>
    </Provider>,
    rootElement
);

let component = (
    <Provider store={ store }>
        <Router history={history}>
            <Routes />
        </Router>
    </Provider>);


if (!isProduction) {
    const DevTools = require('../common/containers/DevTools').default;
    ReactDOM.render(
        <Provider store={store} key="provider">
            <div>
                {component}
                <DevTools />
            </div>
        </Provider>,
        rootElement
    );
}
