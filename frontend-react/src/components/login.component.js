import React, { useState, useEffect } from 'react';
import '../styles/form.css';
import socket from '../Socket';
import identity from "../Identity"
import keyboard from '../icons/keyboard.jpg';

const Login = ({onLogin}) => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [message, setMessage] = useState('');
    
        const handleSubmit = (event) => {
            socket.emit("login", { email, password });
            setEmail('');
            setPassword('');
        };

        const handleUserLogin = () => {
            onLogin(true);
        };

        useEffect(() => {
            socket.on("fetch-credential", (data) => {
              identity.id = data.id;
              identity.token = data.token;
              identity.userName = data.userName;
              console.log("data", data)
              console.log("JSON.stringify(data)", JSON.stringify(data))
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
      
            {message && <p>{message}</p>}
          </div>
        )
    }
export default Login;