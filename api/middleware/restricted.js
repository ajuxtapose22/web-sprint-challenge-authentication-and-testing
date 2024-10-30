const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/secrets');




function restrict(req, res, next) {
  const token = req.headers.authorization;

  // Check if the Authorization header is present and starts with 'Bearer '
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'token required' });
  }

  const actualToken = token.split(' ')[1]; // Extract the token
 

  // Verify the token
  jwt.verify(actualToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'token invalid' });
    }
    req.user = decoded; // Store the decoded token in req.user
    console.log('NUM 2 Received Token:', token);

    next(); // Proceed to the next middleware/route handler
  });
}

module.exports = restrict; // Export the middleware for use in other files
