import { useNavigate } from 'react-router-dom';
import socket from './Socket';
import {React, useEffect, useState} from "react";
import identity from "./Identity"

const Password = () => {
    const navigate = useNavigate();


 
  
  
    useEffect(() => {

    }, [socket]);



    const handleClick = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>Password</h1>
            <button onClick={handleClick}>Aller au Composant 1</button>
      
        </div>
    );
};

export default Password;