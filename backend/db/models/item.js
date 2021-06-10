'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    async getAccount (options) {
      return await this[`get${this.itemType}`](options);
    }

    static associate (models) {
      Item.belongsTo(models.Personal, {
        foreignKey: 'accountId',
        constraints: false
      });
      Item.belongsTo(models.Commune, {
        foreignKey: 'accountId',
        constraints: false
      });
      Item.belongsTo(models.User, { foreignKey: 'ownerId' });
      Item.addHook('afterFind', res => {
        if (!Array.isArray(res)) res = [res];
        for (const item of res) item.account = item.Personal || item.Commune;
      });
    }
  }
  Item.init({
    name: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    income: DataTypes.BOOLEAN,
    accountType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item'
  });
  return Item;
};
