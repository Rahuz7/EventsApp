import React, { Component } from 'react';
import '../styles/form.css';
import keyboard from '../assets/keyboard.jpg';


export default class OrganizerForm extends Component {
    render() {
        return (
            <div className='organizer-content-container'>
                <img className="form-background" src={keyboard}/>
                <form className='form' action="/inscription" method="post">
                    <label htmlFor="organisation">Nom de l'organisation :</label>
                    <input type="text" id="organisation" name="organisation" required /><br />

                    <label htmlFor="description">Description :</label>
                    {/* <textarea className="textarea" id="description" name="description" rows="4" cols="44"></textarea><br /> */}
                    <textarea id="description" name="description" rows="4" cols="44"></textarea><br />

                    <input type="submit" value="Faire la demande" />
                </form>
            </div>
        )
    }
}
