import React, { Component } from 'react';
import '../styles/home.css';
import '../styles/button.css';
import wallpaper1 from '../assets/wallpaper1.jpeg';
 

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className="quote-container">
                    <img src={wallpaper1} alt="background image" className="background-image" />
                    <div className="quote">
                        <p className="quote-text">"Pour que l'événement le plus banal devienne une aventure, il faut et il suffit qu'on se mette à le raconter."</p>
                        <p className="quote-author">-- Jean-Paul Sartre</p>
                        <button href="#" className="button" onClick={this.props.onEventsClick}>Voir les événements</button>
                    </div>
                </div>
            </div>
        )
    }
}