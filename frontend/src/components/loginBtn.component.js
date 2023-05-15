import React, { Component } from 'react';
import '../styles/navbar.css';

export default class LoginBtn extends Component {
    render() {
        return (
            <button className='login' onClick={this.props.onClick} >
                <a href='#'>Connexion</a>
            </button>
        )
    }
}