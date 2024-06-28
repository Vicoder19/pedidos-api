const {DataTypes, INTEGER} = require('sequelize');
const sequelize = require('../config/database');
const STATUS_PEDIDO = require('./statusPedido');

const Pedido = sequelize.define('Pedido', {
    ped_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cli_id: {
        type: DataTypes.INTEGER,

        references: {
            modelName: 'Cliente',
            key: 'cli_id'
        }
    },    

    statusPed: {
        type: STATUS_PEDIDO
    },

    end_id: {
        type: DataTypes.INTEGER,
        references: {
            modelName: 'Endereco',
            key: 'end_id'
        }
    },


    
}, {
    tableName: 'pedidos',
    timestamps: false
});

module.exports = Pedido;