import React, { useState, useEffect  } from 'react';
import '../styles/form.css';
import '../styles/buttonEvent.css';
import socket from '../Socket';
import Decimal from 'decimal.js';
import Send from '../SendMessage';
import { useNavigate,useParams  } from 'react-router-dom';

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
        // Effectuer la requête pour récupérer les event types depuis l'API
       // const response = await fetch('https://example.com/api/eventTypes');
       // const data = await response.json();
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
        // Mettre à jour le state avec les event types récupérés
        setEventTypes(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des event types :', error);
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
      // Seulement une valeur décimale est saisie
      setPrice(inputValue);
    }
  };

  const handleEventTypeChange = (event) => {
    console.log('event:', event.target.value)
    if (event.target.value && isNaN(event.target.value)) {
        return;
    }
    setSelectedEventType(parseInt(event.target.value));
  };
  
  const handleNbPlaceChange = (event) => {
    let inputValue = event.target.value.replace(/\D/g, ''); // Retirer tous les caractères non numériques
    inputValue = inputValue.slice(0, 5); // Limiter le nombre de chiffres à 5

    const newNbPlace = parseInt(inputValue, 10) || 0; // Convertir en nombre ou utiliser 0 si la conversion échoue
    const maxPlaces = 10000; // Nombre maximum de places autorisé
    setPlace(Math.min(newNbPlace, maxPlaces)); // Limiter la valeur à maxPlaces
  };


  const createEvent = (event) => {
    event.preventDefault();

    // Effectuer une action avec les données du formulaire
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

    console.log('FORMAT DATA', formData);
    Send("editEvent", formData, socket)
   
    // Réinitialiser le formulaire
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
      console.log("data", data)
      console.log("JSON.stringify(data)", JSON.stringify(data))
      if (data.success == true) {
        
        setMessage(data.message);
        navigate('/dashboard/event')
      } else {
        setMessage(data.message);
      }
      
    });
    socket.on("get-item-response", (data) => {
      console.log("data", data)
      console.log("JSON.stringify(data)", JSON.stringify(data))
      if (data.success == true) {
        //setEventTypes(data.events);
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
        console.log("data", data)
        console.log("JSON.stringify(data)", JSON.stringify(data))
        if (data.success == true) {
          setEventTypes(data.events);
          setMessage(data.message);
  
        } else {
          setMessage(data.message);
        }
        
    });
    socket.on("fetch-credential", (data) => {
      console.log("data", data)
      console.log("JSON.stringify(data)", JSON.stringify(data))
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
      return ''; // La valeur de la date n'est pas valide, renvoyer une chaîne vide
    }
  
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  };


  return (

    <div className='login-content-container'>
        <h1>Editer évènement</h1>
      <form className='form' onSubmit={createEvent}>
      <label>
        Titre:
      </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
     
      <br />
      <label>
        Event Type:
      </label>
        <select value={selectedEventType} onChange={handleEventTypeChange} required>
          {isLoading ? (
            <option>Loading...</option>
          ) : (
            <>
              <option value="">Sélectionnez un event type</option>
              {eventTypes.map((eventType) => (
                <option key={eventType.id} value={eventType.id}>
                  {eventType.libelle}
                </option>
              ))}
            </>
          )}
        </select>
      
      <br />
      <label>
        Description:
      </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

      <br />
      <label>
        Emplacement:
      </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
  
      <br />
      <label>
        Date de début:
      </label>
        <input
          type="date"
          value={formatDate(dateDebut)}
          onChange={(e) => setDateDebut(e.target.value)}
          required
        />

      <br />
      <label>
        Date de fin:
      </label>
        <input
          type="date"
          value={formatDate(dateFin)}
          onChange={(e) => setDateFin(e.target.value)}
          required
        />
    
      <br />
      <label>
        Prix:
      </label>
        <input
          type="text" // Utiliser le type "text" au lieu de "number" pour permettre la saisie de décimales
          value={price}
          onChange={handlePriceChange}
          required
        />
  
      <br />
      <label>
        Nombre de places:
      </label>
        <input
          type="text" // Utiliser "text" au lieu de "number"
          value={place}
          onChange={handleNbPlaceChange}
          inputMode="numeric" // Spécifier le mode de saisie numérique
          pattern="\d*" // Limiter la saisie aux chiffres uniquement
          maxLength={5} // Limiter le nombre de chiffres à 5
          required
        />

      <br />
      <button onClick={returnToDashboard} class="button-event">Retour</button> 
      <button onClick={createEvent} class="button-event">Editer mon évènement</button> 
    </form>
    </div>
  );
};

export default EditEventForm;
