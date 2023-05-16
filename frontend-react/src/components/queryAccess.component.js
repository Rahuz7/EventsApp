import React, { useState, useEffect } from 'react';
import '../styles/form.css';
import socket from '../Socket';
import Send from '../SendMessage';
import { useNavigate } from 'react-router-dom';
import eventManager from '../icons/events-manager.png';

const QueryAccess = () => {

        const [message, setMessage] = useState('');
        const [shouldRedirect, setShouldRedirect] = useState(false);
        const navigate = useNavigate();
     
        const handleSubmit = (event) => {
            event.preventDefault();
            Send("grantMeEventOwner", {}, socket)
        };
        const user = JSON.parse(localStorage.getItem('user'));
        
        useEffect(() => {
            setShouldRedirect(true);
            
            if (!user) {
              navigate('/login');
            } else if (!user.roles.includes("ROLE_ORGANISATEUR")) { 
              Send("refreshCredential", {}, socket)
            } else {
              navigate('/dashboard/event');
            }
        }, []);
        useEffect(() => {
            socket.on("get-grant-query-response", (data) => {
       
              if (data.success == true) {
                setMessage(data.message);

              } else {
                setMessage(data.message);
              }
              
            });
            socket.on("fetch-credential", (data) => {
      
              if (data.success == true) {
                localStorage.setItem("user", JSON.stringify(data));
                if (data.roles.includes("ROLE_ORGANISATEUR")) {
                  navigate('/dashboard/event');
                }
                setMessage(data.message);
                
              } else {
                setMessage(data.message);
              }
              
            });
          }, [socket]);

        if (!user) {
          return null; 
        }
        return (
            <div className='login-content-container'>
              <img className="form-background" src={eventManager}/>
            <form className='form' onSubmit={handleSubmit}>
              <h1> Je veux devenir organisateur</h1>
              <button className="submit-form" type="submit">
                Envoyer ma demande
              </button>  
            </form>
      
            {message && <p>{message}</p>}
          </div>
        )
    }
export default QueryAccess;