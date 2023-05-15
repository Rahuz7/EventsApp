const Sequelize = require('sequelize');
require('dotenv').config()
// Create a new Sequelize instance
const sequelize = new Sequelize(
    'event-databases',
    'databases',
    'databases',
    {
      logging: false,
      port: process.env.MYSQL_PORT,
      host: process.env.MYSQL_HOST,
      dialect: 'mysql'
    }
  );

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Event = require("./event.model.js")(sequelize, Sequelize);
db.Basket = require("./basket.model.js")(sequelize, Sequelize);
db.EventItem = require("./event-item.model.js")(sequelize, Sequelize);
db.EventType = require("./event-type.model.js")(sequelize, Sequelize);


db.Event.hasMany(db.EventItem);
db.EventItem.belongsTo(db.Event);

db.EventType.hasMany(db.Event);
db.Event.belongsTo(db.EventType, { foreignKey: 'eventTypeId' });

db.Basket.hasMany(db.EventItem);
db.EventItem.belongsTo(db.Basket);

module.exports = db;