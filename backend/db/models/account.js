'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate (models) {
      Account.belongsTo(models.User, { foreignKey: 'ownerId' });
      Account.hasMany(models.Item, { foreignKey: 'accountId' });
    }
  }
  Account.init({
    name: DataTypes.STRING,
    balance: DataTypes.DECIMAL,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account'
  });
  return Account;
};
