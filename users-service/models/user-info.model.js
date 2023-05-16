module.exports = (sequelize, Sequelize) => {
    const UserInfo = sequelize.define('user_info', {
      uuid: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      zipCode: {
        type: Sequelize.STRING
      },
      adresse: {
        type: Sequelize.STRING            
      },
      country: {
        type: Sequelize.STRING            
      }  
    });
    
    return UserInfo;
};