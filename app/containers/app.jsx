import React from 'react';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Lanes from '../components/lanes.jsx';
import {createLane} from '../actions/laneActions';
import { ActionCreators } from 'redux-undo'

@DragDropContext(HTML5Backend)
class App extends React.Component {
    render() {
        let {lanes, createLane} = this.props;
        return (
            <div>
                <button className="add-lane" onClick={createLane.bind(null, { name: 'New lane' })}>+</button>
                <button onClick={this.props.onUndo} disabled={this.props.undoDisabled}>Undo</button>
                <button onClick={this.props.onRedo} disabled={this.props.redoDisabled}>Redo</button>
                <Lanes lanes={lanes}/>
            </div>
        );
    }
}

export default connect((state) => ({
    lanes: state.present.lanes,
    undoDisabled: state.past.length === 0,
    redoDisabled: state.future.length === 0
}), {
    createLane,
    onUndo: ActionCreators.undo,
    onRedo: ActionCreators.redo
})(App);