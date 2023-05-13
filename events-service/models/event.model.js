module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define('event', {
        ownerUuid: {
            type: Sequelize.STRING,
        },
        nom: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        date_debut: {
            type: Sequelize.DATE,
        },
        date_fin: {
            type: Sequelize.DATE,
        },
        prix: {
            type: Sequelize.DECIMAL(10, 2),
        },
        place: {
            type: Sequelize.INTEGER,
        }
});
    
return Event;
};