const { Op } = require("sequelize");

const SearchAllAttributes = (attributes, search) => {
  console.log(attributes, search);
  let arr = attributes.map((ele) => ({
    [ele]: {
      [Op.like]: `%${search}%`,
    },
  }));
  return Object.assign({}, ...arr);
};

module.exports = { SearchAllAttributes };
