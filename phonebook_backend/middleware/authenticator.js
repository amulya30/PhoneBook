require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authUser = async function (req, res, next) {
  const token = req.header("auth-token");
  console.log(token);
  if (!token) {
    res
      .status(401)
      .json({ msg: "Please login again", errReason: "Request without token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET_KEY);
    console.log(data);
    req.id = data;
    next();
  } catch (error) {
    res.status(401).json({ msg: "You are not authorised" });
  }
};

module.exports = authUser;
