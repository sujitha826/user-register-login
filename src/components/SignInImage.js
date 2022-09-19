import React from 'react';
import login from './login.jpg';

const SignImg = () => {
    return (
        <>
            <div className="right_data mt-5" style={{ width: "100%" }}>
                <div className="sign_img mt-5">
                    <img src={login} style={{ maxWidth: 400 }} alt="" />
                </div>
            </div>
        </>
    )
}

export default SignImg;