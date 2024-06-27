// controllers/productController.js
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const { Product } = require('../models');

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const createProduct = async (req, res) => {
  const { descricao, preco } = req.body;
  try {
    const product = await Product.create({ descricao, preco });
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { descricao, preco } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    product.descricao = descricao;
    product.preco = preco;
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

async function getProductByName(req, res) {
  const { precoMin, descProd } = req.query;

  if (!(precoMin) && !(descProd)){
    return res.status(404).send('Product not found');
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
    console.error('Error executing custom SQL:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
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
