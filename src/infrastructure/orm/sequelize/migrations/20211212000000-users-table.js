'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      hashedPassword: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('users', ['email', 'uuid']);
  },
  down: async (queryInterface) => {
    await queryInterface.removeIndex('users', ['users_email', 'users_uuid']);
    await queryInterface.dropTable('users');
  }
};