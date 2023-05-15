import React, { Component } from 'react';
import '../styles/form.css';
import keyboard from '../assets/keyboard.jpg';


export default class SignupContent extends Component {
    render() {
        return (
            <div className='signup-content-container'>
                <img className="form-background" src={keyboard}/>
                <form className='form' action="/inscription" method="post">
                    <label htmlFor="username">Nom d'utilisateur :</label>
                    <input type="text" id="username" name="username" required /><br />

                    <label htmlFor="email">Email :</label>
                    <input type="email" id="email" name="email" required /><br />

                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" required /><br />

                    <label htmlFor="confirm-password">Confirmer le mot de passe :</label>
                    <input type="password" id="confirm-password" name="confirm-password" required /><br />

                    <input type="submit" value="Inscription" />
                </form>
            </div>
        )
    }
}
