module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define('card', {
      uuid: {
        type: Sequelize.STRING
      },
      cardNumber: {
        type: Sequelize.STRING
      },
      cardHolder: {
        type: Sequelize.STRING
      },
      codeCVC: {
        type: Sequelize.STRING
      },
      expirationDate: {
        type: Sequelize.DATE            
      }
    });
    
    return Card;
};