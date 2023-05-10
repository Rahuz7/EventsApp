module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define('user', {
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
      }      
    });
    
    return Client;
};