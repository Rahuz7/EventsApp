import React, { useState, useEffect } from 'react';
import '../styles/form.css';
import '../styles/pagination.css';
import '../styles/buttonEvent.css';
import socket from '../Socket';
import Send from '../SendMessage';
import { useNavigate } from 'react-router-dom';
import EventListOwner from './eventListOwner.component';
const EventDashboard = () => {
        const [events, setEvents] = useState([]);
        const [count, setCount] = useState([]);
        const [message, setMessage] = useState('');
        const [currentPageNumber, setCurrentPageNumber] = useState(1);
        const [tmpPageNumber, setTmpPageNumber] = useState(1);
        const [shouldRedirect, setShouldRedirect] = useState(false);
        const navigate = useNavigate();
    
        const handleSubmit = (event) => {
            event.preventDefault();
            Send("grantMeEventOwner", {}, socket)
        };

        const navigateToCreateEvent = (event) => {
          event.preventDefault();
          navigate('/dashboard/event/new');
        }
        const user = JSON.parse(localStorage.getItem('user'));
        
        useEffect(() => {
            setShouldRedirect(true);
            
            if (!user) {
              navigate('/login');
            } else if (!user.roles.includes("ROLE_ORGANISATEUR")) { 
              Send("refreshCredential", {}, socket)
            } else {
              Send("getMyEvent", {pageNumber:1, pageSize:5}, socket)
            }
        }, []);

        const handlePagination = (pageNumber) => {
     
          setTmpPageNumber(pageNumber);
        };

        useEffect(() => {
       
          Send("getMyEvent", { pageNumber: tmpPageNumber, pageSize: 5 }, socket);
        }, [tmpPageNumber]);

        useEffect(() => {
            socket.on("fetch-credential", (data) => {
  
              if (data.success == true) {
                localStorage.setItem("user", JSON.stringify(data));
                if (data.roles.includes("ROLE_ORGANISATEUR")) {
                  navigate('/dashboard/event');
                } else {
                  navigate('/event/access');
                }
                setMessage(data.message);
                
              } else {
                setMessage(data.message);
              }
              
            });
            socket.on("get-my-event", (data) => {
   
              if (data.success == true) {
                window.scrollTo({ top: 0, behavior: 'auto' });
                setEvents(data.events);
                setCount(data.count);
                setCurrentPageNumber(data.pageNumber)
          
                if (data.events.length == 0) {
                  data.message = "Vous n'avez pas d'évènement pour le moment."
                  setMessage(data.message);  
                }
                      
              } else {
                setMessage(data.message);
              }
              
            });
          }, [socket]);

        if (!user) {
          return null; 
        }
        return (
            <div className='event-owner-content-container'>
            <h1>Mes evènements</h1>
            <button onClick={navigateToCreateEvent} className="button-event">Créer un évènement</button> 
            {message && <p>{message}</p>}
            <EventListOwner events={events}  handlePagination={handlePagination} count={count} currentPageNumber={currentPageNumber}  />
          
          </div>
        )
    }
export default EventDashboard;