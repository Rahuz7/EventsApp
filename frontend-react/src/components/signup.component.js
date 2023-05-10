import React, { useState, useEffect } from 'react';
import socket from '../Socket';
import '../styles/form.css';
const Signup = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        socket.emit("createUser", { 
            username,
            email,
            password,
          });
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
    }

    useEffect(() => {
        socket.on("get-user-creation-response", (data) => {
            setMessage(data.message);
        });
      }, [socket]);

        return (
            <div className='signup-content-container'>
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
      
            {message && <p>{message} helper mailhog : <a href="http://localhost:8025/">Link</a></p> }
          </div>
        )
    }
export default Signup;