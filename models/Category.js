const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const Product = require('./Product'); // Import the Product model

class Category extends Model {}

module.exports = Category;
