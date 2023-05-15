import React, { Component } from 'react';
import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';
const SignupBtn = () => {
        const navigate = useNavigate();
        const handleClick = () => {
            navigate('/signup');
        };

        return (
            <button onClick={handleClick} className='register'>
               Register
            </button>
        )
    }
export default SignupBtn;