const { postsServices } = require('../services');
const { mapError } = require('../utils/errorMap.js');
const idJwtUtils = require('../utils/idJwt.utils');

const getAll = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const posts = await postsServices.getAll(token);
    return res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ message: `Ocorreu um erro: ${e}` });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postsServices.getById(id);
  
    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ message: `Ocorreu um erro: ${e}` });
  }
};

// const getByIdAndEmail = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { email } = req.query;
//     const user = await usersServices.getByIdAndEmail(id, email);
  
//     if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

//     return res.status(200).json(user);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: error500Message });
//   }
// };

const createPost = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { title, content, categoryIds } = req.body;
    const newPost = await postsServices.createPost(title, content, categoryIds, token);
    if (newPost === 'NOT_CATEGORY') {
      return res.status(mapError('STATUS_DATA_INVALID'))
        .json({ message: 'one or more "categoryIds" not found' });
    }

    return res.status(201).json(newPost);
  } catch (e) {
    res.status(mapError('BAD')).json({ message: e });
  }
};

const updatePost = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const idUser = idJwtUtils(token);
    const { title, content } = req.body;
    const { id } = req.params;
    const updatedPost = await postsServices.updatePost(id, title, content, idUser);
    if (!updatedPost) return res.status(401).json({ message: 'Unauthorized user' });

    return res.status(200).json(updatedPost);    
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e });
  }
};

const deletePost = async (req, res) => {
  const token = req.header('Authorization');
  const idUser = idJwtUtils(token);
  const { id: idPost } = req.params;
  try {
    const post = await postsServices.deletePost(idPost, idUser);
    if (!post) return res.status(404).json({ message: 'Post does not exist' });
    if (post === 'Unauthorized') return res.status(401).json({ message: 'Unauthorized user' });

    return res.status(204).end();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getAll,
  getById,
  // getByIdAndEmail,
  createPost,
  updatePost,
  deletePost,
};
