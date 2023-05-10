import React, { Component } from 'react';
import '../styles/home.css';
import '../styles/button.css';
import wallpaper1 from '../icons/wallpaper1.jpeg';
 

export default class Home extends Component {
    render() {
        return (
            <div class="home">
                <div class="quote-container">
                    <img src={wallpaper1} alt="background image" className="background-image" />
                    <div class="quote">
                        <p class="quote-text">"Pour que l'événement le plus banal devienne une aventure, il faut et il suffit qu'on se mette à le raconter."</p>
                        <p class="quote-author">-- Jean-Paul Sartre</p>
                        <button href="#" class="button" onClick={this.props.onEventsClick}>Voir les événements</button>
                    </div>
                </div>
            </div>
        )
    }
}