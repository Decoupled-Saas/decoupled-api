'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'master',
        description: 'Master',
      },
      {
        name: 'owner',
        description: 'Owner',
      },
      {
        name: 'admin',
        description: 'Admin',
      },
      {
        name: 'user',
        description: 'User',
      },
      {
        name: 'developer',
        description: 'Developer',
      },
    ], {})
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Roles', null, {})
  }
};
