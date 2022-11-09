const { User } = require('../models');

const getByIdAndEmail = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    return { type: 400, message: 'Invalid fields' };
}
  return { type: null, message: user };
};

module.exports = {
  getByIdAndEmail,
};
