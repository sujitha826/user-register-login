import React from "react";
import SignImg from "./SignInImage";
import logo from '../components/logo.jpg';

const withLogoAndImage = (wrappedComponent) => {
    return function withLogo() {
        return (
            <div>
                <div class="d-flex">
                    <div className="reg-content">
                        <div className="reg-header">
                            <img src={logo} className="App-logo" alt="logo"></img>
                        </div>
                        <wrappedComponent />
                    </div>
                    <div class="ml-auto" className="reg-right">
                        <SignImg />
                    </div>
                </div>
            </div>
        );
    };
};

export default withLogoAndImage;