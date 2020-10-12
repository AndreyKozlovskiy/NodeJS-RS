const userRepository = require('./user.memory.repository');

const getAllUsers = () => userRepository.getAllUsers();
const getUserById = id => userRepository.getUserById(id);
const addUser = user => userRepository.addUser(user);
const updateUser = (id, user) => userRepository.updateUser(id, user);
const deleteUser = id => userRepository.deleteUser(id);

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};
