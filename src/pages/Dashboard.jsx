import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

import Navbar from '../components/Navbar';
import NothingToShow from '../components/NothingToShow';
import AddCardDialog from '../components/AddCardDialog';
import TaskDisplay from '../components/TaskDisplay';
import '../css/Dashboard.css';
import { storeCard } from '../redux/Actions';

function Dashboard(props) {
    const [showAddCard, setShowAddCard] = useState(false);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        setTaskList(props.cardsList)
    }, [props.cardsList]);

    function onAddCardCB(cData) {
        let cList = Object.assign([], props.cardsList);           // extract the list array already in store
        cData.email = props.loginUser[0].email;
        cData.id = "T" + uuid().slice(0, 2);
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

    const deleteTask = (id) => {
        let cList = Object.assign([], props.cardsList);
        const newList = cList.filter((task) => task.id !== id);
        props.storeCard(newList);
        localStorage.setItem("allCards", JSON.stringify(newList));
    }

    return (
        <div>
            <Navbar />
            <div className='db-header'>
                <button title = "add card with set status" onClick={() => setShowAddCard(true)}>Add Card</button>
            </div>
            {taskList.length > 0 ? <TaskDisplay taskList={taskList} onDelete={deleteTask} /> : <NothingToShow />}

            {
                showAddCard ?
                    <AddCardDialog onClose={() => setShowAddCard(false)}
                        onAddCardCB={onAddCardCB}
                    />
                    : null
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);