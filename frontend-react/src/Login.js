import { useNavigate } from 'react-router-dom';
import socket from './Socket';
import {React, useEffect, useState} from "react";
import identity from "./Identity"
const Login = ({onLogin}) => {
    const navigate = useNavigate();

    // Messages States
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
  
  
    const sendMessage = () => {
      socket.emit("login", { 
          username: "JeanDupont",
          password: "password",
        }
      );
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
          setMessageReceived(data.message);
          handleUserLogin();
        }
        
      });
    }, [socket]);

    const handleUserLogin = () => {
      onLogin(true);
    };


    const handleClick = () => {
        navigate('/composant2');
    };

    return (
        <div>
            <h1>Composant 1</h1>
            <button onClick={sendMessage}>Login Mockup</button>

            <h1> Message:</h1>
            {messageReceived}
        </div>
    );
};

export default Login;