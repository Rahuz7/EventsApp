import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/form.css';
import '../styles/paymentForm.css';
import keyboard from '../icons/keyboard.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faLock } from '@fortawesome/free-solid-svg-icons';

const PaymentForm = () => {

  return (
    <div class="payment-container">
      <img className="payment-form-background" src={keyboard}/>
        <div class="payment-form-section">
          <div class="payment-left-section">
            <h2>Données de Facturation</h2>
            <form>
              <div class="form-group">
                <label for="nom">Nom :</label>
                <input type="text" id="nom" name="nom" required />
              </div>
              <div class="form-group">
                <label for="prenom">Prénom :</label>
                <input type="text" id="prenom" name="prenom" required />
              </div>
              <div class="form-group">
                <label for="numRue">Numéro de Rue :</label>
                <input type="text" id="numRue" name="numRue" required />
              </div>
              <div class="form-group">
                <label for="nomRue">Nom de Rue :</label>
                <input type="text" id="nomRue" name="nomRue" required />
              </div>
              <div class="form-group">
                <label for="codePostal">Code Postal :</label>
                <input type="text" id="codePostal" name="codePostal" required />
              </div>
            </form>
          </div>
          <div class="payment-right-section">
            <h2>Données de Paiement</h2>
            <form>
              <div class="form-group">
                <label for="numCarte">Numéro de Carte :</label>
                <div class="input-with-icon">
                  <input type="text" id="numCarte" name="numCarte" required />
                  <FontAwesomeIcon icon={faCreditCard} className="icon" />
                </div>
              </div>
              <div class="form-group">
                <label for="titulaire">Titulaire de la Carte :</label>
                <input type="text" id="titulaire" name="titulaire" required />
              </div>
              <div class="form-group">
                <label for="expiration">Date d'Expiration :</label>
                <input type="text" id="expiration" name="expiration" required />
              </div>
              <div class="form-group">
                <label for="cvv">CVV :</label>
                <div class="input-with-icon">
                  <input type="text" id="cvv" name="cvv" required />
                  <FontAwesomeIcon icon={faLock} className="icon" />
                </div>
              </div>
            </form>
        </div>
        </div>
        <div class="payment-centered-button">
          <button type="submit">Payer</button>
        </div>
    </div>
  );
};

export default PaymentForm;
