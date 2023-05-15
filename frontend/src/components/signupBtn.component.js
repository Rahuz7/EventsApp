import React, { Component } from 'react';
import '../styles/navbar.css';

export default class SignupBtn extends Component {
    render() {
        return (
            <button className='register' onClick={this.props.onClick}>
                <a href='#'>Inscription</a>
            </button>
        )
    }
}