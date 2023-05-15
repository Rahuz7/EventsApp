const Sequelize = require('sequelize');
require('dotenv').config()
// Create a new Sequelize instance
const sequelize = new Sequelize(
    'payment-databases',
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
db.card = require("./card.model.js")(sequelize, Sequelize);
db.transaction = require("./transaction.model.js")(sequelize, Sequelize);


module.exports = db;