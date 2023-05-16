import React, { Component } from 'react';
import '../styles/profileIcon.css';

const ProfileIcon = () => {
        return (
            <div className="dropdown-profile-container">
                <img className='dropdown-profile' src='/icons/user-profile.png' alt='profile icon' width='50px' height='50px'/>
                <div className="dropdown-content">
                    <a href="#">Dashboard Events</a>
                    <a href="#">Dashboard Organizer</a>
                    <a href="#">Log-out</a>
                </div>
            </div>
        )
}

export default ProfileIcon;