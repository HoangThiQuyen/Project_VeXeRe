"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ PassengerCarCompanies, Seat }) {
      // define association here
      this.belongsTo(PassengerCarCompanies, {
        foreignKey: "passengerCarCompanyId",
      });
      this.hasMany(Seat, { foreignKey: "vehicleId", onDelete: "CASCADE" });
    }
  }
  Vehicle.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Vehicle",
    }
  );
  return Vehicle;
};
