import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import logo from '../assets/logo.jpg';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

import { connect } from 'react-redux';
import { storeLoginUser } from '../redux/Actions';
import login_bg from '../assets/login_bg.jpg';
import WithLogoAndImage from '../components/HocLogo';

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
            toast.error('email/username field is requred', {
                position: "top-left", autoClose: 3000
            });
        } else if (password === "") {
            toast.error('Password field is requred', {
                position: "top-left", autoClose: 3000
            });
        } else if (password.length < 8) {
            toast.error('Password length should be equal to or greater than eight', {
                position: "top-left", autoClose: 3000
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
                return (el.email === email || el.username === email) && el.password === password
            });
            console.log(loginUser);
            if (loginUser.length === 0) {
                return alert("Invalid User details...May be user credentials wrong");
            } else {
                console.log("User logged in succesfully");
                props.storeLoginUser(loginUser);
                localStorage.setItem("login_user", JSON.stringify(loginUser));
                navigate("/dnd");
            }
        }
    }

    return (
        <>
            <div className="container">
                <div className='d-flex'>
                    <div className="left_data mt-2 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center mb-2 col-lg-7'>WELCOME TO </h3>
                        <img src={logo} className="App-logo" alt="logo"></img>
                        <p className='welcome-text'>Login to get in the moment updates on the things <br></br>that interest you.</p>

                        <Form >
                            <Form.Group className="mb-4 mt-4 col-lg-7" controlId="formBasicEmail">
                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email/username" />
                            </Form.Group>

                            <Form.Group className="mb-4 mt-4 col-lg-7" controlId="formBasicPassword">
                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
                            </Form.Group>
                        </Form>

                        <div className='action-container'>
                            <button className='submit-butn' onClick={addData} style={{ background: "rgb(194, 47, 47)", width: "58%" }} type="submit">
                                SIGN IN
                            </button>
                            <p className='message-register'>Don't have a registered account? <span><Link to="/register-user">  <HowToRegIcon /> Sign Up</Link></span></p>
                        </div>

                        <div style={{ borderTop: "3px solid #fff ", marginLeft: 5, marginRight: 15, width: "55%", marginTop: 40 }}><hr />
                            Continue with social media
                            <div className="other-links">
                                <LinkedInIcon />
                                <TwitterIcon />
                                <FacebookIcon />
                                <GoogleIcon />
                            </div>
                        </div>
                    </div>
                    <div className="right_data" style={{ width: "130%", height: "110%" }}>
                        <img src={login_bg} style={{ width: "90%", height: "100%", marginLeft: "175px" }} alt="" />
                    </div>
                </div>
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

// export default connect(mapStateToProps, mapDispatchToProps)(WithLogoAndImage(Login));
export default connect(mapStateToProps, mapDispatchToProps)(Login);