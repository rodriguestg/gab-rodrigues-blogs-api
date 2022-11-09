const { categorieServices } = require('../services');
const { mapError } = require('../utils/errorMap.js');

const getAll = async (_req, res) => {
  try {
    const users = await categorieServices.getAll();
    return res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: `Ocorreu um erro: ${e}` });
  }
};

const createCategories = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await categorieServices.createCategories(name);
    if (!newCategory) {
      return res.status(mapError('STATUS_DATA_INVALID')).json({ message: '"name" is required' });
    }
    return res.status(201).json(newCategory);
  } catch (e) {
    res.status(mapError('BAD')).json({ message: e.errors[0].message });
  }
};

module.exports = {
  getAll,
  createCategories,
};
