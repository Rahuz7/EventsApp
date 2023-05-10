import React, { Component } from 'react';
import '../styles/form.css';

export default class LoginContent extends Component {
    render() {
        return (
            <div className='login-content-container'>
                <form className='form' action="/connexion" method="post">
                    <label htmlFor="email">Email :</label>
                    <input type="email" id="email" name="email" required /><br />

                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" required /><br />

                    <input type="submit" value="Connexion" />
                </form>
            </div>
        )
    }
}