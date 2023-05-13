import React, { Component } from 'react';
import '../styles/home.css';
import '../styles/button.css';
import { useNavigate } from 'react-router-dom';

const Home = () =>  {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/event');
    };


        return (
            <div className="home">
                <div className="quote-container">
                    <img src="./icons/wallpaper1.jpeg" alt="background image" className="background-image" />
                    <div className="quote">
                        <p className="quote-text">"Pour que l'événement le plus banal devienne une aventure, il faut et il suffit qu'on se mette à le raconter."</p>
                        <p className="quote-author">-- Jean-Paul Sartre</p>
                        <button onClick={handleClick} className="button">Voir les événements</button>
                    </div>
                </div>
                <div className="background-container">
                    <img src="./icons/wallpaper2.jpeg" alt="background image" className="background-image" />
                </div>
            </div>
        )
    }
    export default Home;