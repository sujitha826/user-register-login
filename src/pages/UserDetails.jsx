import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const UserDetails = () => {

    const [logindata, setLoginData] = useState([]);
    const history = useNavigate();

    const [show, setShow] = useState(false);
    var todaysDate = new Date().toISOString().slice(0, 10);
    // console.log("Today's Date ::" + todaysDate);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Birthday = () => {
        const getUser = localStorage.getItem("login_user");
        
        if (getUser && getUser.length) {
            const user = JSON.parse(getUser);
            console.log(user);
            setLoginData(user);
            console.log(JSON.stringify(logindata[0]));

            const userbirth = logindata.map((el, k) => {
                return el.dob === todaysDate;
            });
            console.log(userbirth);
            if (userbirth[0]) {
                setTimeout(() => {
                    console.log(`Today is the Bday of ${logindata[0].name}!!`);
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
            {
                logindata.length === 0 ? "error" :
                    <>
                        <h2>User Details</h2>
                        <h3>Hi!! {logindata[0].name}</h3>
                        <Button onClick={userLogout}><LogoutIcon /> LogOut</Button>
                        {
                            logindata[0].dob === todaysDate ?
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{logindata[0].name} 😄</Modal.Title>
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

export default UserDetails;