// models/index.js
const sequelize = require('../config/database');
const Product = require('./produto');
const Classe = require('./classe');
const ItemPedido = require('./itemPedido');
const Pedido = require('./pedido');

Product.belongsTo(Classe, {
  foreignKey: 'cla_id',
  targetKey: 'cla_id',
  as: 'classe'
});

Classe.hasMany(Product, {
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
})

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
};

module.exports = {
  Product,
  Classe,
  Pedido,
  ItemPedido,
  syncDatabase,
};
