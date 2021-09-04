const { User } = require("../models");
const gravatar = require("gravatar");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, numberPhone, email, password, type } = req.body;
  try {
    // tạo avatar mặc định
    const avatarUrl = gravatar.url(
      email,
      { s: "100", r: "x", d: "retro" },
      false
    );

    // tạo ra 1 chuỗi ngẫu nhiên có nguyên tắc
    const salt = bcryptjs.genSaltSync(10);
    //mã hóa chuỗi
    const hashPassword = bcryptjs.hashSync(password, salt);

    const newUser = await User.create({
      name,
      numberPhone,
      email,
      password: hashPassword,
      avatar: avatarUrl,
      type: type || "CLIENT",
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  const userNotPassword = { ...user.dataValues };
  delete userNotPassword.password;
  if (user) {
    //giải mã password nếu đúng trả về true
    const isAuth = bcryptjs.compareSync(password, user.password); // true
    if (isAuth) {
      //tạo token( chuỗi mã hóa, key mã hóa, thời lượng tồn tại của token)
      const accessToken = jwt.sign(
        { email: user.email, type: user.type },
        "hoang-quyen-8599",
        { expiresIn: "1h" }
      );
      res.status(200).send({
        message: "Success",
        data: { ...userNotPassword, accessToken },
      });
    } else {
      res.status(400).send({ message: "Fail" });
    }
  } else {
    res.status(404).send({ message: "Not Found Account" });
  }
};

const getListUser = async (req, res) => {
  try {
    const listUser = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).send(listUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userDetail = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
    res.status(200).send(userDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findOne({ where: { id } });
    await User.destroy({ where: { id } });
    res.status(204).send(deleteUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { register, getListUser, deleteUser, getDetailUser, login };
