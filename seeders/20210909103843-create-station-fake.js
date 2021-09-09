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
      "Stations",
      [
        {
          name: "Bến Xe Miền Đông",
          address:
            " 292 Đinh Bộ Lĩnh, F26, quận Bình Thạnh, Thành phố Hồ Chí Minh",
          province: "Hồ Chí Minh",
          createdAt: "2021-07-10 09:16:18",
          updatedAt: "2021-07-10 09:16:20",
        },
        {
          name: "Bến Xe An Sương",
          address:
            "Ngã tư An Sương, quốc lộ 22, Bà Điểm, Hóc Môn, Thành phố Hồ Chí Minh.",
          province: "Hồ Chí Minh",
          createdAt: "2021-07-10 09:16:18",
          updatedAt: "2021-07-10 09:16:20",
        },
        {
          name: "Bến Xe Buôn Ma Thuột",
          address: "71 Nguyễn Chí Thanh, TP Buôn Ma Thuột",
          province: "ĐakLak",
          createdAt: "2021-07-10 09:16:18",
          updatedAt: "2021-07-10 09:16:20",
        },
        {
          name: "Bến Xe Ninh Thuận",
          address:
            "Quốc lộ 1A, số 52, phường Đài Sơn, TP Phan Rang Tháp Chàm, tỉnh Ninh Thuận ",
          province: "Ninh Thuận",
          createdAt: "2021-07-12 09:16:18",
          updatedAt: "2021-07-12 09:16:20",
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
