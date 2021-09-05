const express = require("express");
const {
  createTrip,
  getAllTrip,
  getDetailTrip,
  updateTrip,
  deleteTrip,
} = require("../controllers/trip.controller");
const {
  showError,
  checkNumber,
  checkNull,
  checkDate,
  checkFloat,
  checkExists,
} = require("../middlewares/validation/validation");
const { Trip } = require("../models");

const tripRouter = express.Router();

tripRouter.post(
  "/",
  checkNull(["fromStation", "toStation", "startTime", "price"]),
  checkNumber("fromStation"),
  checkNumber("toStation"),
  checkDate("startTime"),
  checkFloat("price"),
  showError,
  createTrip
);
tripRouter.get("/", getAllTrip);
tripRouter.get("/:id", checkExists(Trip), getDetailTrip);
tripRouter.put("/:id", checkExists(Trip), updateTrip);
tripRouter.delete("/:id", checkExists(Trip), deleteTrip);

module.exports = {
  tripRouter,
};
