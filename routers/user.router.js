const express = require("express");
const {
  register,
  getListUser,
  deleteUser,
  getDetailUser,
  login,
  uploadAvatar,
  updateUser,
} = require("../controllers/user.controller");
const { User } = require("../models");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const {
  checkExists,
  showError,
  checkNull,
} = require("../middlewares/validation/validation");
const { uploadImage } = require("../middlewares/upload/upload-image");

const userRouter = express.Router();

userRouter.post(
  "/register",
  checkNull(["name", "numberPhone", "email", "password"]),
  showError,
  register
);
userRouter.post("/login", checkNull(["email", "password"]), showError, login);
userRouter.get("/", getListUser);
userRouter.get("/:id", authenticate, checkExists(User), getDetailUser);
userRouter.put("/:id", updateUser);

userRouter.post(
  "/upload-image",
  authenticate,
  uploadImage("avatar"),
  uploadAvatar
);
userRouter.delete(
  "/:id",
  authenticate,
  authorize,
  checkExists(User),
  deleteUser
);

module.exports = { userRouter };
