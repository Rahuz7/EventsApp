import React, { Component } from 'react';
import wallpaper1 from '../icons/wallpaper1.jpeg';
import '../styles/home.css';
import '../styles/eventDescription.css';

export default class EventDescription extends Component {

    render() {
        return (
            <div class="events-desc">
                <img src={wallpaper1} alt="background image" className="background-image" />
                <div class="events-text">
                    <h1>EV-FRANCE</h1>
                    <p>Haut lieu de la vie nocturne arlésienne, Ev-France, scène des musiques actuelles, propose une programmation de concerts depuis plus de 25 ans. Ouvert sur de nombreux styles musicaux, les groupes de rock, folk, pop, chanson, hip-hop, jazz, soul, funk et électro se succèdent d’octobre à juin dans une configuration des plus intimistes (350 places) pour le plus grand plaisir du public et des artistes.</p>
                </div>
            </div>
        )
    }
}