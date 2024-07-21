const { Cliente } = require('../models/cliente');
const { Endereco } = require('../models/endereco');

const retornosHttp = require('../middleware/retornosHttp');

const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);    
    } catch (error) {
        retornosHttp.internalError(error, res);
    }
    
};

const getCliente = async(req, res) => {
    try {
        const id = req.params.id;
        const cliente = await Cliente.findByPk(id, {
            include: [{
                model: Endereco,
                as: 'endereco'
            }]
        });

        if (!cliente){
            return retornosHttp.notFound(res);
        }

        res.json(cliente);
    } catch (error) {
        retornosHttp.internalError(error, res);
    }
};

module.exports = {
    getClientes,
    getCliente
};