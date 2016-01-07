import uuid from 'node-uuid';

export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const ATTACH_TO_LANE = 'ATTACH_TO_LANE';
export const DETACH_FROM_LANE = 'DETACH_FROM_LANE';
export const MOVE = 'MOVE';

export function createLane(lane){
    const id = uuid.v4();
    return {
        type: CREATE_LANE,
        lane : {
            id,
            notes: [],
            ...lane
        }
    };
}

export function updateLane(id, name){
    return {
        type: UPDATE_LANE,
        id,
        name
    };
}

export function deleteLane(id){
    return {
        type: DELETE_LANE,
        id
    };
}

export function attachToLane(laneId, noteId){
    return {
        type: ATTACH_TO_LANE,
        laneId,
        noteId
    };
}

export function detachFromLane(laneId, noteId){
    return {
        type: DETACH_FROM_LANE,
        laneId,
        noteId
    };
}

export function move(sourceId, targetId){
    return {
        type: MOVE,
        sourceId,
        targetId
    }
}