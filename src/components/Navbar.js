import React from 'react';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
    const navigate = useNavigate();

    function goTo(path) {
        navigate(path);                       // Navigate to the path given with user-history saved to History stack as the new instance.
    }

    const userLogout = () => {
        localStorage.removeItem("login_user");
        navigate("/");
    }

    return (
        <div className='header-base'>
            <button onClick={() => goTo("/dashboard")}>Dashboard</button>
            <button onClick={() => goTo("/products")}> Product</button>
            <button id="logout" onClick={userLogout}><LogoutIcon /> Logout</button>
        </div >
    )
}

export default Navbar;