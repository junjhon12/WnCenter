const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // 1. Get token from header
  const token = req.header('x-auth-token');

  // 2. Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // 3. Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Add the user from the payload to the request object
    req.user = decoded.user;
    next(); // Move on to the next function
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};