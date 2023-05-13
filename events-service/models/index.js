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
db.event = require("./event.model.js")(sequelize, Sequelize);
db.basket = require("./basket.model.js")(sequelize, Sequelize);
db.eventItem = require("./event-item.model.js")(sequelize, Sequelize);
db.eventType = require("./event-type.model.js")(sequelize, Sequelize);


db.event.hasMany(db.eventItem);
db.eventItem.belongsTo(db.event);

db.eventType.hasMany(db.event);
db.event.belongsTo(db.eventType);

db.basket.hasMany(db.eventItem);
db.eventItem.belongsTo(db.basket);

module.exports = db;