import React, { useState, useEffect } from 'react';
import '../styles/form.css';
import socket from '../Socket';
import identity from "../Identity"
import keyboard from '../icons/keyboard.jpg';

const Login = ({onLogin}) => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [message, setMessage] = useState('');
        const [formSubmitted, setFormSubmitted] = useState(false);
    
        const handleSubmit = (event) => {
            event.preventDefault();
            if (!email || !password) {
              setMessage('Veuillez remplir tous les champs.');
              return;
            }
            socket.emit("login", { email, password });
            setEmail('');
            setPassword('');
            setFormSubmitted(true);
        };

        const handleUserLogin = () => {
            onLogin(true);
        };

        useEffect(() => {
            socket.on("fetch-credential", (data) => {
              identity.id = data.id;
              identity.token = data.token;
              identity.userName = data.userName;
 
              if (data.success == true) {
                localStorage.setItem("user", JSON.stringify(data));
                setMessage(data.message);
                handleUserLogin();
              } else {
                setMessage(data.message);
              }
              
            });
          }, [socket]);

        return (
            <div className='login-content-container'>
              <img className="form-background" src={keyboard}/>
                {formSubmitted ? (
                  message && <p className="message-login">{message}</p>
                ) : (
                  <form className='form'>
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
                    <button className="submit-form" onClick={handleSubmit}>
                      Connexion
                    </button>  
                  </form>
                )}
          </div>
        )
    }
export default Login;