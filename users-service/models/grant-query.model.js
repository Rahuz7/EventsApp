module.exports = (sequelize, Sequelize) => {
    const GrantQuery = sequelize.define('grant_query', {
      uuid: {
        type: Sequelize.STRING
      },
      userUuid: {
        type: Sequelize.STRING
      },
      validationToken: {
        type: Sequelize.STRING
      },
      isValidated: {
        type: Sequelize.BOOLEAN            
      }  
    });   
    return GrantQuery;
};