var validator = require('validator');

function isValidEmail(email) {
    try {
        return validator.isEmail(email);
    }
    catch (err) { 
        console.log(`${err.name} > ${err.message}`)
        return false;
    }
}

function isValidPassword(password) {
    try {
        return validator.isLength(password, {min: 8, max: 20})
            && validator.isStrongPassword(password);
    } catch(err) {
        console.log(`${err.name} > ${err.message}`)
        return false;
    }
}

function isValidUsername(username) {
    try {
        return validator.isAlphanumeric(username) && validator.isLength(username, {min: 5, max:20});
    }
    catch (err) { 
        console.log(`${err.name} > ${err.message}`)
        return false;
    }
}

function isValidCreditCardNumber(cardNumber) {
    try {
        return validator.isCreditCard(cardNumber);
    }
    catch (err) { 
        console.log(`${err.name} > ${err.message}`)
        return false;
    }
}

function isValidExpirationDate(expirationDate) {
    // validation format (MM/YY)
    if (!/\d{2}\/\d{2}/.test(expirationDate)) {
      return false;
    }
    // validation dateExpi > dateActuelle
    const [month, year] = expirationDate.split('/');
    if(month > 12) {
        return false;
    }
    const expiration = new Date(`20${year}`, month - 1);

    const currentDate = new Date();
  
    return expiration > currentDate;
  }

  function isValidCVV(cvv) {
    return /^[0-9]{3,4}$/.test(cvv);
  }

console.log('email', isValidEmail('test'));
console.log('email', isValidEmail(123));
console.log('email', isValidEmail('<script>alert("test")</script>'));
console.log('email', isValidEmail('toto.titi@email.com'));
console.log('email', isValidEmail(''));
console.log('email', isValidEmail());

console.log('password', isValidPassword(123));
console.log('password', isValidPassword('1234'));
console.log('password', isValidPassword('Passw0Rd!'));
console.log('password', isValidPassword('password'));
console.log('password', isValidPassword('Passw0rd'));
console.log('password', isValidPassword(''));
console.log('password', isValidPassword());

console.log('username', isValidUsername(123));
console.log('username', isValidUsername('1234'));
console.log('username', isValidUsername('Usernam3!'));
console.log('username', isValidUsername('tototiti'));
console.log('username', isValidUsername(''));
console.log('username', isValidUsername());

console.log('creditCardNumber', isValidCreditCardNumber(123));
console.log('creditCardNumber', isValidCreditCardNumber('1234'));
console.log('creditCardNumber', isValidCreditCardNumber('Usernam3!'));
console.log('creditCardNumber', isValidCreditCardNumber('4485692539304527'));
console.log('creditCardNumber', isValidCreditCardNumber(''));
console.log('creditCardNumber', isValidCreditCardNumber());

console.log('expirationDate', isValidExpirationDate(123));
console.log('expirationDate', isValidExpirationDate('01/20'));
console.log('expirationDate', isValidExpirationDate('02/26'));
console.log('expirationDate', isValidExpirationDate('14/26'));
console.log('expirationDate', isValidExpirationDate(''));
console.log('expirationDate', isValidExpirationDate());

console.log('cvv', isValidCVV(123));
console.log('cvv', isValidCVV('01/20'));
console.log('cvv', isValidCVV(12));
console.log('cvv', isValidCVV(1234));
console.log('cvv', isValidCVV(12345));
console.log('cvv', isValidCVV(''));
console.log('cvv', isValidCVV());