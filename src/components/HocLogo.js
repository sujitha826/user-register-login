import React from "react";
import logo from '../assets/logo.jpg';
import login_bg from '../assets/login_bg.jpg';


const WithLogoAndImage = (wrappedComponent, logo) => {
    return function withLogo() {
        return (
            <div class="d-flex">
                <div className="left_data mt-2 p-3" style={{ width: "100%" }}>
                    <div className="reg-content">
                        <div className="reg-header">
                            <img src={logo} className="App-logo" alt="logo"></img>
                        </div>
                        <wrappedComponent />
                    </div>
                </div>
                <div className="right_data" style={{ width: "100%", marginLeft: "50px", marginTop: 0 }}>
                    <img src={login_bg} style={{ width: "100%", height: "100%" }} alt="" />
                </div>
            </div>
        );
    };
};

export default WithLogoAndImage;