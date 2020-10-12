const { NOT_FOUND_ENTITY_ERROR } = require('../../errors/error');
const DBinMemory = require('../../utils/DBinMemory');

const TABLE_NAME = 'Users';
const ENTITY_NAME = 'user';

const getAllUsers = async () => await DBinMemory.getAllTable(TABLE_NAME);

const getUserById = async id => await DBinMemory.getEntityById(TABLE_NAME, id);

const addUser = async user => await DBinMemory.addEntity(TABLE_NAME, user);

const updateUser = async (id, user) =>
  await DBinMemory.updateEntity(TABLE_NAME, id, user);

const deleteUser = async id => {
  const user = await DBinMemory.deleteEntity(TABLE_NAME, id);
  if (!user) {
    throw new NOT_FOUND_ENTITY_ERROR(ENTITY_NAME, { id });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};
