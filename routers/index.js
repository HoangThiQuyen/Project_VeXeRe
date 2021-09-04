const express = require("express");
const { stationRouter } = require("./station.router");
const { tripRouter } = require("./trip.router");
const { userRouter } = require("./user.router");

const rootRouter = express.Router();

rootRouter.use("/stations", stationRouter);
rootRouter.use("/trips", tripRouter);
rootRouter.use("/users", userRouter);

module.exports = {
  rootRouter,
};
