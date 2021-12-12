'use strict';

const { v4 } = require("uuid");
const { PasswordHelpers } = require("../../../../../dist/src/infrastructure/security/password");
const passwordHelpers = new PasswordHelpers();

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const password = 'passwordTest@1';
    const hashedPassword = await passwordHelpers.hashPassword(password);
    await queryInterface.bulkInsert('users', [
      {
        uuid: v4(),
        email: 'john@example.com',
        hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {});
  }
};
