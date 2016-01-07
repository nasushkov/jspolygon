import React from 'react';
import Lane from './lane.jsx';

export default ({lanes}) => {
    return (
        <div className="lanes">{lanes.map((lane) =>
            <Lane className="lane" key={lane.id} {...lane} />
          )}</div>
    );
}