const express = require("express");
const {
  getAllStations,
  createStation,
  getDetailStation,
  updateStation,
  deleteStation,
} = require("../controllers/station.controller");
const {
  checkNull,
  checkExists,
  showError,
} = require("../middlewares/validation/validation");
const { Station } = require("../models");

const stationRouter = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Station:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: primary key
 *        name:
 *          type: string
 *          description: name stations
 *        address:
 *          type: string
 *          description: address stations
 *        province:
 *          type: string
 *          description: province stations
 *      example:
 *        id:1,
 *        name:"Ben xe mien dong"
 *        address:"Dinh bo linh, Binh Thanh"
 *        province:"Ho Chi Minh"
 *
 */

/**
 * @swagger
 * tags:
 *   name: Stations
 *   description: Manage Station
 */

/**
 * @swagger
 * /api/stations:
 *  get:
 *    tags: [Stations]
 *    description: Get All
 *    parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: success
 */

stationRouter.get("/", getAllStations);
stationRouter.post(
  "/",
  checkNull(["name", "address", "province"]),
  showError,
  createStation
);
stationRouter.get("/:id", checkExists(Station), getDetailStation);
stationRouter.put("/:id", checkExists(Station), updateStation);
stationRouter.delete("/:id", checkExists(Station), deleteStation);
module.exports = {
  stationRouter,
};
