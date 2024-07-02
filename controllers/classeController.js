const { Classe } = require('../models');

const retornosHttp = require('../middleware/retornosHttp');

const getClasses = async (req, res) => {
    try {
        const classes = await Classe.findAll();
        res.json(classes);
    } catch (error) {
        retornosHttp.ErroInterno(error, res);
    }

};

const getClasse = async (req, res) => {
    const { id } =  req.params;
    try {
        if (!retornosHttp.paramIsInteger(id)){
            return retornosHttp.badRequest(res);            
        }            
        const classe = await Classe.findByPk(id);

        if (!classe){
            return retornosHttp.notFound(res);
        }

        res.json(classe);

    } catch (error) {
        retornosHttp.internalError(error, res);
    }
}

const deleteClasse = async (req, res) => {
    const {id} = req.params;
    try {
        
        if (!retornosHttp.paramIsInteger(id)){
            return retornosHttp.badRequest(res);            
        }            
        
        const classe = await Classe.findByPk(id);

        if (!classe){
            return retornosHttp.notFound(res);
        }

        await classe.destroy(classe);
        res.json({ message: 'Product deleted' });

    } catch (error) {
        retornosHttp.internalError(error, res);
    }
}

module.exports = {
    getClasses,
    getClasse,
    deleteClasse
};

