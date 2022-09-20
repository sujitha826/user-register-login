import React, { useState } from 'react';
import SignImg from '../components/SignInImage';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import { connect } from 'react-redux';
import { storeLoginUser } from '../redux/Actions';

const Login = (props) => {

    const navigate = useNavigate();
    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    });
    console.log(inpval);

    const getdata = (e) => {
        // console.log(e.target.value)
        // console.log(e.target.name);
        setInpval(() => {
            return {
                ...inpval,
                [e.target.name]: e.target.value
            }
        });
    }

    const addData = (e) => {
        e.preventDefault();

        const { email, password } = inpval;
        if (email === "") {
            toast.error('email field is requred', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('Plz enter valid email addres', {
                position: "top-center",
            });
        } else if (password === "") {
            toast.error('Password field is requred', {
                position: "top-center",
            });
        } else if (password.length < 5) {
            toast.error('Password length should be greater than five', {
                position: "top-center",
            });
        } else {
            // const getuserArr = localStorage.getItem("users");
            // console.log(getuserArr);
            // if (getuserArr && getuserArr.length) {
            //     const userdata = JSON.parse(getuserArr);
            //     const userlogin = userdata.filter((el, k) => {
            //         return el.email === email && el.password === password
            //     });

            //     if (userlogin.length === 0) {
            //         return alert("Invalid user details");
            //         <Alert dismissible variant="danger">
            //             <Alert.Heading>Oh snap! User details not found!!</Alert.Heading>
            //             <p>
            //                 Register once and enter valid user details.
            //             </p>
            //         </Alert>
            //     } else {
            //         console.log("User logged in succesfully");
            //         localStorage.setItem("user_login", JSON.stringify(userlogin));
            //         navigate("/user-details");
            //     }
            // }

            let allUsers = Object.assign([], props.usersList);
            const loginUser = allUsers.filter((el, k) => {
                return el.email === email && el.password === password
            });
            console.log(loginUser);
            if (loginUser.length === 0) {
                return alert("Invalid user details");
            } else {
                console.log("User logged in succesfully");
                props.storeLoginUser(loginUser);
                localStorage.setItem("login_user", JSON.stringify(loginUser));
                navigate("/user-details");
            }
        }
    }

    return (
        <>
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>Sign In</h3>
                        <Form >

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
                            </Form.Group>

                        </Form>
                        <div className='action-container'>
                            <button className='submit-butn' onClick={addData} style={{ background: "rgb(66, 184, 127)" }} type="submit">
                                Submit
                            </button>
                            <p className='message-register'>Don't have a registered account? <span><Link to="/register-user"><HowToRegIcon /> Register</Link></span></p>
                        </div>
                    </div>
                    <SignImg />
                </section>
                <ToastContainer />
            </div>
        </>
    );
}

function mapStateToProps(store) {
    console.log("store", store);
    return {
        loginUser: store.loginNow.loginUser,                       // this will change to "store.users.list" if multiple reducers are added.
        usersList: store.users.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeLoginUser: (data) => { dispatch(storeLoginUser(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);