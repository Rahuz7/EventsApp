import React, { Component } from 'react';
import '../styles/eventList.css';
import Pagination from 'react-bootstrap/Pagination';
import cartIcon from '../assets/ajout-panier.svg';


export default class EventList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventsPerPage: 5,
            currentPage: 1,
            events: [ // add events list here
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
            ]
        }
    }

    handlePageChange(pageNumber) {
        this.setState({ currentPage: pageNumber });
    }

    render() {
        const { events, currentPage, eventsPerPage } = this.state;
        const indexOfLastEvent = currentPage * eventsPerPage;
        const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
        const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

        return (
            <div>
            <div className="event-list">
              {currentEvents.map(event => (
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
                          <img className="icon-shopping-cart" src={cartIcon} alt='ajouter au panier' style={{ width: '30px', height: '30px'}}/>
                          </a>
                        </div>
                    </div>
                </div>
              ))}
            </div>
            <div>
            <Pagination>
            {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => this.handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            </Pagination>
            </div>
            </div>
          );
    }
}