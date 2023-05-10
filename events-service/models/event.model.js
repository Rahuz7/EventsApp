module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define('event', {
        owner_uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            unique: true
        },
        nom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date_debut: {
            type: Sequelize.DATE,
            allowNull: false
        },
        date_fin: {
            type: Sequelize.DATE,
            allowNull: false
        },
        prix: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0
        }
});
    
return Event;
};