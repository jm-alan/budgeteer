'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personal extends Model {
    static associate (models) {
      Personal.belongsTo(models.User, { foreignKey: 'ownerId' });
      Personal.hasMany(models.Item, {
        foreignKey: 'accountId',
        constraints: false,
        scope: {
          accountType: 'personal'
        }
      });
    }
  }
  Personal.init({
    name: DataTypes.STRING,
    balance: DataTypes.DECIMAL,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Personal'
  });
  return Personal;
};
