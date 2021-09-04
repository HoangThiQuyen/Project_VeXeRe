const authorize = (req, res, next) => {
  const { user } = req.user;
  if (["ADMIN", "SUPER_ADMIN"].findIndex((ele) => ele === user.type) !== -1) {
    next();
  } else {
    res.status(403).send({ message: "Forbidden!" });
  }
};

module.exports = { authorize };
