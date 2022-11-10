const { BlogPost, PostCategory, Category, User } = require('../models');
const idJwtUtils = require('../utils/idJwt.utils');

const getAll = async () => {
const posts = await BlogPost.findAll({
  attributes: { exclude: ['userId'] },
  include: [
    {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
  ],
});
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({ where: { id },
    attributes: { exclude: ['userId'] },
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  if (!post) return undefined;
  
  return post;
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

const deletePost = async (idPost, idUser) => {
  const postSearch = await BlogPost.findOne({ where: { id: idPost } });
  console.log(idUser);
  console.log(postSearch);
  if (!postSearch) return undefined;
  if (postSearch.userId !== idUser) return 'Unauthorized';

  const post = await BlogPost.destroy(
    { where: { id: idPost } },
  );
  console.log(post);

  return post;
};

module.exports = {
  getAll,
  getById,
  // getByIdAndEmail,
  createPost,
  // updateUser,
  deletePost,
};
