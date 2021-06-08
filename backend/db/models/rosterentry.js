'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RosterEntry extends Model {
    static associate (models) {
      RosterEntry.belongsTo(models.User, { foreignKey: 'userId' });
      RosterEntry.belongsTo(models.Commune, { foreignKey: 'communeId' });
    }
  }
  RosterEntry.init({
    communeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RosterEntry'
  });
  return RosterEntry;
};
