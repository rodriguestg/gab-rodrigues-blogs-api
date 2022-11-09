const { loginServices } = require('../services');
const { mapError } = require('../utils/errorMap.js');
const { tokenGenerate } = require('../utils/jwt.utils');

const getByIdAndEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { type, message } = await loginServices.getByIdAndEmail(email, password);

    const token = tokenGenerate(message.id);

    if (type) return res.status(type).json({ message });
    return res.status(200).json({ token });
  } catch (e) {
    res.status(mapError('BAD')).json({ message: e });
  }
};

module.exports = {
  getByIdAndEmail,
};
