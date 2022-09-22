import React from 'react';

function TaskDisplay(props) {
    const allTasks = props.taskList;
    const part1 = allTasks.filter((task) => task.status === "To Do");
    const part2 = allTasks.filter((task) => task.status === "In Progress");
    const part3 = allTasks.filter((task) => task.status === "Completed");
    const part4 = allTasks.filter((task) => task.status === "Tested");

    return (
        <div className='tasks-base'>
            <div className='todo'>

            </div>
            <div className='progress'>

            </div>
            <div className='done'>

            </div>
            <div className='tested'>

            </div>

        </div>
    );
}

export default TaskDisplay;