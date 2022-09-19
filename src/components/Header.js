import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import '../App.css';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';

const Header = () => {
    return (
        <div className='navbar-custom'>
            <Navbar bg="dark" variant="light" className='custom'>
                <Container>
                    <NavLink to="/register-user" className="text-decoration-none text-light mx-4"><HowToRegIcon /> User Registration</NavLink>
                    <Nav className="me-auto">
                        <NavLink to="/home" className="text-decoration-none text-light mx-4"><HomeIcon /> Home</NavLink>
                        <NavLink to="/features" className="text-decoration-none text-light mx-4">Features</NavLink>
                        <NavLink to="/" className="text-decoration-none text-light mx-4"><LoginIcon /> Login</NavLink>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;