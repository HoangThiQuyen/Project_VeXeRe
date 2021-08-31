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
} = require("../middlewares/validation/validation");

const tripRouter = express.Router();

tripRouter.post(
  "/",
  checkNull(["fromStation", "toStation", "startTime", "price"]),
  checkNumber("fromStation"),
  checkNumber("toStation"),
  checkDate("startTime"),
  showError,
  createTrip
);
tripRouter.get("/", getAllTrip);
tripRouter.get("/:id", getDetailTrip);
tripRouter.put("/:id", updateTrip);
tripRouter.delete("/:id", deleteTrip);

module.exports = {
  tripRouter,
};
