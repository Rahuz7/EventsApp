import React, { useState, useEffect } from 'react';
import socket from '../Socket';
import identity from "../Identity"

const  GiveAccess = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { token, uuid } = params;



    socket.emit("giveAccess", { token });


    socket.on("get-give-access-response", (data) => {
        identity.id = data.id;
        identity.token = data.token;
        identity.userName = data.userName;

        if (data.success == true) {
          setMessage(data.message);
        } else {
          setMessage(data.message);
        }
        
      });

  }, [socket]);

  return (
    <div>
      <h1>Accés accordé</h1>
      {message && <p>{message}</p>}
    </div>
  );
}

export default GiveAccess;