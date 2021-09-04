"use strict";
const { Model } = require("sequelize");
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Station, Ticket, User, PassengerCarCompanies }) {
      // define association here
      this.belongsTo(Station, {
        foreignKey: "fromStation",
        as: "fromStation_info",
      });
      this.belongsTo(Station, {
        foreignKey: "toStation",
        as: "toStation_info",
      });

      this.hasMany(Ticket, { foreignKey: "tripId" });
      this.belongsToMany(User, { through: Ticket });

      this.hasMany(PassengerCarCompanies, { foreignKey: "tripId" });
    }
  }
  Trip.init(
    {
      startTime: {
        type: DataTypes.DATE,
        get: function () {
          let time = this.getDataValue("startTime");
          if (moment(time, moment.ISO_8601, true).isValid()) {
            return moment(this.getDataValue("startTime")).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          } else {
            return time;
          }
        },
      },
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );
  return Trip;
};
