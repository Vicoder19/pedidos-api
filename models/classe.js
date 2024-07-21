const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Classe = sequelize.define('Classe', {
    cla_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cla_descricao : {
        type: DataTypes.STRING,
        allowNull: false
    } 
},{
    tableName: 'classes',
    timestamps: false
});

module.exports = Classe;