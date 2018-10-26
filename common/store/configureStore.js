import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import promise from 'redux-promise';
export default function configureStore(initialState, reduxRouterMiddleware) {
    let store;
    const createStoreWithMiddleware = applyMiddleware(
        thunk, promise,
        reduxRouterMiddleware
    )(createStore);
    const isProduction = process.env.NODE_ENV === 'production';
    if (!isProduction) {
        store = createStoreWithMiddleware(rootReducer, initialState, compose(DevTools.instrument()));
    }
    else {
        store = createStoreWithMiddleware(rootReducer, initialState, compose());
    }
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer)
        })
    }
    return store;
}

