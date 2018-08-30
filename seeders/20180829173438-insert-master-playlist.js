'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Playlists', [{
      namePlaylist: 'K-POP',
      description: 'K-POP merajai',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      namePlaylist: 'EDM',
      description: 'Ajep-ajep',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      namePlaylist: 'Jazz',
      description: 'Classic',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      namePlaylist: 'Country',
      description: 'Mendayu',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
