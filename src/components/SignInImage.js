import React from 'react';
import login_bg from './login_bg.jpg';

const SignImg = () => {
    return (
        <>
            <div className="right_data" style={{ width: "100%", height: "100%" }}>
                <div className="sign_img">
                    <img src={login_bg} style={{ maxWidth: 900, height: "100%" }} alt="" />
                </div>
            </div>
        </>
    )
}

export default SignImg;