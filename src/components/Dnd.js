import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import ClearIcon from '@mui/icons-material/Clear';

import '../css/Dnd.css';
import tested from "../assets/tested.jpg";
import { storeDndCard } from '../redux/Actions';
import AddTodoTask from './AddTodoTask';
import AddDoingTask from './AddDoingTask';
import Navbar from './Navbar';
import NothingToShow from './NothingToShow';

function Dnd(props) {

    const [showTodoTask, setShowTodoTask] = useState(false);
    const [showFirstTask, setFirstTask] = useState(false);
    const [showDoingTask, setShowDoingTask] = useState(false);

    const onAddTodoTask = (cData) => {
        let cList = Object.assign([], props.dndCardsList);
        cData.email = props.loginUser[0].email;
        cData.id = "T" + uuid().slice(0, 2);
        cData.status = "todo";
        let userExist = cList.findIndex((item) => { return item.email === cData.email });
        if (userExist === -1) {
            toast.info("First card added to the login user !!!", {
                position: "bottom-left", autoClose: 3000
            });
        }
        else {
            toast.info("New card to the login user - With status : To Do- added!!!", {
                position: "bottom-left", autoClose: 3000
            });
        }
        cList.push(cData);
        props.storeDndCard(cList);
        setState({
            tasks: cList
        });
        localStorage.setItem("dndCards", JSON.stringify(cList));
    }

    const onAddDoingTask = (cData) => {
        let cList = Object.assign([], props.dndCardsList);
        cData.email = props.loginUser[0].email;
        cData.id = "T" + uuid().slice(0, 2);
        cData.status = "wip";
        let userExist = cList.findIndex((item) => { return item.email === cData.email });
        if (userExist === -1) {
            toast.info("First card added to the login user !!!", {
                position: "bottom-left", autoClose: 3000
            });
        }
        else {
            toast.info("New card to the login user - With status : To Do- added!!!", {
                position: "bottom-left", autoClose: 3000
            });
        }
        cList.push(cData);
        props.storeDndCard(cList);
        setState({
            tasks: cList
        });
        localStorage.setItem("dndCards", JSON.stringify(cList));
    }

    const allUserTasks = props.dndCardsList.filter((each) => each.email === props.loginUser[0].email);
    let tasksObj = { tasks: allUserTasks };
    console.log(tasksObj);
    const initialState = allUserTasks[0] ? tasksObj : null;

    const [state, setState] = useState(initialState);
    const onDragStart = (e, id) => {
        console.log('dragstart:', id);
        e.dataTransfer.setData("id", id);
    }

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const onDrop = (e, cat) => {
        let id = e.dataTransfer.getData("id");

        let tasks = state.tasks.filter((task) => {
            if (task.id === id) {
                task.status = cat;
            }
            return task;
        });
        setState({
            ...state,
            tasks
        });
        console.log(JSON.stringify(state.tasks));
        localStorage.setItem("dndCards", JSON.stringify(state.tasks));
    }

    var tasks = {
        todo: [],
        wip: [],
        done: [],
        tested: []
    };

    const onDelete = (id) => {
        console.log("Deleting task with id: " + id);
        let newTasks = state.tasks.filter((task) => task.id !== id);
        console.log(newTasks);
        props.storeDndCard(newTasks);
        setState({
            tasks: newTasks
        });
        localStorage.setItem("dndCards", JSON.stringify(newTasks));
    }

    if (state !== null) {
        state.tasks.forEach(t => {
            tasks[t.status].push(
                <div key={t.id}
                    onDragStart={(e) => onDragStart(e, t.id)}
                    draggable
                    className="draggable"
                    style={{ backgroundColor: "blue" }}
                >
                    <div className='clear-icon-dnd'>
                        <img src={tested} className="dnd-image" alt=""></img>
                        <ClearIcon
                            style={{ color: 'red', cursor: 'pointer', fontSize: "30px", border: "none", marginBottom: "35px" }}
                            onClick={() => onDelete(t.id)} />
                    </div>
                    <h3>{t.title}</h3>
                    <p>Details: {t.desc}</p>
                </div>
            );
        });
    }


    return (
        <div>
            <Navbar />
            <div className='add-header'>
                <button title="add first task" onClick={() => setFirstTask(true)}>Add Task</button>
            </div>
            {
                showFirstTask ?
                    <AddTodoTask onClose={() => setFirstTask(false)}
                        onAddTodoTask={onAddTodoTask}
                    />
                    : null
            }

            {initialState != null ?
                (<div className="container-drag">
                    <div className='todo-dnd' onDragOver={(e) => onDragOver(e)}
                        onDrop={(e) => onDrop(e, "todo")}>
                        <span className="task-header">TO DO</span>
                        {tasks.todo}
                        <div className='tasks-footer-butn'>
                            <button className='btn' title="add card-todo" onClick={() => setShowTodoTask(true)}>Add a card...</button>
                        </div>
                        {
                            showTodoTask ?
                                <AddTodoTask onClose={() => setShowTodoTask(false)}
                                    onAddTodoTask={onAddTodoTask}
                                />
                                : null
                        }
                    </div>

                    <div className="wip"
                        onDragOver={(e) => onDragOver(e)}
                        onDrop={(e) => onDrop(e, "wip")}>
                        <span className="task-header">WIP</span>
                        {tasks.wip}
                        <div className='tasks-footer-butn'>
                            <button className='btn' title="add card-doing" onClick={() => setShowDoingTask(true)}>Add a card...</button>
                        </div>
                        {
                            showDoingTask ?
                                <AddDoingTask onClose={() => setShowDoingTask(false)}
                                    onAddDoingTask={onAddDoingTask}
                                />
                                : null
                        }
                    </div>

                    <div className="done-dnd"
                        onDragOver={(e) => onDragOver(e)}
                        onDrop={(e) => onDrop(e, "done")}>
                        <span className="task-header">COMPLETED</span>
                        {tasks.done}
                        <div className='tasks-footer-butn'>
                            <button className='btn' title="add card-todo">Add a card...</button>
                        </div>
                    </div>

                    <div className="tested-dnd"
                        onDragOver={(e) => onDragOver(e)}
                        onDrop={(e) => onDrop(e, "tested")}>
                        <span className="task-header">TESTED</span>
                        {tasks.tested}
                        <div className='tasks-footer-butn'>
                            <button className='btn' title="add card-todo">Add a card...</button>
                        </div>
                    </div>
                    <ToastContainer />
                </div>) : <NothingToShow />}
        </div>
    );
}

function mapStateToProps(store) {
    console.log("store", store);
    return {
        dndCardsList: store.dndCards.dndCardsList,
        loginUser: store.loginNow.loginUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeDndCard: (data) => { dispatch(storeDndCard(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dnd);