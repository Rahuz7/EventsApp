import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/form.css';
import '../styles/paymentForm.css';
import keyboard from '../icons/keyboard.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faLock } from '@fortawesome/free-solid-svg-icons';
import socket from '../Socket';
import Send from '../SendMessage';
const PaymentForm = () => {
  const [totalPrice, setTotalPrice] = useState(0)
  const [nbItem, setNbItem] = useState(0)
  const [nbSubItem, setNbSubItem] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    zipCode: '',
    country: '',
    titulaire: '',
    expiration: '',
    cvv: ''
  });

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user')) || [];
    if (user && user.email) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: user.email, 
      }));
    }
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
  }, []);

  useEffect(() => {
    socket.on("get-payment-response", (data) => {

      if (data.success == true) {
        localStorage.removeItem('cartItems');

        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
      
    });
  }, [socket]);


  const handleChange = (e) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = JSON.parse(localStorage.getItem('user')) || [];
    let storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    Send("payment", { ...formData, totalPrice, nbItem, nbSubItem, storedCartItems }, socket)

  };


  return (
    <div className="cart-container">
    <div className="cart-left-container">
    <div className="payment-container" style={{ height: '100%' }}>
      <img className="payment-form-background" src={keyboard}/>
        <div className="payment-form-section">
          <div className="payment-left-section">
            <h2>Données de Facturation</h2>
            <form>
              <div className="form-group">
                <label htmlFor="lastName">Nom :</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">Prénom :</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email"> </label>Email :
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="country">Pays:</label>
                <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Code Postal :</label>
                <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="address">Adresse :</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>
            
            </form>
          </div>
          <div className="payment-right-section">
            <h2>Données de Paiement</h2>
            <form>
              <div className="form-group">
                <label htmlFor="numCarte">Numéro de Carte :</label>
                <div className="input-with-icon">
                  <input type="text" id="numCarte" name="numCarte" value={formData.numCarte} onChange={handleChange} required />
                  <FontAwesomeIcon icon={faCreditCard} className="icon" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="titulaire">Titulaire de la Carte :</label>
                <input type="text" id="titulaire" name="titulaire" value={formData.titulaire} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="expiration">Date d'Expiration :</label>
                <input type="text" id="expiration" name="expiration" value={formData.expiration} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV :</label>
                <div className="input-with-icon">
                  <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} required />
                  <FontAwesomeIcon icon={faLock} className="icon" />
                </div>
              </div>
            </form>
        </div>
        </div>
        <div className="payment-centered-button">
        </div>
    </div>
    </div>
    <div className="cart-right-container">
          <div className="summary">
          <div className="total-items">Nombre d'article: <span id="total-items">{nbItem}</span></div>
              <div className="total-items">Total d'articles: <span id="total-items">{nbSubItem}</span></div>
              <div className="total-price">Prix total: <span id="total-price">{totalPrice}€</span></div>
              <Link to="/cart" className="checkout-btn">Retour</Link>
              <button  onClick={handleSubmit} className="checkout-btn">Payer ma commande</button>
              {message}
          </div>
        </div>
    </div>
    
  );
};

export default PaymentForm;
