import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
    const navigate = useNavigate();
    const [activeDashStyling, setActiveDashStyling] = useState(false);
    const [activeProdStyling, setActiveProdStyling] = useState(false);

    function goToFirst(path) {
        setActiveDashStyling(true);
        console.log("Dashboard" + activeDashStyling);
        navigate(path);                       // Navigate to the path given with user-history saved to History stack as the new instance.
    }

    function goToSecond(path) {
        setActiveProdStyling(true);
        // console.log("Product" + activeProdStyling);
        navigate(path);
    }

    const userLogout = () => {
        localStorage.removeItem("login_user");
        navigate("/");
    }

    const activeStyle = { borderBottom: "2px solid blue" };

    return (
        <div className='header-base'>
            <button onClick={() => goToFirst("/dnd")} style={activeDashStyling ? activeStyle : {}}>Dashboard</button>
            <button onClick={() => goToSecond("/products")} style={activeProdStyling ? activeStyle : {}}> Product</button>
            <button id="logout" onClick={userLogout}><LogoutIcon /> Logout</button>
        </div >
    );
}

export default Navbar;