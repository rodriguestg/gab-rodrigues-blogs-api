const { Category } = require('../models');

const getAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

const createCategories = async (name) => {
  if (!name) return undefined;
  const newCategory = await Category.create({ name });

  return newCategory;
};

module.exports = {
  getAll,
  createCategories,
};
