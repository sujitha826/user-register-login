import React from 'react';
import WithLogoAndImage from './HocLogo';
import logo from '../components/logo.jpg';

function Register(props) {
    return (
            <div>
                Register
            </div>
    );
}

const RegisterWithLogo = WithLogoAndImage(Register, logo);
export default RegisterWithLogo;