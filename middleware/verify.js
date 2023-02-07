const jwt = require("jsonwebtoken");

const verifyMW = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(400).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.json(err);
  }
};

const adminCheck = (req, res, next) => {
  // verifyTokenAndAdmin is a middleware
  verifyMW(req, res, () => {
    const {isAdmin} = req.user.user
    if (isAdmin) {
          next();
    } else {
      res.status(403).json("Only admins can acces to this route");
    }
  });
};

module.exports = { verifyMW, adminCheck };
