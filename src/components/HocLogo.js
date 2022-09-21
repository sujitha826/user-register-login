import React from "react";

const withLogo = (wrappedComponent) => {
    return function WithRightLogo({ logo }) {
        const logo_svg = logo;
        return (
            <div>
                <img src={logo_svg} className="App-logo" alt="logo"></img>
                <wrappedComponent/>
            </div>
        );
    };
};

export default withLogo;