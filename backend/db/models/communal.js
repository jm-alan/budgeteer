'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, { DataTypes, fn }) => {
  class Communal extends Model {
    static associate (models) {
      Communal.hasMany(models.RosterEntry, { foreignKey: 'communalId' });
      Communal.belongsToMany(models.User, {
        through: models.RosterEntry,
        foreignKey: 'communalId',
        otherKey: 'userId'
      });
      Communal.hasMany(models.Item, {
        foreignKey: 'accountId',
        constraints: false,
        scope: {
          accountType: 'Communal'
        }
      });
    }
  }
  Communal.init({
    name: DataTypes.STRING(100),
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: fn('now')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: fn('now')
    }
  }, {
    sequelize,
    modelName: 'Communal',
    tableName: 'Communals'
  });
  return Communal;
};
