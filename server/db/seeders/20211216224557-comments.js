'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Comments', [
     { name: 'Sean Cotter', title: 'This is cool!', rating: 5, comment: 'This is a comment', createdAt: new Date(), updatedAt: new Date() },
     { name: 'Wifey', title: 'This is cool!', rating: 5, comment: 'This is a comment', createdAt: new Date(), updatedAt: new Date() },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
