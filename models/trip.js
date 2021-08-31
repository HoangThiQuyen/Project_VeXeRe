"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Station, Ticket, User, PassengerCarCompanies }) {
      // define association here
      this.belongsTo(Station, { foreignKey: "fromStation" });
      this.belongsTo(Station, { foreignKey: "toStation" });

      this.hasMany(Ticket, { foreignKey: "tripId" });
      this.belongsToMany(User, { through: Ticket });

      this.hasMany(PassengerCarCompanies, { foreignKey: "tripId" });
    }
  }
  Trip.init(
    {
      startTime: DataTypes.DATE,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );
  return Trip;
};
