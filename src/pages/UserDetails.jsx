import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { connect } from 'react-redux';

import Header from '../components/Header';

const UserDetails = (props) => {

    const [loginData, setLoginData] = useState([]);
    const history = useNavigate();

    const [show, setShow] = useState(false);
    var todaysDate = new Date().toISOString().slice(0, 10);
    // console.log("Today's Date ::" + todaysDate);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Birthday = () => {
        // const getUser = localStorage.getItem("login_user");
        // console.log(getUser);
        // if (getUser && getUser.length) {
        //     const user = JSON.parse(getUser);
        //     console.log(user);
        //     setLoginData(user);
        //     console.log(JSON.stringify(logindata[0]));

        //     const userbirth = logindata.map((el, k) => {
        //         return el.dob === todaysDate;
        //     });
        //     console.log(userbirth);
        //     if (userbirth[0]) {
        //         setTimeout(() => {
        //             console.log(`Today is the Bday of ${logindata[0].name}!!`);
        //             handleShow();
        //         }, 3000);
        //     }
        // }
        const user = props.loginUser ? props.loginUser : [];
        setLoginData(user);
        if (loginData[0]) {
            const userbirth = loginData.map((el, k) => {
                return el.dob === todaysDate;
            });
            if (userbirth[0]) {
                setTimeout(() => {
                    console.log(`Today is the Bday of ${loginData[0].name}!!`);
                    handleShow();
                }, 3000);
            }
        }
    }

    const userLogout = () => {
        localStorage.removeItem("login_user");
        history("/");
    }

    useEffect(() => {
        Birthday();
    }, []);

    return (
        <>
            <Header />
            {
                loginData.length === 0 ? "Oops!!! Login user not found..Please re-login after a while" :
                    <>
                        <h2>User Details</h2>
                        <h3>Hi!! {loginData[0].name}</h3>
                        <Button onClick={userLogout}><LogoutIcon /> LogOut</Button>
                        {
                            loginData[0].dob === todaysDate ?
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{loginData[0].name} 😄</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>Wish you many many happy returns of the day!! Have a wonderful and joyful day..🍰</Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal> : ""
                        }

                    </>
            }
        </>
    );
}

function mapStateToProps(store) {
    console.log("store", store);
    return {
        loginUser: store.loginNow.loginUser
    }
}

export default connect(mapStateToProps, null)(UserDetails);