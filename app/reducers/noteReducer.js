import createReducer from '../seamlessImmutableHelpers/createReducer';
import * as ACTIONS from '../actions/noteActions';
import Immutable from 'seamless-immutable';

export default createReducer([], {
    [ACTIONS.CREATE_NOTE]: (state, action) => {
        return state.concat(Immutable(action.note));
    },

    [ACTIONS.UPDATE_NOTE]: (state, action) => {
        return state.map(note => {
            if(note.id == action.id){
                return note.set('task', action.task);
            }
            return note;
        });
    },

    [ACTIONS.DELETE_NOTE]: (state, action) => {
        return state.filter(note => note.id !== action.id);
    }
});
