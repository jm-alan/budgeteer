'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Items', 'details', {
      type: Sequelize.DataTypes.TEXT
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Items', 'details');
  }
};
