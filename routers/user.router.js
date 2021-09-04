const express = require("express");
const {
  register,
  getListUser,
  deleteUser,
  getDetailUser,
  login,
} = require("../controllers/user.controller");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/", authenticate, authorize, getListUser);
userRouter.get("/:id", authenticate, getDetailUser);
userRouter.delete("/:id", authenticate, authorize, deleteUser);

module.exports = { userRouter };
