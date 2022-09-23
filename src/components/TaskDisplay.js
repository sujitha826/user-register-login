import React from 'react';
import '../css/Dashboard.css';
import { connect } from 'react-redux';
import Task from './Task';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function TaskDisplay(props) {
    const allUserTasks = props.cardsList.filter((each) => each.email === props.loginUser[0].email);
    // console.log(JSON.stringify(allUserTasks));

    const part1 = allUserTasks.filter((task) => task.status === "To Do");
    // console.log(JSON.stringify(part1));

    const part2 = allUserTasks.filter((task) => task.status === "In Progress");
    const part3 = allUserTasks.filter((task) => task.status === "Completed");
    const part4 = allUserTasks.filter((task) => task.status === "Tested");

    return (
        <div className='task-base'>
            <div className='todo'>
                <div className='heading'>
                    <h3>To Do</h3>
                    <MoreHorizIcon />
                </div>
                {part1.map((task, index) => (
                    <Task key={index} task={task} onDelete={props.onDelete} />
                ))}
                <div className='tasks-footer-butn'>
                    <button className='btn'>Add a card...</button>
                </div>
            </div>
            <div className='progress'>
                <div className='heading'>
                    <h3>Doing</h3>
                    <MoreHorizIcon />
                </div>
                {part2.map((task, index) => (
                    <Task key={index} task={task} onDelete={props.onDelete} />
                ))}
                <div className='tasks-footer-butn'>
                    <button className='btn'>Add a card...</button>
                </div>
            </div>
            <div className='done'>
                <div className='heading'>
                    <h3>Done</h3>
                    <MoreHorizIcon />
                </div>
                {part3.map((task, index) => (
                    <Task key={index} task={task} onDelete={props.onDelete} />
                ))}
                <div className='tasks-footer-butn'>
                    <button className='btn'>Add a card...</button>
                </div>
            </div>
            <div className='tested'>
                <div className='heading'>
                    <h3>Tested</h3>
                    <MoreHorizIcon />
                </div>
                {part4.map((task, index) => (
                    <Task key={index} task={task} onDelete={props.onDelete} />
                ))}
                <div className='tasks-footer-butn'>
                    <button className='btn'>Add a card...</button>
                </div>
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