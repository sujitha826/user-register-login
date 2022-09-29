import React from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
    const navigate = useNavigate();

    const userLogout = () => {
        localStorage.removeItem("login_user");
        navigate("/");
    }

    return (
        <div className='header-base'>
            <NavLink className="nav-link" to={"/dnd"}>Dashboard</NavLink>
            <NavLink className="nav-link" to={"/products"}> Product</NavLink>
            <button id="logout" onClick={userLogout}><LogoutIcon /> Logout</button>
        </div >
    );
}

export default Navbar;