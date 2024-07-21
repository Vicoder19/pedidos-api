const {DataTypes, INTEGER} = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
    cli_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    cli_nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cli_telefone: {
        type: DataTypes.STRING
    }

}, {
    tableName: 'clientes',
    timestamps: false
});

module.exports = {Cliente};