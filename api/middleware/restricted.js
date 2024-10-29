const jwt = require('jsonwebtoken');
const { JWT_SECRET  } = require('../config/secrets');

module.exports = (req, res, next) => {
  console.log('Authorization Header:', req.headers.authorization);
  const token = req.headers.authorization; // Expect token in headers

  if (token && token.startsWith('Bearer ')) {
    const tokenValue = token.split(' ')[1]; // Extract token value after "Bearer"

    jwt.verify(tokenValue, JWT_SECRET , (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        req.user = decoded; // Attach decoded token info to request
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

