import React, { Component } from 'react';
import '../styles/home.css';
import '../styles/eventDescription.css';

const  EventDescription  = () => {
        return (
            <div className="events-desc">
                <img src="./icons/wallpaper1.jpeg" alt="background image" className="background-image" />
                <div className="events-text">
                    <h1>EV-FRANCE</h1>
                    <p>Haut lieu de la vie nocturne arlésienne, Ev-France, scène des musiques actuelles, propose une programmation de concerts depuis plus de 25 ans. Ouvert sur de nombreux styles musicaux, les groupes de rock, folk, pop, chanson, hip-hop, jazz, soul, funk et électro se succèdent d’octobre à juin dans une configuration des plus intimistes (350 places) pour le plus grand plaisir du public et des artistes.</p>
                </div>
            </div>
        )
}
export default EventDescription;