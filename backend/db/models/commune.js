'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commune extends Model {
    static associate (models) {
      Commune.hasMany(models.RosterEntry, { foreignKey: 'communeId' });
      Commune.belongsToMany(models.User, {
        through: models.RosterEntry,
        foreignKey: 'communeId',
        otherKey: 'userId'
      });
      Commune.hasMany(models.Item, {
        foreignKey: 'accountId',
        constraints: false,
        scope: {
          accountType: 'Commune'
        }
      });
    }
  }
  Commune.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Commune'
  });
  return Commune;
};
