import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import "../styles/cart.css";
import cancelIcon from "../icons/cancel.svg";

const Cart = ({ activerFonctionC }) => {
  const [events, setEvents] = useState([]);
  const [totalSubPrice, setTotalSubPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0)
  const [nbItem, setNbItem] = useState(0)
  const [nbSubItem, setNbSubItem] = useState(0)
  /*const events = [
    { id: 22, title: 'Concert de jazz', date: '28/05/2023 - 20:00', location: 'Paris', price: '$50', image: 'https://via.placeholder.com/150' },
    { id: 23, title: 'Exposition d\'art contemporain', date: '29/05/2023 - 14:00', location: 'Lyon', price: '$20', image: 'https://via.placeholder.com/150' },
    { id: 24, title: 'Conférence sur la science', date: '02/06/2023 - 18:30', location: 'Marseille', price: '$10', image: 'https://via.placeholder.com/150' },
  ];*/
  useEffect(() => {
    let storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalPriceTmp = 0;
    let nbItemTmp = storedCartItems.length;
    let nbSubItemTmp = 0;
    for (let i = 0; i < storedCartItems.length; i++) {
      const item = storedCartItems[i];
      totalPriceTmp += (item.amount * item.price)
      nbSubItemTmp += item.amount
      item.totalPrice = item.amount * item.price;
    }
    setTotalPrice(totalPriceTmp)
    setNbSubItem(nbSubItemTmp)
    setNbItem(nbItemTmp)
    setEvents(storedCartItems);
  }, []);

  const handleChange = (ev, id) => {

    const newAmount = parseInt(ev.target.value);
    if (newAmount <= 0) {

      return;
    }
    const eventIndex = events.findIndex(event => event.id === id);
    if ((newAmount > events[eventIndex].place)) {
      return
    }

    if (eventIndex !== -1) {
      const updatedEvents = [...events];
      updatedEvents[eventIndex] = { ...updatedEvents[eventIndex], amount: newAmount };
      setEvents(updatedEvents);
    }
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const product = events[eventIndex]

    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
  
    if (existingItemIndex === -1) {
      cartItems.push({ ...product, amount: newAmount });
    } else {
      cartItems[existingItemIndex].amount = newAmount;
    }
  
    let totalPriceTmp = 0;
    let nbItemTmp = cartItems.length;
    let nbSubItemTmp = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      totalPriceTmp += (item.amount * item.price)
      nbSubItemTmp += item.amount
      item.totalPrice = item.amount * item.price;
    }
    setTotalPrice(totalPriceTmp)
    setNbSubItem(nbSubItemTmp)
    setNbItem(nbItemTmp)
    setEvents(cartItems);


    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    const total = cartItems.reduce((acc, item) => acc + item.amount, 0);
    activerFonctionC(total);

  };

  const handleDelete = (ev, id) => {
    
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Supprimer l'objet avec l'ID correspondant
    const updatedArray = cartItems.filter(obj => obj.id !== id);
    
  
    let totalPriceTmp = 0;
    let nbItemTmp = updatedArray.length;
    let nbSubItemTmp = 0;
    for (let i = 0; i < updatedArray.length; i++) {
      const item = updatedArray[i];
      totalPriceTmp += (item.amount * item.price)
      nbSubItemTmp += item.amount
      item.totalPrice = item.amount * item.price;
    }
    setTotalPrice(totalPriceTmp)
    setNbSubItem(nbSubItemTmp)
    setNbItem(nbItemTmp)
    setEvents(updatedArray);

    // Mettre à jour le tableau dans le localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedArray));
    const total = cartItems.reduce((acc, item) => acc + item.amount, 0);
    activerFonctionC(total);
  }


  return (
    <div className="cart-container">
        <div className="cart-left-container">
          {events.map(({ id, title, amount, price, totalPrice }) => (
            <div key={id} className="event-line">
              <div className="cart-title">{title}</div>
              <div className="cart-quantity">
                <input type="number" min="1"  value={amount } onChange={(event) => handleChange(event, id)}  />
              </div>
              <div className="cart-price">{price}</div>
              <div className="cart-price">{totalPrice}</div>
              <img className="cart-delete-icon" src={cancelIcon} onClick={(event) => handleDelete(event, id)} alt='supprimer' style={{ width: '30px', height: '30px'}}/>
            </div>
          ))}
        </div>
        <div className="cart-right-container">
          <div className="summary">
              <div className="total-items">Nombre d'article: <span id="total-items">{nbItem}</span></div>
              <div className="total-items">Total d'articles: <span id="total-items">{nbSubItem}</span></div>
              <div className="total-price">Prix total: <span id="total-price">{totalPrice}€</span></div>
              <Link to="/payment" className="checkout-btn">Valider</Link>
          </div>
        </div>
        
    </div>
  );
};

export default Cart;
