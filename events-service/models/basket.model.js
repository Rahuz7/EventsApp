module.exports = (sequelize, Sequelize) => {
    const Basket = sequelize.define('basket', {
      uuid: {
        type: Sequelize.STRING
      },
      clientUuid: {
        type: Sequelize.STRING
      },
      totalPrice: {
        type: Sequelize.DECIMAL(10, 2),
      },
      nbItem: {
        type: Sequelize.INTEGER
      },
      nbSubItem: {
        type: Sequelize.INTEGER
      },
      waitPayment: {
        type: Sequelize.BOOLEAN            
      },
      billed: {
        type: Sequelize.BOOLEAN           
      },
      orderUuid: {
        type: Sequelize.STRING
      },
      billingDate: {
        type: Sequelize.DATE,
      },  
    });
    
    return Basket;
};