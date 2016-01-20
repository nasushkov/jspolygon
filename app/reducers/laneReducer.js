import { createReducer } from 'redux-immutablejs'
import * as ACTIONS from '../actions/laneActions';
import { List, Map, fromJS } from 'immutable';

export default createReducer([], {
    [ACTIONS.CREATE_LANE]: (state, action) => {
        return state.push(fromJS(action.lane))
    },

    [ACTIONS.UPDATE_LANE]: (state, action) => {
        return state.update(state.findIndex(lane => lane.get('id') === action.id)
            , lane => lane.set('name', action.name));
    },

    [ACTIONS.DELETE_LANE]: (state, action) => {
        return state.delete(state.findIndex(lane => lane.get('id') === action.id));
    },

    [ACTIONS.ATTACH_TO_LANE]: (state, action) => {
        return state.updateIn(['notes'], new List(), notes => {
            let index = notes.indexOf(action.noteId);
            if (index >= 0) {
                return notes.delete(index);
            }
            return notes;
        }).update(state.findIndex(lane => lane.get('id') === action.laneId), lane => {
            return lane.updateIn(['notes'], notes => notes.push(action.noteId));
        });
    },

    [ACTIONS.DETACH_FROM_LANE]: (state, action) => {
        return state.update(state.findIndex(lane => lane.get('id') === action.laneId), lane => {
            return lane.updateIn(['notes'], notes => notes.delete(action.noteId));
        });
    },

    [ACTIONS.MOVE]: (state, action) => {

        const sourceId = action.sourceId;
        const targetId = action.targetId;

        const lanes = state;
        const sourceLaneIndex = lanes.findIndex(lane => {
            return lane.get('notes').indexOf(sourceId) >= 0;
        });
        const sourceLane = lanes.get(sourceLaneIndex);
        const targetLaneIndex = lanes.findIndex((lane) => {
            return lane.get('notes').indexOf(targetId) >= 0;
        });
        const targetLane = lanes.get(targetLaneIndex);
        const sourceNoteIndex = sourceLane.get('notes').indexOf(sourceId);
        const targetNoteIndex = targetLane.get('notes').indexOf(targetId);

        if (sourceLane === targetLane) {
            if (sourceNoteIndex === targetNoteIndex) {
                return state;
            }
            return state.update(state.indexOf(sourceLane), lane => {
                return lane.updateIn(['notes'], new List(), notes => {
                    const delResult = notes.delete(sourceNoteIndex);
                    return delResult.take(targetNoteIndex)
                        .push(action.sourceId)
                        .concat(delResult.skip(targetNoteIndex));
                });
            });
        }
        return state.update(sourceLaneIndex, lane => {
            return lane.updateIn(['notes'], new List(), notes => notes.delete(sourceNoteIndex));
        }).update(targetLaneIndex, lane => {
            return lane.updateIn(['notes'], new List(), notes => notes.push(sourceId));
        });
    }
});
