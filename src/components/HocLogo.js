import React from "react";
import logo from '../assets/logo.jpg';
import login_bg from '../assets/login_bg.jpg';

const WithLogoAndImage = (WrappedComponent) => {
    return function withLogo() {
        return (
            <div className="d-flex" style={{ width: "100%", height: "100%" }}>
                <WrappedComponent logo={logo} login_bg={login_bg} />
            </div>
        );
    };
};

export default WithLogoAndImage;