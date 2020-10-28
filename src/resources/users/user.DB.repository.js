const User = require('./user.model');

const getAllUsers = async () => await User.find({});
const getUserById = async id => await User.findOne({ _id: id });
const addUser = async entity => await User.create(entity);
const updateUser = async (id, entity) =>
  await User.updateOne({ _id: id }, entity);
const deleteUser = async id => {
  await User.deleteOne({ _id: id });
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};
