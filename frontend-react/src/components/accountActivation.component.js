import React, { useState, useEffect } from 'react';
import socket from '../Socket';
import identity from "../Identity"

const  ActivateAccount = ({onLogin}) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { token, uuid } = params;


    console.log('id :', token);
    console.log('token :', uuid);
    socket.emit("activate", { token, uuid });

    const handleUserLogin = () => {
        onLogin(true);
    };

    socket.on("fetch-credential", (data) => {
        identity.id = data.id;
        identity.token = data.token;
        identity.userName = data.userName;
        console.log("data", data)
        console.log("JSON.stringify(data)", JSON.stringify(data))
        if (data.success == true) {
          localStorage.setItem("user", JSON.stringify(data));
          handleUserLogin();
          setMessage(data.message);
        } else {
          setMessage(data.message);
        }
        
      });

  }, [socket]);

  return (
    <div>
      <h1>Activation du compte</h1>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ActivateAccount;