const { User } = require('../models');

const getAll = async () => {
  // console.log(User);
  const getUsers = await User.findAll();
  const users = getUsers.map((user) => ({
    id: user.id, displayName: user.displayName, email: user.email, image: user.image }));
  
  return users;
};

const getById = async (id) => {
  const getUser = await User.findByPk(id);
  if (!getUser) return undefined;
    
  const user = {
    id: getUser.id, displayName: getUser.displayName, email: getUser.email, image: getUser.image };
  
  return user;
};

const createUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

const deleteUser = async (id) => {
  const user = await User.destroy(
    { where: { id } },
  );

  return user;
};

module.exports = {
  getAll,
  getById,
  createUser,
  deleteUser,
};
