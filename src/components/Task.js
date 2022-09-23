import React from 'react';
import '../css/Dashboard.css';
import ClearIcon from '@mui/icons-material/Clear';

const Task = ({ task, onDelete }) => {
    return (
        <div className="task">
            <ClearIcon
                style={{ color: 'red', cursor: 'pointer', fontSize: "30px", border: "none" }}
                onClick={() => onDelete(task.id)}
            />
            <h3>{task.title} </h3>
            <p>Details: {task.des}</p>
        </div>
    );
}

export default Task;