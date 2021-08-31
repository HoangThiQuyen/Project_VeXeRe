const { body, check, validationResult } = require("express-validator");

const checkNull = (data) =>
  data.map((ele) => body(ele, `${ele} does not Empty`).not().isEmpty());

const checkNumber = (item) => check(item, `${item} is Number`).isNumeric();

const checkDate = (item) =>
  check(item, `${item} is Date`)
    // .isISO8601("YYYY-MM-DD")
    .matches(
      "/^([+-]?d{4}(?!d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]d|0[1-9]|3[01]))?|W([0-4]d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]d|[12]d{2}|3([0-5]d|6[1-6])))([Ts]((([01]d|2[0-3])((:?)[0-5]d)?|24:?00)([.,]d+(?!:))?)?(\17[0-5]d([.,]d+)?)?([zZ]|([+-])([01]d|2[0-3]):?([0-5]d)?)?)?)?$/"
    );

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

module.exports = { checkNull, showError, checkExists, checkNumber, checkDate };
