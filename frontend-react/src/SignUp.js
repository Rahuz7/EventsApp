import { useNavigate } from 'react-router-dom';
import socket from './Socket';
import {React, useEffect, useState} from "react";
import identity from "./Identity"
const Composant1 = () => {
    const navigate = useNavigate();

    // Messages States
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
  
  
    const sendMessage = () => {
     console.log("createUser")
     socket.emit("createUser", { 
        username: "JeanDupont",
        email: "jean.dupon@gmail.com",
        password: "password",
        nom: "Dupont",
        prenom: "Jean",
        telephone: "0601010101"
      });
    };
  
    useEffect(() => {
      socket.on("get-user-creation-response", (data) => {
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
            <button onClick={sendMessage}>Signup Mockup</button>
            <h1> Message:</h1>
            {messageReceived}
        </div>
    );
};

export default Composant1;