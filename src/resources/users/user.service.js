const userRepository = require('./user.DB.repository');
const taskRepository = require('../tasks/task.DB.repository');

const getAllUsers = async () => await userRepository.getAllUsers();
const getUserById = async id => await userRepository.getUserById(id);
const addUser = async entity => await userRepository.addUser(entity);
const updateUser = async (id, entity) =>
  await userRepository.updateUser(id, entity);
const deleteUser = async id => {
  await userRepository.deleteUser(id);
  await taskRepository.unassignAll(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};
