import React from 'react';
import {connect} from 'react-redux';
import Editable from './editable.jsx';
import Note from './note.jsx';
import {move} from '../actions/laneActions';
import _ from 'underscore';

export default connect(() => ({}), {
    onMove: move
})(({items, onValueClick, onEdit, onDelete, onMove}) => {
    return (
        <ul className="notes">{_.map(items, (note) => {
            return (
                <Note className="note" id={note.id} key={note.id} onMove={onMove.bind(null, note.id)}>
                    <Editable
                        editing={note.editing}
                        value={note.task}
                        onEdit={onEdit.bind(null, note.id)}
                        onDelete={onDelete.bind(null, note.id)}/>
                </Note>
            );
        })}
        </ul>
    );
})