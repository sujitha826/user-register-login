import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

import logo from '../assets/logo.jpg';
import login_bg from '../assets/login_bg.jpg';
import { storeUsersList } from '../redux/Actions';
import { validateEmail, validatePassword } from "../validators/InputValidators";

const Registration = (props) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [flag, setFlag] = useState(false);
    const [login, setLogin] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    function handleFormSubmit(e) {
        e.preventDefault();

        if (!name || !email || !password || !username) {
            setFlag(true);
            return alert("Some inputs are missing..Please enter all input fields");
        }
        if (!validateEmail(email)) {
            return setEmailError(true);
        };
        if (!validatePassword(password))
            return setPasswordError(true);

        setFlag(false);
        let uList = Object.assign([], props.usersList);                 // Extracting store list from props(array)
        let userExists = uList.findIndex((item) => { return item.email === email });
        if (userExists === -1) {
            let newUserData = { name: name, email: email, password: password, username: username };
            newUserData.id = name.slice(0, 2) + uuid().slice(0, 2);
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
        // setLogin(true);
    }

    return (
        <div class="d-flex">
            <div className="left_data mt-2 p-3" style={{ width: "100%" }}>
                <div className="reg-content">
                    <div className="reg-header">
                        <img src={logo} className="reg-logo" alt="logo"></img>
                        <h2 style={{ color: "red" }}> Registration </h2>
                    </div>
                    {!login ? (
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group" style={{ width: "50%", marginLeft: "160px", marginTop: "30px" }}>
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Full Name"
                                    name="name"
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>

                            <div className="form-group" style={{ width: "50%", marginLeft: "160px", marginTop: "20px" }}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            {emailError && <div className="invalid">Please enter a valid email</div>}

                            <div className="form-group" style={{ width: "50%", marginLeft: "160px", marginTop: "20px" }}>
                                <label>Preferrred Username.</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter username"
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </div>

                            <div className="form-group" style={{ width: "50%", marginLeft: "160px", marginTop: "20px" }}>
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            {passwordError && <div className="invalid">Password should contain atleast one uppercase and one lowercase letters ,one digit, one special character and minimum 8 total chars</div>}

                            <button type="submit" className="btn btn-lg" id="button-custom">
                                Submit
                            </button>
                            <p className="forgot-password text-right">
                                Already registered? <Link to="/">Login</Link>
                            </p>

                            {flag && (
                                <Alert color="primary" variant="danger">
                                    I got it you are in hurry! But every Field is important!
                                </Alert>
                            )}
                        </form>
                    ) :
                        (<Navigate to="/" replace />)
                    }

                    { /* <wrappedComponent /> */}
                </div>
            </div>
            <div className="right_data" style={{ width: "100%", height: "100%" }}>
                <img src={login_bg} style={{ width: "85%", height: "100%", marginLeft: "70px" }} alt="" />
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
