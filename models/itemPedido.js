const {DataTypes, INTEGER} = require('sequelize');
const sequelize = require('../config/database');

const ItemPedido = sequelize.define('itemPedido', {
    item_id : {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    ped_id: {
        type: DataTypes.INTEGER,
        allowNull: false,        
        references: {
            model: 'pedidos',
            key: 'ped_id'
        }    
    }

},
{
    tableName: 'pedidos_items',
    timestamps: false
});

module.exports = ItemPedido;