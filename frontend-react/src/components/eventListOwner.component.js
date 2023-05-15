import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import '../styles/eventList.css';
import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
const EventListOwner = ({events}) => {
  const [eventsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(events)
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  
  const renderPaginationItems = () => {
    const totalPages = Math.ceil(events.length / eventsPerPage);
    const maxDisplayedPages = 5; // Nombre maximum de pages affichées
    const displayEllipsis = totalPages > maxDisplayedPages;

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
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    // Ajouter les ellipses si nécessaire
    if (displayEllipsis) {
        if (startPage > 1) {
            paginationItems.unshift(
                <Pagination.Ellipsis /> 
              );
          paginationItems.unshift(
            <Pagination.Item
            key="1"
            active={currentPage === 1}
            onClick={() => handlePageChange(1)}>1</Pagination.Item>
          );

        
        }
        if (endPage < totalPages) {
          paginationItems.push(
            <Pagination.Ellipsis /> 
           
          );
          paginationItems.push(
            <Pagination.Item
            key={totalPages}
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
                <a href='#'> {/* ACTION WHEN CLICK ON ADD TO CART */}
                  <img className="icon-shopping-cart" src="/icons/ajout-panier.svg" alt='ajouter au panier' style={{ width: '30px', height: '30px'}}/>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Pagination>{renderPaginationItems()}</Pagination>
      </div>
    </div>
  );
};

export default EventListOwner;