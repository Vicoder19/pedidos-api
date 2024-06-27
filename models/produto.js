// models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
  prd_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  prd_descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prd_preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  cla_id: {
    type: DataTypes.INTEGER,
    allowNull: false,        
    references:{
      model: 'classes',
      key: 'cla_id'
    }
  },
}, {
  tableName:'produtos',
  timestamps: false,
});

module.exports = Produto;
