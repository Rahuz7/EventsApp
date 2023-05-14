module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define('event', {
        ownerUuid: {
            type: Sequelize.STRING,
        },
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        location: {
            type: Sequelize.STRING,
        },
        date_debut: {
            type: Sequelize.DATE,
        },
        date_fin: {
            type: Sequelize.DATE,
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
        },
        place: {
            type: Sequelize.INTEGER,
        }
});
    
return Event;
};