import { combineReducers } from 'redux-immutablejs';
import undoable, { distinctState } from 'redux-undo';
import laneReducer from './laneReducer';
import noteReducer from './noteReducer';

export default undoable(combineReducers({ laneReducer, noteReducer }, { filter: distinctState() }))