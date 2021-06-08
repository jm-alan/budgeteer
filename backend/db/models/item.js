'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate (models) {
      Item.belongsTo(models.Account, { foreignKey: 'accountId' });
      Item.belongsTo(models.User, { foreignKey: 'ownerId' });
    }
  }
  Item.init({
    name: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    income: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Item'
  });
  return Item;
};
