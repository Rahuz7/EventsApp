import { useNavigate } from 'react-router-dom';
import socket from './Socket';
import {React, useEffect, useState} from "react";
import identity from "./Identity"
import Send from './Send';
const Composant1 = () => {
    const navigate = useNavigate();

    // Messages States
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
  
  
    const sendMessageA = () => {
        console.log('sendMessageA')
        Send("authorized", {})
    };
  
    const sendMessageB = () => {
        console.log('sendMessageB')
        Send("denied", {})
    };

    useEffect(() => {
      socket.on("get-shield-response", (data) => {
        console.log('trigger')
        setMessageReceived(data.message);
      });
    }, [socket]);



    const handleClick = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>Signup</h1>
            <button onClick={handleClick}>Home</button>
            <button onClick={sendMessageA}>Authorized Mockup</button>
            <button onClick={sendMessageB}>Denied Mockup</button>
            <h1> Message:</h1>
            {messageReceived}
        </div>
    );
};

export default Composant1;