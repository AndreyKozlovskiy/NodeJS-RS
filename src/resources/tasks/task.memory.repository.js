const { NOT_FOUND_ENTITY_ERROR } = require('../../errors/error');
const DB = require('../../utils/DBinMemory');

const TABLE_NAME = 'Tasks';
const ENTITY_NAME = 'task';

const getAllTasks = async () => await DB.getAllTable(TABLE_NAME);

const getTaskById = async id => await DB.getEntityById(TABLE_NAME, id);

const addTask = async task => await DB.addEntity(TABLE_NAME, task);

const updateTask = async (id, task) =>
  await DB.updateEntity(TABLE_NAME, id, task);

const deleteTask = async id => {
  if (!(await DB.deleteEntity(TABLE_NAME, id))) {
    throw new NOT_FOUND_ENTITY_ERROR(ENTITY_NAME, id);
  }
};

const deleteTaskByBoardId = async boardId =>
  await DB.deleteAll(TABLE_NAME, { boardId });

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  deleteTask,
  updateTask,
  deleteTaskByBoardId
};
