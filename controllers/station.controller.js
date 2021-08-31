const { Station } = require("../models");

//get all station
const getAllStations = async (req, res) => {
  try {
    const listStation = await Station.findAll();
    res.status(200).send(listStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

//get detail staion
const getDetailStation = async (req, res) => {
  const { id } = req.params;
  try {
    const detailStation = await Station.findOne({ where: { id } });
    res.status(200).send(detailStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

// create station
const createStation = async (req, res) => {
  const { name, address, province } = req.body;
  try {
    const newStation = await Station.create({ name, address, province });
    res.status(201).send(newStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

//update station
const updateStation = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  try {
    await Station.update(data, { where: { id } });
    const updateStation = await Station.findOne({ where: { id } });
    res.status(200).send(updateStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

//delete Station
const deleteStation = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteStation = await Station.findOne({ where: { id } });
    await Station.destroy({ where: { id } });
    res.status(200).send(deleteStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllStations,
  createStation,
  updateStation,
  getDetailStation,
  deleteStation,
};
