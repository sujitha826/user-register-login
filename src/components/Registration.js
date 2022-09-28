import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import LoginIcon from '@mui/icons-material/Login';

import logo from '../assets/logo.jpg';
import login_bg from '../assets/login_bg.jpg';
import { storeUsersList } from '../redux/Actions';
import { validateEmail, validatePassword } from "../validators/InputValidators";

const Registration = (props) => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [flag, setFlag] = useState(false);
    const [login, setLogin] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    function handleFormSubmit(e) {
        e.preventDefault();

        if (!email || !password || !username) {
            setFlag(true);
            return alert("Some inputs are missing..Please enter all input fields");
        }
        if (!validateEmail(email)) {
            return setEmailError(true);
        };
        if (!validatePassword(password))
            return setPasswordError(true);

        setFlag(false);
        let uList = Object.assign([], props.usersList);
        let userExists = uList.findIndex((item) => { return item.email === email });
        if (userExists === -1) {
            let newUserData = { email: email, password: password, username: username };
            newUserData.id = username.slice(0, 2) + uuid().slice(0, 2);
            uList.push(newUserData);
            props.storeUsersList(uList);                              // Updating store
            localStorage.setItem("users", JSON.stringify(uList));     // Updating local storage
            console.log("New User Saved to Local Storage");
            navigate("/");
        }
        else {
            alert("Email exists already...Please try login using this email or register with a different email ID..");
            setLogin(true);
        }
    }

    return (
        <div class="d-flex">
            <div className="reg-content">
                <div className="reg-header" >
                    <img src={logo} className="App-logo" alt="logo"></img>
                </div>
                <h2 style={{ color: "red", display: "flex", justifyContent: "flex-start", marginLeft: "130px" }}> Registration </h2>
                {!login ? (
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group" style={{ width: "50%", marginLeft: "60px", marginTop: "20px" }}>
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        {emailError && <div className="invalid">Please enter a valid email</div>}

                        <div className="form-group" style={{ width: "50%", marginLeft: "60px", marginTop: "20px" }}>
                            <label>Preferrred Username.</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter username"
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>

                        <div className="form-group" style={{ width: "50%", marginLeft: "60px", marginTop: "20px" }}>
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        {passwordError && <div className="invalid">Password should contain atleast one uppercase and one lowercase letters ,one digit, one special character and minimum 8 total chars</div>}
                        <div className='action-container-reg'>
                            <button className='submit-butn' onClick={handleFormSubmit} style={{ background: "rgb(194, 47, 47)", width: "50%", marginLeft: "60px", marginTop: "20px" }} type="submit">
                                SUBMIT
                            </button>
                            <p className='message-register' style={{ marginLeft: "90px" }}>
                                Already registered? <Link to="/"> <LoginIcon /> Login</Link>
                            </p>
                        </div>
                        {flag && (
                            <Alert color="primary" variant="danger">
                                I got it you are in hurry! But every Field is important!
                            </Alert>
                        )}
                    </form>
                ) :
                    (<Navigate to="/" replace />)
                }
            </div>

            <div className="right_data" style={{ width: "100%", height: "100%" }}>
                <img src={login_bg} style={{ width: "85%", height: "100%", marginLeft: "75px" }} alt="" />
            </div>

        </div>
    );
};

function mapStateToProps(store) {
    console.log("store", store);
    return {
        usersList: store.users.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeUsersList: (data) => { dispatch(storeUsersList(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
