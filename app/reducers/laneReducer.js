import createReducer from '../seamlessImmutableHelpers/createReducer';
import * as ACTIONS from '../actions/laneActions';
import Immutable from 'seamless-immutable';

export default createReducer([], {
    [ACTIONS.CREATE_LANE]: (state, action) => {
        return state.concat(Immutable(action.lane));
    },

    [ACTIONS.UPDATE_LANE]: (state, action) => {
        return state.map(lane => {
            if(lane.id === action.id){
                return lane.set('name', action.name);
            }
            return lane;
        });
    },

    [ACTIONS.DELETE_LANE]: (state, action) => {
        return state.filter(lane => lane.id !== action.id);
    },

    [ACTIONS.ATTACH_TO_LANE]: (state, action) => {
        return state.map(lane => {
            let index = lane.notes.indexOf(action.noteId);
            if(index > -1){
                return lane.set('notes', lane.notes.filter(note => note !== action.noteId));
            }
            if(lane.id == action.laneId){
                return lane.set('notes', lane.notes.concat(action.noteId));
            }
            return lane;
        })
    },

    [ACTIONS.DETACH_FROM_LANE]: (state, action) => {
        return state.map(lane => {
            if (lane.id == action.laneId) {
                return lane.set('notes', lane.notes.filter(note => note !== action.noteId));
            }
            return lane;
        });
    },

    [ACTIONS.MOVE]: (state, action) => {
        const sourceId = action.sourceId;
        const targetId = action.targetId;

        return state.map(lane => {
            if(lane.notes.indexOf(sourceId) > -1){
                lane = lane.set('notes', lane.notes.filter(note => note !== sourceId));
            }
            if(lane.notes.indexOf(targetId) > -1){
                let mutNotes = lane.notes.asMutable();
                mutNotes.splice(lane.notes.indexOf(targetId), 0, sourceId);
                lane = lane.set('notes', Immutable(mutNotes));
            }
            return lane;
        });
    }
});
