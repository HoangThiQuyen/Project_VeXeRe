"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Trip }) {
      // define association here

      this.hasMany(Trip, { foreignKey: "fromStation", as: "fromStation_info" });
      this.hasMany(Trip, { foreignKey: "toStation", as: "toStation_info" });
    }
  }
  Station.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Station",
    }
  );
  return Station;
};
