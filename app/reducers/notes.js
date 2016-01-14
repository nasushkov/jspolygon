import { createReducer } from 'redux-immutablejs'
import * as ACTIONS from './actions/noteActions';

export default createReducer([], {
    [ACTIONS.CREATE_NOTE]: (state, action) => {
        return state.push(new Map(action.note));
    },

    [ACTIONS.UPDATE_NOTE]: (state, action) => {
        return state.update(state.findIndex(note => note.get('id') === action.id)
            , note => note.set('task', action.task));
    },

    [ACTIONS.DELETE_NOTE]: (state, action) => {
        return state.delete(state.findIndex(note => note.get('id') === action.id));
    }
});
