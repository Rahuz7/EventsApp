module.exports = (sequelize, Sequelize) => {
    const EventItem = sequelize.define('event_item', {
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        localtion: {
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
    
return EventItem;
};