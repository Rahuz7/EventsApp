import React, { Component } from 'react';
import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';
const LoginBtn = () => {
        const navigate = useNavigate();
        const handleClick = () => {
            navigate('/login');
        };

        return (
            <button  onClick={handleClick} className='login' >
                Login
            </button>
        )
    }
export default LoginBtn;