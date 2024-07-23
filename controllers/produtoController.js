const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const { Produto, Classe } = require('../models');

const retornosHttp = require('../middleware/retornosHttp');

const getProdutos = async (req, res) => {
  try {    
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (err) {
    return retornosHttp.internalError(err, res);
  }
};

const getProduto = async (req, res) => {
  const { id } = req.params;
  try {    
        
    const produto = await Produto.findByPk(id, {
      include: [{
        model: Classe,
        as: 'classe',
        attributes: ['cla_descricao']
      }]

    });

    if (!produto) {
      return retornosHttp.notFound(res);
    }

    res.json(produto);
  } catch (err) {    
    retornosHttp.internalError(err, res);
  }
};

const createProduto = async (req, res) => {
  const { descricao, preco } = req.body;
  try {
    const produto = await Produto.create({ descricao, preco });
    res.status(201).json(produto);
  } catch (err) {
    retornosHttp.internalError(err, res);
  }
};

const updateProduto = async (req, res) => {
  const { id } = req.params;
  const { descricao, preco } = req.body;

  try {    

    const produto = await Produto.findByPk(id);
    if (!produto) {
      return retornosHttp.notFound(res);
    }

    produto.descricao = descricao;
    produto.preco = preco;
    await produto.save();
    res.json(produto);
  } catch (err) {
    retornosHttp.internalError(err, res);
  }
};

const deleteProduto = async (req, res) => {
  const { id } = req.params;

  try {    

    const produto = await Produto.findByPk(id);
    if (!produto) {
      return retornosHttp.notFound(res);
    }

    await produto.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err.message);
    return retornosHttp.internalError(err, res);
  }
};

//função para testar query params
async function getProductByName(req, res) {
  const { precoMin, descProd } = req.query;

  if (!(precoMin) && !(descProd)){
    return retornosHttp.notFound(res);
  }

  try {
    let sql = `
      SELECT *
      FROM produtos
      WHERE 1=1
    `;

    const replacements = {};

    if (precoMin) {
      sql += ' AND prd_preco > :precoMin';
      replacements.precoMin = parseFloat(precoMin);
    }

    if (descProd) {
      sql += ' AND prd_descricao LIKE :descProd';
      replacements.descProd = `%${descProd}%`;  
    }

    const produtos = await sequelize.query(sql, {
      type: QueryTypes.SELECT,
      replacements,
    });

    return res.json(produtos);
  } catch (error) {    
    return retornosHttp.internalError(error, res);
  }
}

module.exports = {
  getProdutos,
  getProduto,
  createProduto,
  updateProduto,
  deleteProduto,
  getProductByName,
};
