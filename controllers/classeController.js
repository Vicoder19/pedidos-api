const { Classe } = require('../models/classe');

const retornosHttp = require('../middleware/retornosHttp');

const getClasses = async (req, res) => {
    try {
        const classes = await Classe.findAll();
        res.json(classes);
    } catch (error) {
        retornosHttp.ErroInterno(error, res);
    };

};

const getClasse = async (req, res) => {
    const { id } =  req.params;
    try {
        
        const classe = await Classe.findByPk(id);

        if (!classe){
            return retornosHttp.notFound(res);
        }

        res.json(classe);

    } catch (error) {
        retornosHttp.internalError(error, res);
    };
};

const deleteClasse = async (req, res) => {
    const {id} = req.params;
    try {
        
        const classe = await Classe.findByPk(id);

        if (!classe){
            return retornosHttp.notFound(res);
        }

        await classe.destroy(classe);
        res.json({ message: 'Classe deletada' });

    } catch (error) {
        retornosHttp.internalError(error, res);
    };
};

const createClasse = async (req, res) =>{
    const {cla_descricao} = req.body;
    try {
        const classe = await Classe.create({cla_descricao});
        res.status(201).json(classe);
    } catch (error) {
        retornosHttp.internalError(error, res);
    };

};

const updateClasse = async (req, res) => {
    const {id} = req.params;
    const {cla_descricao} = req.body;

    try {
    
        const classe = await Classe.findByPk(id);
        
        if (!classe) {
            return retornosHttp.notFound(res);
        }

        classe.cla_descricao = cla_descricao;
        await classe.save();
        return res.status(200).json();

    } catch (error) {
        retornosHttp.internalError(error, res);
    }
};

module.exports = {
    getClasses,
    getClasse,
    createClasse,
    updateClasse,
    deleteClasse
};

