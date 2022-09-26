import React from 'react';
import WithLogoAndImage from './HocLogo';
import logo from '../assets/logo.jpg';

const Register = () => (
    <div className='reg-input-form'>
        Register
    </div>
);

const RegisterWithLogo = WithLogoAndImage(Register, logo);
export default RegisterWithLogo;