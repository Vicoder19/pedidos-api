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

    end_id: {
        type: DataTypes.INTEGER,
        references: {
            modelName: 'Endereco',
            key: 'end_id'
        }
    },

    ped_observacoes : {
        type: DataTypes.STRING,        
    },

    ped_total_bruto: {
        type : DataTypes.FLOAT,
        allowNull: false
    },

    ped_taxa_entrega: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    ped_total_liq: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    ped_desconto: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    ped_status: {
        type: STATUS_PEDIDO
    },

    ped_data_aceito: {
        type: DataTypes.TIME        
    },

    fun_id: {
        type: DataTypes.INTEGER,
        references: {
            modelName: 'Funcionario',
            key: 'fun_id'
        }
    }
    
}, {
    tableName: 'pedidos',
    timestamps: false
});

module.exports = Pedido;