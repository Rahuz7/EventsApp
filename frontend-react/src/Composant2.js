import { useNavigate } from 'react-router-dom';
import socket from './Socket';
import {React, useEffect, useState} from "react";
import identity from "./Identity"

const Composant2 = () => {
    const navigate = useNavigate();
   
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
  
  
    const sendMessage = () => {
     socket.emit("send_message", { message });
    };
  
    useEffect(() => {
      socket.on("receive_message", (data) => {
        console.log('trigger')
        setMessageReceived(data.message);
      });
    }, [socket]);


    const handleClick = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>Composant 2</h1>
            <button onClick={handleClick}>Aller au Composant 1</button>
            <input
                placeholder="Message..."
                onChange={(event) => {
                setMessage(event.target.value);
                }}
            />
            <button onClick={sendMessage}> Send Message</button>
            <h1> Message:</h1>
            {messageReceived}

            {identity.id}
            {identity.token}
            {identity.userName}
        </div>
    );
};

export default Composant2;