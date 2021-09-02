const { Trip } = require("../models");

//create trip
const createTrip = async (req, res) => {
  const { fromStation, toStation, startTime, price } = req.body;
  const newTrip = await Trip.create({
    fromStation,
    toStation,
    startTime,
    price,
  });

  res.status(201).send(newTrip);
};

//get all trip
const getAllTrip = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  try {
    const tripListLimit = await Trip.findAndCountAll(
      page && limit
        ? {
            offset: (page - 1) * limit,
            limit,
          }
        : {}
    );

    res.status(200).send(
      page && limit
        ? {
            data: tripListLimit.rows,
            metadata: {
              page: page,
              num_page:
                tripListLimit.count % limit === 0
                  ? Math.floor(tripListLimit.count / limit)
                  : Math.floor(tripListLimit.count / limit) + 1,
              count: tripListLimit.count,
              limit,
            },
          }
        : { data: tripListLimit.rows }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

// get detail trip
const getDetailTrip = async (req, res) => {
  const { id } = req.params;
  try {
    const tripDetail = await Trip.findOne({ where: { id } });
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
    const updateTrip = await Trip.findOne({ where: { id } });
    res.status(200).send(updateTrip);
  } catch (error) {
    res.status(500).send(error);
  }
};

//delete trip
const deleteTrip = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTrip = await Trip.findOne({ where: { id } });
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
