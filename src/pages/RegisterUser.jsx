import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import Login from "./Login";

function RegisterUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [profession, setProfession] = useState("");

    const [flag, setFlag] = useState(false);
    const [login, setLogin] = useState(false);

    const navigate = useNavigate();

    function handleFormSubmit(e) {
        e.preventDefault();

        if (!name || !email || !password || !phone || !profession) {
            setFlag(true);
        } else {
            setFlag(false);
            const allUsers = JSON.parse(localStorage.getItem("users"));
            if (!allUsers) {
                let inputUser = { name: name, email: email, password: password, phone: phone, profession: profession };
                let userData = [{...inputUser}];
                console.log(userData);
                localStorage.setItem("users", JSON.stringify(userData));
            }
            else {
                let newUser = { name: name, email: email, password: password, phone: phone, profession: profession };
                // let newUsers = Object.assign(allUsers, ...newUser);
                let usersList = Object.assign([], allUsers);
                usersList.push(newUser);
                localStorage.setItem("users", JSON.stringify(usersList));
            }
            console.log("User Saved in Local Storage");
            // setLogin(true);
            navigate("/");
        }
    }

    function handleClick() {
        setLogin(true);
    }

    return (
        <>
            <div>
                {" "}
                {!login ? (
                    <form onSubmit={handleFormSubmit}>
                        <h3>Register</h3>

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

                        <div className="form-group" id="input-custom">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="form-group" id="input-custom">
                            <label>Phone No.</label>
                            <input
                                type="Phone"
                                className="form-control"
                                placeholder="Enter contact no"
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>

                        <div className="form-group" id="input-custom">
                            <label>Choose your Profession</label>
                            <Form.Control
                                as="select"
                                onChange={(event) => setProfession(event.target.value)}
                            >
                                <option>Select</option>
                                <option>Artist</option>
                                <option>Photographer</option>
                                <option>Team Player</option>
                                <option>Full Stack</option>
                            </Form.Control>
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block" id='button-custom'>
                            Register
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
                ) : (
                    <Login />
                )}
            </div>

        </>
    );
}

export default RegisterUser;