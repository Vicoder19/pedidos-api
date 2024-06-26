// models/index.js
const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
};

module.exports = {
  User,
  Product,
  syncDatabase,
};
