import combineReducers from '../seamlessImmutableHelpers/combineReducers';
import undoable, { distinctState } from 'redux-undo';
import lanes from './laneReducer';
import notes from './noteReducer';

export default undoable(combineReducers({ lanes, notes }), { filter: distinctState() })