import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/cart.css";
import cancelIcon from "../icons/cancel.svg";

const Cart = () => {

  const events = [
    { id: 22, title: 'Concert de jazz', date: '28/05/2023 - 20:00', location: 'Paris', price: '$50', image: 'https://via.placeholder.com/150' },
    { id: 23, title: 'Exposition d\'art contemporain', date: '29/05/2023 - 14:00', location: 'Lyon', price: '$20', image: 'https://via.placeholder.com/150' },
    { id: 24, title: 'Conférence sur la science', date: '02/06/2023 - 18:30', location: 'Marseille', price: '$10', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div class="cart-container">
        <div class="cart-left-container">
          {events.map((event) => (
            <div class="event-line">
              <div class="cart-title">{event.title}</div>
              <div class="cart-quantity">
                <input type="number" min="1" value="1" />
              </div>
              <div class="cart-price">{event.price}</div>
              <img className="cart-delete-icon" src={cancelIcon} alt='supprimer' style={{ width: '30px', height: '30px'}}/>
            </div>
          ))}
        </div>
        <div class="cart-right-container">
          <div class="summary">
              <div class="total-items">Total d'articles: <span id="total-items">2</span></div>
              <div class="total-price">Prix total: <span id="total-price">25€</span></div>
              <button class="checkout-btn">Valider</button>
          </div>
        </div>
        
    </div>
  );
};

export default Cart;
