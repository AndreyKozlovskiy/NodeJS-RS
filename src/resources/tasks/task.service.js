const taskRepository = require('./task.memory.repository');

const getAllTasks = () => taskRepository.getAllTasks();
const getTaskById = id => taskRepository.getTaskById(id);
const addTask = entity => taskRepository.addTask(entity);
const updateTask = (id, entity) => taskRepository.updateTask(id, entity);
const deleteTask = id => taskRepository.deleteTask(id);
const deleteTaskByBoardId = boardId =>
  taskRepository.deleteTaskByBoardId(boardId);

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
  deleteTaskByBoardId
};
