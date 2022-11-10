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
    const user = await postsServices.getById(id);
  
    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
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

// const updateUser = async (req, res) => {
//   try {
//     const { fullName, email } = req.body;
//     const { id } = req.params;
//     const updatedUser = await usersServices.updateUser(id, fullName, email);

//     if (!updatedUser) return res.status(404).json({ message: 'Usuário não encontrado' });

//     return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });    
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: error500Message });
//   }
// };

const deleteUser = async (req, res) => {
  const token = req.header('Authorization');
  const id = idJwtUtils(token);
  try {
    await postsServices.deleteUser(id);

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
  // updateUser,
  deleteUser,
};
