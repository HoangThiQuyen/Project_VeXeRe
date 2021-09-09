"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Trips", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fromStation: {
        type: Sequelize.INTEGER,
        references: {
          model: "Stations",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      toStation: {
        type: Sequelize.INTEGER,
        references: {
          model: "Stations",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      startTime: {
        type: Sequelize.DATE,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Trips");
  },
};
