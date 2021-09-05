const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const accessToken = req.header("token");
  try {
    //mã hóa token
    const decode = jwt.verify(accessToken, "hoangquyen8599");
    if (decode) {
      //gửi decode lên reques có key tên là user
      req.user = decode;
      return next();
    } else {
      res.status(401).send({ message: "Unauthorized!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { authenticate };
