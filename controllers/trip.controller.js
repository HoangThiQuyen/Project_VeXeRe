const { AssociationDetail } = require("../components/AssociationDetail");
const { Trip, Station } = require("../models");

const attributes = ["id", "name", "address", "province"];

//create trip
const createTrip = async (req, res) => {
  try {
    const { fromStation, toStation, startTime, price } = req.body;
    const data = await Trip.create({
      fromStation,
      toStation,
      startTime,
      price,
    });

    const newTrip = await Trip.findOne({
      where: { id: data.id },
      include: [
        AssociationDetail(Station, "fromStation_info", attributes),
        AssociationDetail(Station, "toStation_info", attributes),
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(201).send(newTrip);
  } catch (error) {
    res.status(500).send(error);
  }
};

//get all trip
const getAllTrip = async (req, res) => {
  const { search } = req.query;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  try {
    const tripList = await Trip.findAndCountAll({
      offset: page && limit ? (page - 1) * limit : null,
      limit: limit || null,
      where: search && {
        [Op.or]: SearchAllAttributes(
          ["fromStation", "toStation", "startTime", "price"],
          search
        ),
      },
      include: [
        AssociationDetail(Station, "fromStation_info", attributes),
        AssociationDetail(Station, "toStation_info", attributes),
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      data: tripList.rows,
      metadata: {
        page: page || 1,
        num_page: limit
          ? tripList.count % limit === 0
            ? Math.floor(tripList.count / limit)
            : Math.floor(tripList.count / limit) + 1
          : 1,
        count: tripList.count,
        limit: limit || tripList.count,
      },
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// get detail trip
const getDetailTrip = async (req, res) => {
  const { id } = req.params;
  try {
    const tripDetail = await Trip.findOne({
      where: { id },
      include: [
        AssociationDetail(Station, "fromStation_info", attributes),
        AssociationDetail(Station, "toStation_info", attributes),
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).send(tripDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

//update trip
const updateTrip = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  try {
    await Trip.update(data, { where: { id } });
    const updateTrip = await Trip.findOne({
      where: { id },
      include: [
        AssociationDetail(Station, "fromStation_info", attributes),
        AssociationDetail(Station, "toStation_info", attributes),
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).send(updateTrip);
  } catch (error) {
    res.status(500).send(error);
  }
};

//delete trip
const deleteTrip = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTrip = await Trip.findOne({
      where: { id },
      include: [
        AssociationDetail(Station, "fromStation_info", attributes),
        AssociationDetail(Station, "toStation_info", attributes),
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    await Trip.destroy({ where: { id } });
    res.status(200).send(deleteTrip);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createTrip,
  getAllTrip,
  getDetailTrip,
  updateTrip,
  deleteTrip,
};
