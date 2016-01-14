import { createReducer } from 'redux-immutablejs'
import * as ACTIONS from './actions/laneActions';
import { List } from 'immutable';

export default createReducer([], {
    [ACTIONS.CREATE_LANE]: (state, action) => {
        return state.push(new Map(action.lane))
    },

    [ACTIONS.UPDATE_LANE]: (state, action) => {
        return state.update(state.findIndex(lane => lane.get('id') === action.id)
            , lane => lane.set('name', action.name));
    },

    [ACTIONS.DELETE_LANE]: (state, action) => {
        return state.delete(state.findIndex(lane => lane.get('id') === action.id));
    },

    [ACTIONS.ATTACH_TO_LANE]: (state, action) => {
        return state.updateIn(['notes'], notes => {
            let index = notes.indexOf(action.noteId);
            if (index >= 0) {
                return notes.delete(index);
            }
        }).update(state.findIndex(lane => lane.get('id') === action.laneId), lane => {
            return lane.updateIn(['notes'], notes => notes.push(action.noteId));
        });
    },

    [ACTIONS.DETACH_FROM_LANE]: (state, action) => {
        return state.update(state.findIndex(lane => lane.get('id') === action.laneId), lane => {
            return lane.update(['notes'], notes => notes.delete(action.noteId));
        });
    },

    [ACTIONS.MOVE]: (state, action) => {
        const sourceId = action.sourceId;
        const targetId = action.targetId;

        const lanes = state;
        const sourceLane = lanes.find((lane) => {
            return lane.get('notes').indexOf(sourceId) >= 0;
        })[0];
        const targetLane = lanes.find((lane) => {
            return lane.get('notes').indexOf(targetId) >= 0;
        })[0];
        const sourceNoteIndex = sourceLane.get('notes').indexOf(sourceId);
        const targetNoteIndex = targetLane.get('notes').indexOf(targetId);

        if (sourceLane === targetLane) {
            return state.map((lane) => {
                return lane.id === sourceLane.id ? Object.assign({}, lane, {
                    notes: update(sourceLane.notes, {
                        $splice: [
                            [sourceNoteIndex, 1],
                            [targetNoteIndex, 0, sourceId]
                        ]
                    })
                }) : lane;
            });
        }
        else {
            // get rid of the source
            sourceLane.updateIn(['notes'], notes => notes.delete(sourceNoteIndex));

            // and move it to target
            targetLane.updateIn(['notes'], notes => notes.push(sourceId));
        }

        return state;
    }
});