// models/index.js
const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./produto');

User.hasMany(Product, {
  foreignKey: 'user_id',
  sourceKey: 'prd_id',
  as: 'products'
});

Product.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'prd_id',
  as: 'user'
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
  User,
  Product,
  syncDatabase,
};
