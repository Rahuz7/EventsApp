module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define('user', {
      uuid: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN            
      },
      activationToken: {
        type: Sequelize.STRING            
      },
      activationTokenUuid: {
        type: Sequelize.STRING            
      },
      isClosed: {
        type: Sequelize.BOOLEAN            
      },
      isAnonym: {
        type: Sequelize.BOOLEAN
      }
    });
    
    return Client;
};