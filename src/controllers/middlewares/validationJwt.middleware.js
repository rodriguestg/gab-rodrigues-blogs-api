require('dotenv/config');
const jwt = require('jsonwebtoken');
// const { UserService } = require('../../services');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    jwt.verify(token, secret);

    next();
  } catch (err) {
    if (err.message === 'jwt malformed') {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    return res.status(401).json({ message: err.message });
  }
};
