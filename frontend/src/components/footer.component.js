import React, { Component } from 'react';
import '../styles/footer.css';

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div class="footer-left">
                    <h1>Infos pratiques</h1>
                </div>
                <div class="footer-right">
                    <h3>Ev-France</h3>
                    <p class="footer-text">11 Place du Colonel Fabien</p>
                    <p class="footer-text">14000 Caen</p>
                    <p class="footer-text">tél.04 46 78 90 01</p>
                    <p class="footer-text">info@evfrance.com</p>
                    <h3>Horaire d'ouverture du bureau</h3>
                    <p class="footer-text">Du lundi au vendredi</p>
                    <p class="footer-text">9h30 &#62; 12h30 /// 14h &#62; 18h</p>
                    <h3>Ouvertures des portes de la salle</h3>
                    <p class="footer-text">Une heure avant l'heure indiquée de début des concerts</p>
                </div>
            </footer>

        )
    }
}