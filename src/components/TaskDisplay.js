import React, { useState } from 'react';
import '../css/Dashboard.css';
import { connect } from 'react-redux';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { toast } from "react-toastify";
import { v4 as uuid } from 'uuid';

import Task from './Task';
import AddTodoCardDialog from './AddTodoCardDialog';
import { storeCard } from '../redux/Actions';

function TaskDisplay(props) {
    const allUserTasks = props.cardsList.filter((each) => each.email === props.loginUser[0].email);
    console.log(JSON.stringify(allUserTasks));

    const part1 = allUserTasks.filter((task) => task.status === "To Do");
    // console.log(JSON.stringify(part1));

    const part2 = allUserTasks.filter((task) => task.status === "In Progress");
    const part3 = allUserTasks.filter((task) => task.status === "Completed");
    const part4 = allUserTasks.filter((task) => task.status === "Tested");

    const [showTodoCard, setShowTodoCard] = useState(false);

    function onAddTodoCardCB(cData) {
        let cList = Object.assign([], props.cardsList);           // extract the list array already in store
        cData.email = props.loginUser[0].email;
        cData.id = "T" + uuid().slice(0, 2);
        cData.status = "To Do";
        let userExist = cList.findIndex((item) => { return item.email === cData.email });
        if (userExist === -1) {
            toast.info("First card added to the login user !!!", {
                position: "bottom-left", autoClose: 3000
            });
        }
        else {
            toast.info("New card to the login user - added!!!", {
                position: "bottom-left", autoClose: 3000
            });
        }
        cList.push(cData);
        props.storeCard(cList);
        localStorage.setItem("allCards", JSON.stringify(cList));
    }

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
                    <button className='btn' title="add card-todo" onClick={() => setShowTodoCard(true)}>Add a card...</button>
                </div>
                {
                    showTodoCard ?
                        <AddTodoCardDialog onClose={() => setShowTodoCard(false)}
                            onAddTodoCardCB={onAddTodoCardCB}
                        />
                        : null
                }
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

const mapDispatchToProps = (dispatch) => {
    return {
        storeCard: (data) => { dispatch(storeCard(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDisplay);