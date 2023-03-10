const { usersServices } = require('../services');
const { mapError } = require('../utils/errorMap.js');
const idJwtUtils = require('../utils/idJwt.utils');
const { tokenGenerate } = require('../utils/jwt.utils');

const getAll = async (_req, res) => {
  try {
    const users = await usersServices.getAll();
    return res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: `Ocorreu um erro: ${e}` });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersServices.getById(id);
  
    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: `Ocorreu um erro: ${e}` });
  }
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await usersServices.createUser(displayName, email, password, image);

    const token = tokenGenerate(newUser.id);
    return res.status(201).json({ token });
  } catch (e) {
    if (e.errors[0].message === 'users.email must be unique') {
       return res.status(mapError('EMAIL_DUPLICATED')).json({ message: 'User already registered' });
    }
    res.status(mapError('BAD')).json({ message: e.errors[0].message });
  }
};

const deleteUser = async (req, res) => {
  const token = req.header('Authorization');
  const id = idJwtUtils(token);
  try {
    await usersServices.deleteUser(id);

    return res.status(204).end();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getAll,
  getById,
  createUser,
  deleteUser,
};
