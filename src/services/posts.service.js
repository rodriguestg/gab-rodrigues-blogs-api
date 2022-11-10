const { BlogPost, PostCategory, Category } = require('../models');
const idJwtUtils = require('../utils/idJwt.utils');

const getAll = async () => {
  // console.log(User);
  const getUsers = await BlogPost.findAll();
  const users = getUsers.map((user) => ({
    id: user.id, displayName: user.displayName, email: user.email, image: user.image }));
  
  return users;
};

const getById = async (id) => {
  const getUser = await BlogPost.findByPk(id);
  if (!getUser) return undefined;
    
  const user = {
    id: getUser.id, displayName: getUser.displayName, email: getUser.email, image: getUser.image };
  
  return user;
};

// const getByIdAndEmail = async (id, email) => {
//   const user = await User.findOne({ where: { id, email } });

//   return user;
// };

const createPost = async (title, content, categoryIds, token) => {
  const userId = idJwtUtils(token);
  const newPost = await BlogPost.create({ title, content, userId });

  const getCategory = await Category.findByPk(categoryIds[0]);
  const getCategory2 = await Category.findByPk(categoryIds[1]);
  if (!getCategory || !getCategory2) return 'NOT_CATEGORY';

  await PostCategory.bulkCreate(
        categoryIds.map((category) => ({ postId: newPost.id, categoryId: category })),
        );

  return newPost;
};

// const updateUser = async (id, displayName, email, image) => {
//   const [updatedUser] = await User.update(
//     { displayName, email, image },
//     { where: { id } },
//   );

//   return updatedUser;
// };

const deleteUser = async (id) => {
  const user = await BlogPost.destroy(
    { where: { id } },
  );

  return user;
};

module.exports = {
  getAll,
  getById,
  // getByIdAndEmail,
  createPost,
  // updateUser,
  deleteUser,
};
