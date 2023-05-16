import React, { useState, useEffect } from 'react';
import socket from '../Socket';
import '../styles/form.css';
import keyboard from '../icons/keyboard.jpg';

const Signup = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!username || !email || !password || !confirmPassword) {
          setMessage('Veuillez remplir tous les champs.');
          return;
        }
        socket.emit("createUser", { 
            username,
            email,
            password,
          });
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setFormSubmitted(true);
    }

    useEffect(() => {
        socket.on("get-user-creation-response", (data) => {
            setMessage(data.message);
        });
      }, [socket]);

        return (
            <div className='signup-content-container'>
              <img className="form-background" src={keyboard}/>
                {formSubmitted ? (
                  message && <p className="message-signup">{message} helper mailhog : <a href="http://localhost:8025/">Link</a></p> 
                ) : (
                  <form className='form' >
                  <label htmlFor='username'>Nom d'utilisateur :</label>
                  <input
                    type='text'
                    id='username'
                    name='username'
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  /><br />
          
                  <label htmlFor='email'>Email :</label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  /><br />
          
                  <label htmlFor='password'>Mot de passe :</label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  /><br />
          
                  <label htmlFor='confirm-password'>Confirmer le mot de passe :</label>
                  <input
                    type='password'
                    id='confirm-password'
                    name='confirm-password'
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  /><br />
          
                  <button className="submit-form" onClick={handleSubmit}>
                    Inscription
                  </button>  
                </form>
              )}
          
          </div>
        )
    }
export default Signup;