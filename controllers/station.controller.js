const { Station } = require("../models");
const { SearchAllAttributes } = require("../components/SearchAllAttributes");
const { Op } = require("sequelize");

//get all station
const getAllStations = async (req, res) => {
  const { search } = req.query;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  try {
    const listStation = await Station.findAndCountAll({
      offset: page && limit ? (page - 1) * limit : null,
      limit: limit || null,
      where: search && {
        [Op.or]: SearchAllAttributes(["name", "address", "province"], search),
      },
    });
    res.status(200).send({
      data: listStation.rows,
      metadata: {
        page: page || 1,
        num_page: limit
          ? listStation.count % limit === 0
            ? Math.floor(listStation.count / limit)
            : Math.floor(listStation.count / limit) + 1
          : 1,
        count: listStation.count,
        limit: limit || listStation.count,
      },
    });
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
    res.status(204).send(deleteStation);
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
