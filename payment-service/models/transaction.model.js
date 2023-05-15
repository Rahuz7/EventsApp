module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('transaction', {
      uuid: {
        type: Sequelize.STRING
      },
      cardUuid: {
        type: Sequelize.STRING
      },
      productUuid: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      isBilled: {
        type: Sequelize.BOOLEAN            
      }
    });
    
    return Transaction;
};