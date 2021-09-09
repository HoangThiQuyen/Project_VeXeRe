"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Trips",
      [
        {
          fromStation: 1,
          toStation: 3,
          startTime: "2021-07-14 08:30:00",
          price: 220000,
          createdAt: "2021-07-14 09:30:00",
          updatedAt: "2021-07-14 09:30:00",
        },
        {
          fromStation: 1,
          toStation: 4,
          startTime: "2021-07-13 12:20:00",
          price: 250000,
          createdAt: "2021-07-14 10:30:00",
          updatedAt: "2021-07-14 10:30:00",
        },
        {
          fromStation: 2,
          toStation: 3,
          startTime: "2021-07-15 07:10:00",
          price: 220000,
          createdAt: "2021-07-15 07:26:00",
          updatedAt: "2021-07-15 07:26:00",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
