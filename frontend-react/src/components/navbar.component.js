import React, { Component } from 'react';
import { useEffect, useState} from "react";
//import LoginBtn from './loginBtn.component';
//import SignupBtn from './signupBtn.component';
import ProfileIcon from './profileIcon.component.js';
import '../styles/navbar.css';
import LoginBtn from './loginBtn.component';
import SignupBtn from './signupBtn.component';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cart from './cart.component.js';
const Navbar = ({isLoggedIn, fonctionCActivee }) => {
        const navigate = useNavigate();
        const [amount, setAmount] = useState(0);


        useEffect(() => {
          const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          const total = cartItems.reduce((acc, item) => acc + item.amount, 0);
          setAmount(total)
        }, [])


        useEffect(() => {
          if (fonctionCActivee) {
            maFonctionDeC(fonctionCActivee);
          }
        }, [fonctionCActivee]);
      
        function maFonctionDeC(fonctionCActivee) {
          setAmount(fonctionCActivee)
          console.log("Fonction de C activée depuis B !", fonctionCActivee);
        }


        const handleClick = () => {
            navigate('/');
        };

        const navigateToAccessEvent = () => {
          const user = JSON.parse(localStorage.getItem('user'));
          console.log(user)
          if (!user) {
            console.log('condition', user)
            navigate('/login');
            return null
          }
          console.log("pass")
          navigate('/event/access');
       };
        return (
            <div className='container'>
              <header className='navbar-interactive'>
                <img src="/icons/icon.png" alt="logo" className='logo' />
                <a onClick={handleClick} className='title' >EV-France</a>
                <div className='desktop-menu'>
                  <nav className='nav'> 
                    <a onClick={navigateToAccessEvent}>Je suis organisateur</a>
                    <Link to="/cart">Panier({amount})</Link>

                    {/* <a href='#'>Panier</a> */}
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