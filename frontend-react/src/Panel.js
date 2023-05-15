import { useNavigate } from 'react-router-dom';
import socket from './Socket';
import {React, useEffect, useState} from "react";
import identity from "./Identity"
import { BrowserRouter as Router, Route, Routes as Switch, Link, Navigate    } from 'react-router-dom';
import Password from "./Password"
import Profil from "./Profil"

const Panel = () => {
    const navigate = useNavigate();

    // Messages States
 
  
  
    useEffect(() => {

    }, [socket]);



    const handleClick = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>Panel</h1>
            <button onClick={handleClick}>Aller au Composant 1</button>
            <Switch>
              <Route path="/" element={<Navigate replace to="profil" />} />
              <Route path="profil"  element={ <Password  />}/>
              <Route path="password"  element={ <Profil />}/>
            </Switch>
        </div>
    );
};

export default Panel;