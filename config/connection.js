require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce_db', 'root', 'rootroot', {
  host: 'localhost',
  dialect: 'mysql',
});


module.exports = sequelize;
