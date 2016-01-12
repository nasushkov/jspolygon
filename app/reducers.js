import { combineReducers } from 'redux';
import update from 'react/lib/update';
import * as laneActions from './actions/laneActions';
import * as noteActions from './actions/noteActions';
import undoable, { distinctState } from 'redux-undo'
import { List, Map } from 'immutable';

function notes(state = new List(), action) {
    switch (action.type) {
        case noteActions.CREATE_NOTE:
        {
            return state.push(new Map(action.note));
        }
        case noteActions.UPDATE_NOTE:
        {
            return state.update(state.findIndex(note => note.get('id') === action.id)
                , note => note.set('task', action.task));
        }
        case noteActions.DELETE_NOTE:
        {
            return state.delete(state.findIndex(note => note.get('id') === action.id));
        }
        default:
        {
            return state;
        }
    }
}

function lanes(state = new List(), action) {
    switch (action.type) {
        case laneActions.CREATE_LANE:
        {
            return state.push(new Map(action.lane));
        }
        case laneActions.UPDATE_LANE:
        {
            return state.update(state.findIndex(lane => lane.get('id') === action.id)
                , lane => lane.set('name', action.name));
        }
        case laneActions.DELETE_LANE:
        {
            return state.delete(state.findIndex(lane => lane.get('id') === action.id));
        }
        case laneActions.ATTACH_TO_LANE:
        {
            return state.map((lane) => {
                let index = lane.notes.indexOf(action.noteId);
                if (index >= 0) {
                    lane.notes = lane.notes.slice(0, index).concat(
                        lane.notes.slice(index + 1)
                    );
                }
                return lane;
            }).map(lane => {
                if (lane.id === action.laneId
                    && lane.notes.indexOf(action.noteId) === -1) {
                    return Object.assign({}, lane, {
                        notes: lane.notes.concat(action.noteId)
                    });
                }
                return lane;
            });
        }
        case laneActions.DETACH_FROM_LANE:
        {
            return state.map((lane) => {
                if (lane.id === action.laneId
                    && lane.notes.indexOf(action.noteId) > -1) {
                    lane.notes = lane.notes.filter((note) => note !== action.noteId);
                }
                return lane;
            });
        }
        case laneActions.MOVE:
            const sourceId = action.sourceId;
            const targetId = action.targetId;

            const lanes = state;
            const sourceLane = lanes.filter((lane) => {
                return lane.notes.indexOf(sourceId) >= 0;
            })[0];
            const targetLane = lanes.filter((lane) => {
                return lane.notes.indexOf(targetId) >= 0;
            })[0];
            const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
            const targetNoteIndex = targetLane.notes.indexOf(targetId);

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
                sourceLane.notes = sourceLane.notes.slice(0, sourceNoteIndex).concat(sourceLane.notes.slice(sourceNoteIndex + 1));

                // and move it to target
                targetLane.notes = targetLane.notes.slice(0, targetNoteIndex).concat(sourceId).concat(targetLane.notes.slice(targetNoteIndex));
            }

            return state;
        default:
        {
            return state;
        }
    }
}

const rootReducer = undoable(combineReducers({
    lanes,
    notes
}), { filter: distinctState });

export default rootReducer

