require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = (token) => {
  try {
    const data = jwt.verify(token, secret);
    return data.data.userId;
  } catch (err) {
    return console.log({ message: err.message });
  }
};
