const { QueryTypes } = require('sequelize');

const { Classe } = require('../models');

const getClasses = async (req, res) => {
    try {
        const classes = await Classe.findAll();
        res.json(classes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }

};

module.exports = {getClasses};

