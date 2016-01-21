import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import configureStore from '../app/configureStore';

describe('store', () => {
    it('is the redux store configured with reducers', ()=> {
        const store = configureStore();
        expect(store).to.exist;
        const state = store.getState();
        expect(state).to.exist;
    });
    it('implements undo/redo functionality', () => {
        const store = configureStore();
        const state = store.getState();
        expect(state.present).to.exist;
        expect(state.future).to.exist;
        expect(state.past).to.exist;
    });
    it('returns correct initial state', () => {
        const store = configureStore();
        const state = store.getState();
        expect(state.present).to.equal(fromJS({lanes:[], notes:[]}));
    });
});



