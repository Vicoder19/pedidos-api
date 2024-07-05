const sequelize = require('../config/database');
const { Pedido, ItemPedido } = require('../models');
const retornosHttp = require('../middleware/retornosHttp');
const { Query } = require('pg');
const { SELECT } = require('sequelize/lib/query-types');
const QueryTypes = require('sequelize/lib/query-types');

const getPedido = async (req, res) => {
    try {
        
        const {id} = req.params;

        const pedido = await Pedido.findByPk(id, {
            include: [{
                model: ItemPedido,
                as: 'items'
            }]
        });

        if (!pedido){
            return retornosHttp.notFound(res);
        }
        return res.json(pedido);

    } catch (error) {
        retornosHttp.internalError(error, res);
    }    

};

const getPedidos = async(req, res) => {
    try {
        const pedidos = await Pedido.findAll();   
        res.json(pedidos);
    } catch (error) {
        retornosHttp.internalError(error, res);
    }    

};

const getPedidosByCliente = async (req, res) => {
    try {
        const {id} = req.params;
        const replacements = {};
        replacements.id = id;

        let sql = `SELECT * 
                    FROM Pedidos
                    WHERE cli_id = :id`;

        const pedidos = await sequelize.query(sql, {
            type: QueryTypes.SELECT,
            replacements
        });

    } catch (error) {
        
    }
}

module.exports = {
    getPedido,
    getPedidos,
    getPedidosByCliente
};