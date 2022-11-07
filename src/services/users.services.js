const { User } = require('../models');

const getAll = async () => {
  // console.log(User);
  const users = await User.findAll();

  return users;
};

// const getById = async (id) => {
//   const user = await User.findByPk(id);

//   return user;
// };

// const getByIdAndEmail = async (id, email) => {
//   const user = await User.findOne({ where: { id, email } });

//   return user;
// };

// const createUser = async (fullName, email) => {
//   const newUser = await User.create({ fullName, email });

//   return newUser;
// };

// const updateUser = async (id, displayName, email, image) => {
//   const [updatedUser] = await User.update(
//     { displayName, email, image },
//     { where: { id } },
//   );

//   return updatedUser;
// };

// const deleteUser = async (id) => {
//   const user = await User.destroy(
//     { where: { id } },
//   );

//   return user;
// };

module.exports = {
  getAll,
  // getById,
  // getByIdAndEmail,
  // createUser,
  // updateUser,
  // deleteUser,
};
