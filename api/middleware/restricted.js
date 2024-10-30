const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/secrets');

function restrict(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'token required' })
  }

  const actualToken = token.split(' ')[1];

  jwt.verify(actualToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'token invalid' });
    }
    req.user = decoded; 
    next(); 
  });
}

module.exports = restrict;
