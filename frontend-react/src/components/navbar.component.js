import React, { Component } from 'react';
//import LoginBtn from './loginBtn.component';
//import SignupBtn from './signupBtn.component';
import ProfileIcon from './profileIcon.component.js';
import '../styles/navbar.css';
import LoginBtn from './loginBtn.component';
import SignupBtn from './signupBtn.component';
import { useNavigate } from 'react-router-dom';
const Navbar = ({isLoggedIn}) => {
        const navigate = useNavigate();

        const handleClick = () => {
            navigate('/');
        };
        return (
            <div className='container'>
              <header className='navbar-interactive'>
                <img src="./icons/icon.png" alt="logo" className='logo' />
                <a onClick={handleClick} className='title' >EV-France</a>
                <div className='desktop-menu'>
                  <nav className='nav'> 
                    <a href='#'>Je suis organisateur</a>
                    <a href='#'>Panier</a>
                    <a href='#'>Calendrier</a>
                  </nav>
                </div>
                
                    {isLoggedIn ? (
                            <div className='btn-group'>
                                <ProfileIcon />              
                            </div>
                        ) : (
                        <div className='btn-group'>
                            <LoginBtn/>
                            <SignupBtn/>
                         </div>
                    )}
                  {/* <ProfileIcon /> */}
              
              </header> 
            </div>
        )
    }
    export default Navbar;