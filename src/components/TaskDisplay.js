import React from 'react';
import '../css/Dashboard.css';
import { connect } from 'react-redux';
import Task from './Task';

function TaskDisplay(props) {
    const allUserTasks = props.cardsList.filter((each) => each.email === props.loginUser[0].email);
    console.log(JSON.stringify(allUserTasks));

    const part1 = allUserTasks.filter((task) => task.status === "To Do");
    console.log(JSON.stringify(part1));

    const part2 = allUserTasks.filter((task) => task.status === "In Progress");
    const part3 = allUserTasks.filter((task) => task.status === "Completed");
    const part4 = allUserTasks.filter((task) => task.status === "Tested");

    return (
        <div className='task-base'>
            <div className='todo'>
                <h3>To Do</h3>
                {part1.map((task, index) => (
                    <Task key={index} task={task} onDelete={props.onDelete} />
                ))}
            </div>
            <div className='progress'>
                <h3>Doing</h3>
                {part2.map((task, index) => (
                    <Task key={index} task={task} onDelete={props.onDelete} />
                ))}

            </div>
            <div className='done'>
                <h3>Done</h3>
                {part3.map((task, index) => (
                    <Task key={index} task={task} onDelete={props.onDelete} />
                ))}

            </div>
            <div className='tested'>
                <h3>Tested</h3>
                {part4.map((task, index) => (
                    <Task key={index} task={task} onDelete={props.onDelete} />
                ))}
            </div>
        </div>
    );
}

function mapStateToProps(store) {
    console.log("store", store);
    return {
        cardsList: store.cards.cardsList,
        loginUser: store.loginNow.loginUser
    }
}

export default connect(mapStateToProps, null)(TaskDisplay);