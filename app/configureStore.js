import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(loggerMiddleware)(createStore);
export default function configureStore(initialState) {
    let store = createStoreWithMiddleware(rootReducer, initialState);
    if(module.hot){
        module.hot.accept('./reducers', () => {
            let nextReducer = require('./reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}
