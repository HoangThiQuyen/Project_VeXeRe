const express = require("express");
const { stationRouter } = require("./station.router");
const { tripRouter } = require("./trip.router");

const rootRouter = express.Router();

rootRouter.use("/stations", stationRouter);
rootRouter.use("/trips", tripRouter);

module.exports = {
  rootRouter,
};
