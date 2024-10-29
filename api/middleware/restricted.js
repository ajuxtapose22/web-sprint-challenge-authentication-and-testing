const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../data/secrets'); 

module.exports = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1] // Get the token part
    : null;

  if (!token) {
    return res.status(401).json({ message: "token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "token invalid" });
    }
    req.decodedJwt = decoded;
    next();
  });
};
