import React, { Component } from 'react';
import LoginBtn from './loginBtn.component';
import SignupBtn from './signupBtn.component';
import ProfileIcon from './profileIcon.component.js';
import '../styles/navbar.css';

export default class NavBar extends Component {
    render() {
        return (
            <div className='container'>
              <header className='navbar-interactive'>
                <img src="./icon.png" alt="logo" className='logo' />
                <a href='#' className='title' onClick={this.props.onHomeClick}>EV-France</a>
                <div className='desktop-menu'>
                  <nav className='nav'> 
                    <a href='#' onClick={this.props.onOrganizerClick}>Je suis organisateur</a>
                    <a href='#'>Panier</a>
                    <a href='#' onClick={this.props.onEventsClick}>Calendrier</a>
                  </nav>
                </div>
                <div className='btn-group'>
                  {!this.props.showLoginContent && <LoginBtn onClick={this.props.onLoginClick} />}
                  {!this.props.showSignupContent && <SignupBtn onClick={this.props.onSignupClick} />}
                  {/* <ProfileIcon /> */}
                </div>
              </header> 
            </div>
        )
    }
}