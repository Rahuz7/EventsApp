import React, { useState, useEffect  } from 'react';
import '../styles/form.css';
import '../styles/buttonEvent.css';
import socket from '../Socket';
import Decimal from 'decimal.js';
import Send from '../SendMessage';
import { useNavigate,useParams  } from 'react-router-dom';
import '../styles/eventForm.css';

const EditEventForm = () => {
    const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [price, setPrice] = useState('');
  const [place, setPlace] = useState(0);
  const [eventTypes, setEventTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState(0);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();


  const user = JSON.parse(localStorage.getItem('user'));

  const returnToDashboard = () => {
    navigate("/dashboard/event")
  }


  useEffect(() => {
    const fetchEventTypes = async () => {
      
      if (!user) {
        navigate('/login');
      } else if (!user.roles.includes("ROLE_ORGANISATEUR")) { 
        Send("refreshCredential", {}, socket)
      } 
      
      try {
        setIsLoading(true);


        Send("getEvent", {id:id}, socket)
        Send("getEventType", {pageNumber:1, pageSize:10}, socket)

         const data = [
          {
            id: 1,
            libelle: "A",
            avareSrc: "A.png"
          },
          {
            id: 2,
            libelle: "B",
            avareSrc: "B.png"
          },
          {
            id: 3,
            libelle: "C",
            avareSrc: "C.png"
          }
         ]

        setEventTypes(data);
        setIsLoading(false);
      } catch (error) {
     
        setIsLoading(false);
      }
    };

    if (eventTypes.length === 0) {
      fetchEventTypes();
    }
  }, [eventTypes]);


  const handlePriceChange = (e) => {
    const inputValue = e.target.value;

    if (/^\d*\.?\d*$/.test(inputValue)) {
 
      setPrice(inputValue);
    }
  };

  const handleEventTypeChange = (event) => {

    if (event.target.value && isNaN(event.target.value)) {
        return;
    }
    setSelectedEventType(parseInt(event.target.value));
  };
  
  const handleNbPlaceChange = (event) => {
    let inputValue = event.target.value.replace(/\D/g, ''); 
    inputValue = inputValue.slice(0, 5); 

    const newNbPlace = parseInt(inputValue, 10) || 0;
    const maxPlaces = 10000; 
    setPlace(Math.min(newNbPlace, maxPlaces)); 
  };


  const createEvent = (event) => {
    event.preventDefault();

   
    const formData = {
      id,
      title,
      description,
      eventType: selectedEventType,
      location,
      dateDebut,
      dateFin,
      price,
      place
    };

  
    Send("editEvent", formData, socket)
   
   
    setTitle('');
    setDescription('');
    setLocation('');
    setDateDebut('');
    setDateFin('');
    setPrice('');
    setPlace(0);
    setSelectedEventType('');
    
  };

  useEffect(() => {
    socket.on("get-crud-response", (data) => {

      if (data.success == true) {
        
        setMessage(data.message);
        navigate('/dashboard/event')
      } else {
        setMessage(data.message);
      }
      
    });
    socket.on("get-item-response", (data) => {

      if (data.success == true) {
  
        setTitle(data.event.title);
        setDescription(data.event.description);
        setLocation(data.event.location);
        setDateDebut(data.event.dateDebut);
        setDateFin(data.event.dateFin);
        setPrice(data.event.price);
        setPlace(data.event.place);
        setSelectedEventType(data.event.event_type.id)
        setMessage(data.message);

      } else {
        setMessage(data.message);
      }
      
    });
    socket.on("get-collection-response", (data) => {

        if (data.success == true) {
          setEventTypes(data.events);
          setMessage(data.message);
  
        } else {
          setMessage(data.message);
        }
        
    });
    socket.on("fetch-credential", (data) => {

      if (data.success == true) {
        localStorage.setItem("user", JSON.stringify(data));
        if (data.roles.includes("ROLE_ORGANISATEUR")) {
          navigate('/dashboard/event/new');
        } else {
          navigate('/event/access');
        }
        setMessage(data.message);
        
      } else {
        setMessage(data.message);
      }
      
    });
  }, [socket]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return ''; 
    }
  
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  };

  return (
    <div className="event-form-container">
      <img src="/icons/wallpaper1.jpeg" alt="background image" className="event-form-background" />
      <h1>Mettre à jour un évènement</h1>
      <div className="event-form-section">
        <div className="event-form-left-section">
          <form className="event-form" onSubmit={createEvent}>
            <div className="event-form-group">
              <label for="title">Titre:</label>
              <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="event-form-group">
              <label for="event-type">Event Type:</label>
              <select id="event-type" name="event-type" value={selectedEventType} onChange={handleEventTypeChange} required> {isLoading ? ( <option>Loading...</option> ) : (
                <> <option value="">Sélectionnez un event type</option> {eventTypes.map((eventType) => (
                  <option key={eventType.id} value={eventType.id}> {eventType.libelle} </option>
                    ))} </> )} </select>
            </div>
            <div className="event-form-group">
              <label for="description">Description:</label>
              <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required ></textarea>
            </div>
            <div className="event-form-group">
              <label for="emplacement">Emplacement:</label>
              <input type="text" id="emplacement" name="emplacement" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
          </form>
        </div>
        <div className="event-form-right-section">
          <form>
            <div className="event-form-group">
              <label for="date-debut">Date de début:</label>
              <input id="date-debut" name="date-debut" type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required />
            </div>
            <div className="event-form-group">
              <label for="date-fin">Date de fin:</label>
              <input id="date-fin" name="date-fin" type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} required />
            </div>
            <div className="event-form-group">
              <label for="price">Prix:</label>
              <input id="price" name="price" type="text" value={price} onChange={handlePriceChange} required />
            </div>
            <div className="event-form-group">
              <label for="placeNumber">Nombre de places:</label>
              <input id="placeNumber" name="placeNumber" type="text" value={place} onChange={handleNbPlaceChange} inputMode="numeric" pattern="\d*" maxLength={5} required />
            </div>
          </form>
        </div>
      </div>
      <div className="event-form-button">
        <button onClick={returnToDashboard} className="button-event-cancel">Retour</button> 
        <button onClick={createEvent} className="button-event-create">Mettre à jour</button>
      </div>
    </div>
  );
};

export default EditEventForm;
