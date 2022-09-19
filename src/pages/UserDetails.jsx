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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Birthday = () => {
        const getuser = localStorage.getItem("user_login");
        if (getuser && getuser.length) {
            const user = JSON.parse(getuser);

            setLoginData(user);
            const userbirth = logindata.map((el, k) => {
                return el.date === todaysDate;
            });

            if (userbirth) {
                setTimeout(() => {
                    console.log("Today is the Bday of user!!");
                    handleShow();
                }, 3000)
            }
        }
    }

    const userlogout = () => {
        localStorage.removeItem("user_login")
        history("/");
    }

    useEffect(() => {
        Birthday();
    }, [])

    return (
        <>
            {
                logindata.length === 0 ? "error" :
                    <>
                        <h1>User Details</h1>
                        <h1>{logindata[0].name}</h1>
                        <Button onClick={userlogout}><LogoutIcon />LogOut</Button>
                        {
                            logindata[0].date === todaysDate ?
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{logindata[0].name} 😄</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>Wish you many many happy returns of the day ! 🍰</Modal.Body>

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