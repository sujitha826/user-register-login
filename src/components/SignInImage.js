import React from 'react';
import login_bg from '../assets/login_bg.jpg';

const SignImg = () => {
    return (
        <>
            <div className="right_data" style={{ width: "100%", marginLeft: "60px", marginTop: 0 }}>
                <img src={login_bg} style={{ width: "110%", height: "100%", marginLeft: "65px" }} alt="" />
            </div>
        </>
    );
}

export default SignImg;