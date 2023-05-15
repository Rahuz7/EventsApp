module.exports = (sequelize, Sequelize) => {
    const EventType = sequelize.define("event_type", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      libelle: {
        type: Sequelize.STRING
      },
      avatarSrc: {
        type: Sequelize.STRING
      }
    });
  
    return EventType;
  };