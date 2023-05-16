import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profileIcon.css';

const ProfileIcon = ({logout}) => {
    const navigate = useNavigate();
const handleLogout = () => {
    logout()
    localStorage.removeItem('user');
    navigate("/");
}

const navigateToOrganizer = () => {
    navigate("/dashboard/event");
}

const navigateToOrder = () => {
    navigate("/my/Order");
}

        return (
            <div className="dropdown-profile-container">
                <img className='dropdown-profile' src='/icons/user-profile.png' alt='profile icon' width='50px' height='50px'/>
                <div className="dropdown-content">
                    <a onClick={navigateToOrder}>Mes commandes</a>
                    <a onClick={navigateToOrganizer}>Dashboard Organizer</a>
                    <a onClick={handleLogout}>Log-out</a>
                </div>
            </div>
        )
}

export default ProfileIcon;