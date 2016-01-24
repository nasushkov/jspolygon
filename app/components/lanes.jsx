import React from 'react';
import Lane from './lane.jsx';
import _ from 'underscore';

export default ({lanes}) => {
    return (
        <div className="lanes">{_.map(lanes, (lane) =>
            <Lane className="lane" key={lane.id} {...lane} />
          )}</div>
    );
}