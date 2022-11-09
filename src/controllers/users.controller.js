const { usersServices } = require('../services');
const { mapError } = require('../utils/errorMap.js');
const { tokenGenerate } = require('../utils/jwt.utils');

// const getAll = async (_req, res) => {
//   try {
//     const users = await usersServices.getAll();
//     return res.status(200).json(users);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: 'Ocorreu um erro' });
//   }
// };

// const getById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await usersServices.getById(id);
  
//     if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

//     return res.status(200).json(user);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: error500Message });
//   }
// };

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

// const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await usersServices.deleteUser(id);

//     return res.status(200).json({ message: 'Usuário excluído com sucesso!' });
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: error500Message });
//   }
// };

module.exports = {
  // getAll,
  // getById,
  // getByIdAndEmail,
  createUser,
  // updateUser,
  // deleteUser,
};
