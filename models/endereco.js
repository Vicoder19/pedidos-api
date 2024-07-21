const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Endereco = sequelize.define('Endereco', {
    end_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    cli_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Cliente',
            key: 'cli_id'
        }
    },

    end_logradouro: {
        type: DataTypes.STRING
    },

    end_bairro: {
        type: DataTypes.STRING
    },

    end_cidade: {
        type: DataTypes.STRING
    },

    end_numero: {
        type: DataTypes.STRING
    },

    end_complemento: {
        type: DataTypes.STRING
    },

    end_referencia: {
        type: DataTypes.STRING
    },

    end_principal: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: 'enderecos',
    timestamps: false
});

module.exports = {Endereco};