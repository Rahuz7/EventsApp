import React, { useState, useEffect  } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import '../styles/eventList.css';
import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import { useNavigate } from 'react-router-dom';
import Send from '../SendMessage';
import socket from '../Socket';
const EventList = ({ activerFonctionC }) => {
  const [eventsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOrder, setCurrentOrder] = useState([]);
  const [socketReceived, setSocketReceived] = useState(false);
  const [count, setCount] = useState(5);
  const [initialLoad, setInitialLoad] = useState(false);
  const currentDate = new Date();

  useEffect(() => {
   
  Send("getBasket", {pageNumber:1, pageSize:5}, socket)
  }, []);

  useEffect(() => {
    socket.on("get-collection-response", (data) => {
  
      if (data.success == true) {
        setCurrentOrder(data.baskets);
       
      
        if (data.baskets.length == 0) {
          data.message = "Vous n'avez pas de commande pour le moment."       
        }
              
      } else {  
      }
      
    });
  }, [socket]);




  return (
    <div>
    <div className="event-list">
    <h2>Mes commandes</h2>
      <table style={{ border: '1px solid black' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '5px' }}>Numéro commande</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Nombre d'items</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Total</th>
          </tr>
        </thead>
        <tbody>
    {currentOrder.map((order) => (
            <tr key={order.orderUuid}>
                <td style={{ border: '1px solid black', padding: '5px' }}>{order.orderUuid}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{order.nbItem}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{order.totalPrice}</td>
            </tr>
          ))}
             </tbody>
      </table>
    </div>

  </div>
  );
};

export default EventList;
