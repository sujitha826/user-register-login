import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { storeUsersList } from '../redux/Actions';
import Login from "./Login";
import logo from '../components/logo.jpg';
import { validateEmail, validatePassword } from "../validators/InputValidators";

function RegisterUser(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [dob, setDob] = useState("");
    const [dept, setDept] = useState("");

    const [flag, setFlag] = useState(false);
    const [login, setLogin] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    function handleFormSubmit(e) {
        e.preventDefault();

        if (!name || !email || !password || !username || !dob || !dept) {
            setFlag(true);
            return alert("Please enter all input fields");
        }
        if (!validateEmail(email)) {
            return setEmailError(true);
        };
        if (!validatePassword(password))
            return setPasswordError(true);

        setFlag(false);
        // const allUsers = JSON.parse(localStorage.getItem("users"));
        // if (!allUsers) {
        //     let inputUser = { name: name, email: email, password: password, phone: phone, dob: dob, profession: profession };
        //     let userData = [{ ...inputUser }];
        //     console.log(userData);
        //     localStorage.setItem("users", JSON.stringify(userData));
        // }
        // else {
        //     let newUser = { name: name, email: email, password: password, phone: phone, profession: profession };
        //     let usersList = Object.assign([], allUsers);
        //     usersList.push(newUser);
        //     localStorage.setItem("users", JSON.stringify(usersList));
        // }

        let uList = Object.assign([], props.usersList);                 // Extracting store list from props(array)
        let userExists = uList.findIndex((item) => { return item.email === email });
        if (userExists === -1) {
            let newUserData = { name: name, email: email, password: password, username: username, dob: dob, department: dept };
            newUserData.id = name.slice(0, 2) + uuid().slice(0, 2);
            uList.push(newUserData);
            props.storeUsersList(uList);                              // Updating store
            localStorage.setItem("users", JSON.stringify(uList));     // Updating local storage
            console.log("New User Saved to Local Storage");
            navigate("/");
        }
        else {
            return alert("Email exists already.Please register with a different email ID..");
            // <Alert color="primary" variant="danger">
            //     Email already exists..Please register with a different email ID!!
            // </Alert>
        }
        // setLogin(true);
    }


    return (
        <>
            <div>
                <h3>Registration</h3>
                <div className="header-logo"><img src={logo} className="register-logo" alt="logo"></img></div>
                {!login ? (
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group" id="input-custom">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Full Name"
                                name="name"
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>

                        <div className="form-group" id="input-custom">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        {emailError && <div className="invalid">Please enter a valid email</div>}

                        <div className="form-group" id="input-custom">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        {passwordError && <div className="invalid">Password should contain atleast one alphabet,one digit, one special character and minimum 8 total chars</div>}
                        <div className="form-group" id="input-custom">
                            <label>Preferrred Username.</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter username"
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>

                        <div className="form-group" id="input-custom">
                            <label>DOB.</label>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Enter DOB"
                                onChange={(event) => setDob(event.target.value)}
                            />
                        </div>

                        <div className="form-group" id="input-custom">
                            <label>Department.</label>
                            <Form.Control
                                as="select"
                                onChange={(event) => setDept(event.target.value)}
                            >
                                <option>Select</option>
                                <option>Web</option>
                                <option>Mobile</option>
                                <option>Middleware</option>
                                <option>QA</option>
                                <option>UI/UX</option>
                            </Form.Control>
                        </div>
                        <button type="submit" className="btn btn-dark btn-lg" id='button-custom'>
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
                    (<Login />)
                }
            </div>

        </>
    );
}

function mapStateToProps(store) {
    console.log("store", store);
    return {
        usersList: store.users.list                       // this will change to "store.users.list" if multiple reducers are added.
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeUsersList: (data) => { dispatch(storeUsersList(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);