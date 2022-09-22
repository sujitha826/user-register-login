import React from 'react';
import "../App.css";

function NothingToShow() {
    return (
        <div className="not-found">
            <h2 style={{ color: 'blue' }}>No tasks assigned to you at the moment.</h2>
            <p>Please assign/create new tasks if needed to track..</p>
        </div>
    );
}

export default NothingToShow;