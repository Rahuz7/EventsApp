import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import '../styles/eventList.css';

const EventList = () => {
  const [eventsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const events = [
    { id: 22, title: 'Concert de jazz', date: '28/05/2023 - 20:00', location: 'Paris', price: '$50', image: 'https://via.placeholder.com/150' },
    { id: 23, title: 'Exposition d\'art contemporain', date: '29/05/2023 - 14:00', location: 'Lyon', price: '$20', image: 'https://via.placeholder.com/150' },
    { id: 24, title: 'Conférence sur la science', date: '02/06/2023 - 18:30', location: 'Marseille', price: '$10', image: 'https://via.placeholder.com/150' },
    { id: 25, title: 'Spectacle de danse moderne', date: '05/06/2023 - 19:00', location: 'Toulouse', price: '$30', image: 'https://via.placeholder.com/150' },
    { id: 26, title: 'Foire du livre', date: '08/06/2023 - 10:00', location: 'Nice', price: 'Gratuit', image: 'https://via.placeholder.com/150' },
    { id: 27, title: 'Match de football', date: '11/06/2023 - 15:00', location: 'Lille', price: '$25', image: 'https://via.placeholder.com/150' },
    { id: 28, title: 'Festival de musique', date: '15/06/2023 - 16:00', location: 'Bordeaux', price: '$60', image: 'https://via.placeholder.com/150' },
    { id: 29, title: 'Théâtre de marionnettes', date: '18/06/2023 - 11:00', location: 'Strasbourg', price: '$15', image: 'https://via.placeholder.com/150' },
    { id: 30, title: 'Tournoi de tennis', date: '22/06/2023 - 09:00', location: 'Nantes', price: '$45', image: 'https://via.placeholder.com/150' },
    { id: 31, title: 'Projection de film en plein air', date: '25/06/2023 - 20:30', location: 'Montpellier', price: '$8', image: 'https://via.placeholder.com/150' },
    { id: 32, title: 'Projection de film en plein air', date: '25/06/2023 - 20:30', location: 'Montpellier', price: '$8', image: 'https://via.placeholder.com/150' },
    { id: 33, title: 'Projection de film en plein air', date: '25/06/2023 - 20:30', location: 'Montpellier', price: '$8', image: 'https://via.placeholder.com/150' },
    { id: 34, title: 'Projection de film en plein air', date: '25/06/2023 - 20:30', location: 'Montpellier', price: '$8', image: 'https://via.placeholder.com/150' },
    { id: 35, title: 'Projection de film en plein air', date: '25/06/2023 - 20:30', location: 'Montpellier', price: '$8', image: 'https://via.placeholder.com/150' },
    { id: 36, title: 'Projection de film en plein air', date: '25/06/2023 - 20:30', location: 'Montpellier', price: '$8', image: 'https://via.placeholder.com/150' },
    { id: 37, title: 'Projection de film en plein air', date: '25/06/2023 - 20:30', location: 'Montpellier', price: '$8', image: 'https://via.placeholder.com/150' },
    { id: 38, title: 'Projection de film en plein air', date: '25/06/2023 - 20:30', location: 'Montpellier', price: '$8', image: 'https://via.placeholder.com/150' },
    { id: 39, title: 'Projection de film en plein air', date: '25/06/2023 - 20:30', location: 'Montpellier', price: '$8', image: 'https://via.placeholder.com/150' },
    { id: 40, title: 'Projection de film en plein air', date: '25/06/2023 - 20:30', location: 'Montpellier', price: '$8', image: 'https://via.placeholder.com/150' },
  
];


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
              {event.image && (
                <div className="event-image">
                        <img src={event.image} alt={event.title} />
                </div>
              )}
              <div className='event-card-content'>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-location">{event.location}</p>
                <p className="event-date">{event.date}</p>
                <p className="event-price">{event.price}</p>
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

export default EventList;
