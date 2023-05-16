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
    console.log(ev)
    const newAmount = parseInt(ev.target.value);
    const eventIndex = events.findIndex(event => event.id === id);
    if ((newAmount > events[eventIndex].place)) {
      return
    }
    console.log(newAmount ,id)
    if (eventIndex !== -1) {
      const updatedEvents = [...events];
      updatedEvents[eventIndex] = { ...updatedEvents[eventIndex], amount: newAmount };
      setEvents(updatedEvents);
    }
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const product = events[eventIndex]
    console.log(product)
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
  
    if (existingItemIndex === -1) {
      cartItems.push({ ...product, amount: newAmount });
    } else {
      cartItems[existingItemIndex].amount = newAmount;
    }
  
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    const total = cartItems.reduce((acc, item) => acc + item.amount, 0);
    activerFonctionC(total);
    console.log(cartItems)
  };


  return (
    <div class="cart-container">
        <div class="cart-left-container">
          {events.map(({ id, title, amount, price, totalPrice }) => (
            <div key={id} class="event-line">
              <div class="cart-title">{title}</div>
              <div class="cart-quantity">
                <input type="number" min="1"  value={amount } onChange={(event) => handleChange(event, id)}  />
              </div>
              <div class="cart-price">{price}</div>
              <div class="cart-price">{totalPrice}</div>
              <img className="cart-delete-icon" src={cancelIcon} alt='supprimer' style={{ width: '30px', height: '30px'}}/>
            </div>
          ))}
        </div>
        <div class="cart-right-container">
          <div class="summary">
              <div class="total-items">Nombre d'article: <span id="total-items">{nbItem}</span></div>
              <div class="total-items">Total d'articles: <span id="total-items">{nbSubItem}</span></div>
              <div class="total-price">Prix total: <span id="total-price">{totalPrice}€</span></div>
              <Link to="/payment" className="checkout-btn">Valider</Link>
          </div>
        </div>
        
    </div>
  );
};

export default Cart;
