// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Pedidos', 'postgres', '835p19', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
