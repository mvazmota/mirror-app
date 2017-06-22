'use strict';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as allReducers from '../reducers/reducers';
import thunk from 'redux-thunk';

// Combine Reducers
const reducers = combineReducers(allReducers);

export default function Store(initialState) {
    const store =  createStore(
        reducers,
        initialState,
        applyMiddleware(thunk)
    );

    // if (module.hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('../reducers/reducers', () => {
    //         const reducers = combineReducers(allReducers);
    //         store.replaceReducer(reducers);
    //     });
    // }

    return store;
}