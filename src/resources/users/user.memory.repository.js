const { NOT_FOUND_ENTITY_ERROR } = require('../../errors/error');
const DB = require('../../utils/DBinMemory');

const TABLE_NAME = 'Users';
const ENTITY_NAME = 'user';

const getAllUsers = async () => await DB.getAllTable(TABLE_NAME);

const getUserById = async id => {
  const entity = await DB.getEntityById(TABLE_NAME, id);
  if (!entity) {
    throw new NOT_FOUND_ENTITY_ERROR(ENTITY_NAME, { id });
  }

  return entity;
};

const addUser = async user => await DB.addEntity(TABLE_NAME, user);

const updateUser = async (id, user) => {
  const updatedUser = await DB.updateEntity(TABLE_NAME, id, user);
  if (!updatedUser) {
    throw new NOT_FOUND_ENTITY_ERROR(ENTITY_NAME, { id });
  }

  return updatedUser;
};

const deleteUser = async id => {
  if (!(await DB.deleteEntity(TABLE_NAME, id))) {
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
