import React, { Component } from 'react';
import { Provider } from 'react-redux'
import Immutable from 'seamless-immutable';
import configureStore from '../configureStore'
import App from './app'
import storage from '../libs/storage';

const APP_STORAGE = 'app';
const store = configureStore({ lanes: [] });
store.subscribe(() => {
    if(!storage.get('debug')) {
        storage.set(APP_STORAGE, store.getState().present);
    }
});

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);

