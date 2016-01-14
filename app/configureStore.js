import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { combineReducers } from 'redux-immutablejs';
import * as reducers from './reducers';

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(loggerMiddleware)(createStore);
const rootReducer = combineReducers(reducers);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);
    if(module.hot){
        module.hot.accept('./reducers', () => {
            let nextReducer = require('./reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}
