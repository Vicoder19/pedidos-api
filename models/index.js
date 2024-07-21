// models/index.js
const sequelize = require('../config/database');
const Produto = require('./produto');
const Classe = require('./classe');
const ItemPedido = require('./itemPedido');
const Pedido = require('./pedido');
const { Endereco } = require('./endereco');
const { Cliente } = require('./cliente');

Produto.belongsTo(Classe, {
  foreignKey: 'cla_id',
  targetKey: 'cla_id',
  as: 'classe'
});

Classe.hasMany(Produto, {
  foreignKey: 'cla_id',
  sourceKey: 'cla_id',
  as: 'produto'
});

Pedido.hasMany(ItemPedido, {
  foreignKey :  'ped_id',
  sourceKey: 'ped_id',
  as: 'items'
});

ItemPedido.belongsTo(Pedido, {
  foreignKey: 'ped_id',
  targetKey: 'ped_id',
  as: 'pedido'
});

Cliente.hasMany(Endereco, {
  foreignKey: 'cli_id',
  sourceKey: 'cli_id',
  as: 'endereco'
});

Endereco.belongsTo(Cliente, {
  foreignKey: 'cli_id',
  targetKey: 'cli_id',
  as: 'cliente'
});

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
};

module.exports = {
  Produto,
  Classe,
  Pedido,
  ItemPedido,
  Endereco,
  syncDatabase,
};
