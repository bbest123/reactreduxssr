import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter, matchPath} from 'react-router-dom';
import Routes from '../common/routes';
import {Provider} from 'react-redux';
import createHistory from 'history/createMemoryHistory';
import {syncHistory} from 'redux-simple-router';
import configureStore from '../common/store/configureStore';
import express from 'express';
import serialize from 'serialize-javascript';
import {initialLoad} from '../common/actions/actionDispatcher';

const router = express.Router();
//Sample Middle ware
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('*index*|*images*', function (req, res, next) {
    const staticContext = {};
    const history = createHistory();
    const reduxRouterMiddleware = syncHistory(history);
    // Create a new Redux store instance
    const store = configureStore({}, reduxRouterMiddleware);
    store.dispatch(initialLoad(req)).then(() => {
        const component = (<Provider store={store}>
            <StaticRouter location={req.url} context={staticContext}>
                <Routes />
            </StaticRouter>
        </Provider>);
        const html = renderToString(component);
        let initialState = store.getState();
        initialState = serialize(initialState, {isJSON: true});
        if (!res.headersSent) {
            res.status(200).render('view', {
                html: html,
                initialState: initialState
            });
        }
    });
});


module.exports = router;