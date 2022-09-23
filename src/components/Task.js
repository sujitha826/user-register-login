import React from 'react';
import '../css/Dashboard.css';
import ClearIcon from '@mui/icons-material/Clear';
import todo from "./todo.jpg";

const Task = ({ task, onDelete }) => {
    return (
        <div className="task">
            <div className='clear-icon'><ClearIcon
                style={{ color: 'red', cursor: 'pointer', fontSize: "30px", border: "none" }}
                onClick={() => onDelete(task.id)} />
            </div>
            <div className='title-image'>
                <img src={todo} className="task-image" alt=""></img>
                <h3>{task.title}</h3>
            </div>
            <p>Details: {task.des}</p>
        </div>
    );
}

export default Task;