const taskRepository = require('./task.DB.repository');

const getAllTasks = async () => await taskRepository.getAllTasks();
const getTaskById = async id => await taskRepository.getTaskById(id);
const addTask = async entity => await taskRepository.addTask(entity);
const updateTask = async (id, entity) =>
  await taskRepository.updateTask(id, entity);
const deleteTask = async id => await taskRepository.deleteTask(id);
const deleteAllTasks = async boardId => await taskRepository.deleteAll(boardId);
const unassignAll = async userId => await taskRepository.unassignAll(userId);

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  unassignAll
};
