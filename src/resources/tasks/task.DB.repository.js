const Task = require('./task.model');

const getAllTasks = async () => await Task.find({});
const getTaskById = async id => await Task.findOne({ _id: id });
const addTask = async entity => await Task.create(entity);
const updateTask = async (id, entity) =>
  await Task.updateOne({ _id: id }, entity);
const deleteTask = async id => await Task.deleteOne({ _id: id });
const deleteAll = async boardId => await Task.deleteMany({ boardId });
const unassignAll = async userId =>
  await Task.updateMany({ userId }, { userId: null });

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
  deleteAll,
  unassignAll
};
