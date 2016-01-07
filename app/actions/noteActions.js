import uuid from 'node-uuid';

export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

export function createNote(note){
    const id = uuid.v4();
    return {
        type: CREATE_NOTE,
        note: {
            id,
            ...note
        }
    };
}

export function updateNote(id, task){
    return {
        type: UPDATE_NOTE,
        id,
        task
    };
}

export function deleteNote(id){
    return {
        type: DELETE_NOTE,
        id
    }
}