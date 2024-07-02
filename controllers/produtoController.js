// controllers/productController.js
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const { Product, Classe } = require('../models');

const retornosHttp = require('../middleware/retornosHttp');

const getProducts = async (req, res) => {
  try {    
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    return retornosHttp.internalError(err, res);
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {    
        
    const product = await Product.findByPk(id, {
      include: [{
        model: Classe,
        as: 'classe',
        attributes: ['cla_descricao']
      }]

    });

    if (!product) {
      return retornosHttp.notFound(res);
    }

    res.json(product);
  } catch (err) {    
    retornosHttp.internalError(err, res);
  }
};

const createProduct = async (req, res) => {
  const { descricao, preco } = req.body;
  try {
    const product = await Product.create({ descricao, preco });
    res.status(201).json(product);
  } catch (err) {
    retornosHttp.internalError(err, res);    
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { descricao, preco } = req.body;

  try {    

    const product = await Product.findByPk(id);
    if (!product) {
      return retornosHttp.notFound(res);
    }

    product.descricao = descricao;
    product.preco = preco;
    await product.save();
    res.json(product);
  } catch (err) {
    retornosHttp.internalError(err, res);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {    

    const product = await Product.findByPk(id);
    if (!product) {
      return retornosHttp.notFound(res);
    }

    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err.message);
    return retornosHttp.internalError(err, res);
  }
};

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
      replacements.descProd = `%${descProd}%`; // exemplo de sanitização básica para evitar SQL wildcards
    }

    const products = await sequelize.query(sql, {
      type: QueryTypes.SELECT,
      replacements,
    });

    return res.json(products);
  } catch (error) {    
    return retornosHttp.internalError(error, res);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
};
