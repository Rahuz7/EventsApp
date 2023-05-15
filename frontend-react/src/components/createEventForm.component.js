import React, { useState, useEffect } from 'react';
import '../styles/form.css';
import socket from '../Socket';
import Decimal from 'decimal.js';

const CreateEventForm = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [emplacement, setEmplacement] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [price, setPrice] = useState('');
  const [nbPlace, setNbPlace] = useState(0);
  const [eventTypes, setEventTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState(0);

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        setIsLoading(true);

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
    setSelectedEventType(parseInt(event.target.value));
  };
  
  const handleNbPlaceChange = (event) => {
    let inputValue = event.target.value.replace(/\D/g, ''); // Retirer tous les caractères non numériques
    inputValue = inputValue.slice(0, 5); // Limiter le nombre de chiffres à 5

    const newNbPlace = parseInt(inputValue, 10) || 0; // Convertir en nombre ou utiliser 0 si la conversion échoue
    const maxPlaces = 10000; // Nombre maximum de places autorisé
    setNbPlace(Math.min(newNbPlace, maxPlaces)); // Limiter la valeur à maxPlaces
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    // Effectuer une action avec les données du formulaire
    const formData = {
      titre,
      description,
      eventType: selectedEventType,
      emplacement,
      dateDebut,
      dateFin,
      price,
      nbPlace
    };

    console.log(formData);

    // Réinitialiser le formulaire
    setTitre('');
    setDescription('');
    setEmplacement('');
    setDateDebut('');
    setDateFin('');
    setPrice('');
    setNbPlace(0);
    setSelectedEventType('');
    
  };

  return (
    <div className='login-content-container'>
      <form className='form' onSubmit={handleSubmit}>
      <label>
        Titre:
      </label>
        <input
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
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
          value={emplacement}
          onChange={(e) => setEmplacement(e.target.value)}
          required
        />
  
      <br />
      <label>
        Date de début:
      </label>
        <input
          type="date"
          value={dateDebut}
          onChange={(e) => setDateDebut(e.target.value)}
          required
        />

      <br />
      <label>
        Date de fin:
      </label>
        <input
          type="date"
          value={dateFin}
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
          value={nbPlace}
          onChange={handleNbPlaceChange}
          inputMode="numeric" // Spécifier le mode de saisie numérique
          pattern="\d*" // Limiter la saisie aux chiffres uniquement
          maxLength={5} // Limiter le nombre de chiffres à 5
          required
        />

      <br />
      <button type="submit">Soumettre</button>
    </form>
    </div>
  );
};

export default CreateEventForm;
