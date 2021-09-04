const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const accessToken = req.header("token");
  try {
    if (accessToken) {
      //mã hóa token
      const decode = jwt.verify(accessToken, "hoang-quyen-8599");
      if (decode) {
        //gửi decode lên reques có key tên là user
        req.user = decode;
        return next();
      } else {
        res.status(401).send({ message: "Unauthorized!" });
      }
    } else {
      res
        .status(400)
        .send({ message: "Bad Request! You don't have access token" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { authenticate };
