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
  const [currentEvents, setCurrentEvents] = useState([]);
  const [socketReceived, setSocketReceived] = useState(false);
  const [count, setCount] = useState(5);
  const [initialLoad, setInitialLoad] = useState(false);
  const currentDate = new Date();

  useEffect(() => {
    console.log('CALLED useEffect')
  Send("getAllEvent", {pageNumber:1, pageSize:5}, socket)
  }, []);

  useEffect(() => {
    socket.on("get-my-event", (data) => {
      console.log("data", data)
      if (data.success == true) {
        setCount(data.count);
        setCurrentEvents(data.events);
        setInitialLoad(true)
        //renderPaginationItems(data.count)
        console.log(data, currentEvents)
       
        if (data.events.length == 0) {
          data.message = "Vous n'avez pas d'évènement pour le moment."
        
        }
              
      } else {
        
      }
      
    });
  }, [socket]);

  useEffect(() => {
    if (initialLoad && count > 0) {
    console.log("trigger OUPS")
    setSocketReceived(true);
    }
  }, [initialLoad, count]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log('CALLED handlePageChange')
    Send("getAllEvent", {pageNumber:pageNumber, pageSize:5}, socket)
  };


  const addToCart = (id) => {
    
    console.log("INSPECT addToCart START")
    console.log(id)
    console.log(currentEvents)
     
  
   // const product = currentEvents[(id % 5) - 1]
    const product = currentEvents.find((obj) => obj.id === id);
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    console.log(existingItemIndex)
    console.log("INSPECT addToCart END")
    if (product.place == 0 || ( cartItems[existingItemIndex] && (cartItems[existingItemIndex].amount + 1 > product.place))) {
      return
    }
    if (existingItemIndex === -1) {
      cartItems.push({ ...product, amount: 1 });
    } else {
      cartItems[existingItemIndex].amount += 1;
    }
  
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log("addToCart ", cartItems )
    console.log("addToCart ", cartItems.length )
    const total = cartItems.reduce((acc, item) => acc + item.amount, 0);
    console.log("addToCart ", total )
    activerFonctionC(total);
  };

  const renderPaginationItems = (counter) => {
    const totalPages = Math.ceil(counter / eventsPerPage);
    const maxDisplayedPages = 5; // Nombre maximum de pages affichées
    const displayEllipsis = totalPages > maxDisplayedPages;
    console.log(totalPages,displayEllipsis )
    const paginationItems = [];

    let startPage = 1;
    let endPage = totalPages;

    // Calculer les pages de début et de fin en fonction du nombre maximum de pages affichées
    if (displayEllipsis) {
      const middlePage = Math.floor(maxDisplayedPages / 2);
      const pagesBeforeEllipsis = middlePage;
      const pagesAfterEllipsis = maxDisplayedPages - middlePage - 1;

      if (currentPage <= pagesBeforeEllipsis) {
        endPage = maxDisplayedPages;
      } else if (currentPage >= totalPages - pagesAfterEllipsis) {
        startPage = totalPages - maxDisplayedPages + 1;
      } else {
        startPage = currentPage - pagesBeforeEllipsis;
        endPage = currentPage + pagesAfterEllipsis;
      }
    }

    // Afficher les numéros de page
    if (startPage != endPage) {
      for (let i = startPage; i <= endPage; i++) {
        paginationItems.push(
          <Pagination.Item
            key={"A"+i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
   } else {
    console.log("YES TRIGGER")
    paginationItems.push(
      <Pagination.Item
        key={"B" + 0}
        active={0 === currentPage}
        onClick={() => handlePageChange(1)}
      >
        1
      </Pagination.Item>
    );
   }
    // Ajouter les ellipses si nécessaire
    if (displayEllipsis) {
        if (startPage > 1) {
            paginationItems.unshift(
                <Pagination.Ellipsis key="V + 0" /> 
              );
          paginationItems.unshift(
            <Pagination.Item
            key="C + 0"
            active={currentPage === 1}
            onClick={() => handlePageChange(1)}>1</Pagination.Item>
          );

        
        }
        if (endPage < totalPages) {
          paginationItems.push(
            <Pagination.Ellipsis key="R + 0" /> 
           
          );
          paginationItems.push(
            <Pagination.Item
            key={"C" + totalPages + 1}
            active={totalPages === currentPage}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Pagination.Item>    
          );
          
        }
      }

    return paginationItems;
  };
  return (
    <div>
    <div className="event-list">
      {currentEvents.map((event) => (
        <div className="event" key={event.id}>
           <div className="event-card">
            {event.event_type && (event.event_type.avatarSrc && (
              <div className="event-image-owner">
                      <img src={`/images/${event.event_type.avatarSrc}`} alt={event.title} />
              </div>
            ))}
            <div className='event-card-content' >
              <h3 className="event-title">{event.title}</h3>
              <p className="event-location">Emplacement : {event.location}</p>
              <p className="event-date">Date debut :  {format(new Date(event.dateDebut), 'dd MMMM yyyy HH:mm', { locale: frLocale })}</p>
              <p className="event-date">Date fin :  {format(new Date(event.dateFin), 'dd MMMM yyyy HH:mm', { locale: frLocale })}</p>
              <p className="event-date">Places : {event.place}</p>
              <p className="event-price">Prix : {event.price}</p>
            </div>
            <div className="event-card-cart">
               {/* ACTION WHEN CLICK ON ADD TO CART */}
               {new Date(event.dateDebut) > currentDate && (
                <img className="icon-shopping-cart" src="/icons/ajout-panier.svg" onClick={() => addToCart(event.id)}  alt='ajouter au panier' style={{ width: '30px', height: '30px', cursor: 'pointer'}}/>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
    <div>
    {socketReceived && <Pagination>{renderPaginationItems(count)}</Pagination>}
    </div>
  </div>
  );
};

export default EventList;
