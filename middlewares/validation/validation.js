const { body, check, validationResult } = require("express-validator");

const checkNull = (data) =>
  data.map((ele) => body(ele, `${ele} does not Empty`).not().isEmpty());

const checkNumber = (item) => check(item, `${item} is Number`).isInt();
const checkFloat = (item) => check(item, `${item} is Float`).isFloat();

const checkDate = (item) =>
  check(item, `${item} is Date format 'YYYY-MM-DD hh:mm:ss'`).isISO8601();
const checkExists = (Model) => {
  return async (req, res, next) => {
    const { id } = req.params;
    const item = await Model.findOne({ where: { id } });
    if (item) {
      next();
    } else {
      res.status(404).send({ error: `Not Found Id:${id}` });
    }
  };
};
const showError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array().map((ele) => ele.msg) });
    return;
  } else {
    next();
  }
};

module.exports = {
  checkNull,
  showError,
  checkExists,
  checkNumber,
  checkDate,
  checkFloat,
};
