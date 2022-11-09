require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'tokenpadrao';
    
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

const tokenGenerate = (id) => jwt.sign({ data: { userId: id } }, secret, jwtConfig);

module.exports = {
  tokenGenerate,
};
