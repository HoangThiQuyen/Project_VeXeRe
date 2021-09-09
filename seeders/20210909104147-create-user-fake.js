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
      "Users",
      [
        {
          name: "Hoàng Quyên",
          email: "hoangquyen11@gmail.com",
          password: "123123",
          numberPhone: "0987678543",
          avatar:
            "https://i.pinimg.com/originals/a1/8b/a7/a18ba79af4285ec947b1e4aa2830f30d.jpg",
          type: "admin",
          createdAt: "2021-07-14 08:30:00",
          updatedAt: "2021-07-14 08:30:00",
        },
        {
          name: "Khắc Vũ",
          email: "khacvu05@gmail.com",
          password: "123123",
          numberPhone: "0956785321",
          avatar:
            "https://i.pinimg.com/originals/a1/8b/a7/a18ba79af4285ec947b1e4aa2830f30d.jpg",
          type: "client",
          createdAt: "2021-07-14 08:30:00",
          updatedAt: "2021-07-14 08:30:00",
        },
        {
          name: "Thị Quyên",
          email: "thiquyen@gmail.com",
          password: "123123",
          numberPhone: "0983654723",
          avatar:
            "https://i.pinimg.com/originals/a1/8b/a7/a18ba79af4285ec947b1e4aa2830f30d.jpg",
          type: "client",
          createdAt: "2021-07-14 08:30:00",
          updatedAt: "2021-07-14 08:30:00",
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
