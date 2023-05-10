import React, { Component } from 'react';
import '../styles/profileIcon.css';

const ProfileIcon = () => {
        return (
            <div className="dropdown-profile-container">
                <img className='dropdown-profile' src='/icons/user-profile.png' alt='profile icon' width='20px' height='20px'/>
                <div className="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
        )
}

export default ProfileIcon;