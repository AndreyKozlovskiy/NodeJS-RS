const boardRepository = require('./board.DB.repository');
const taskRepository = require('../tasks/task.DB.repository');

const getAllBoards = async () => await boardRepository.getAllBoards();
const getBoardById = async id => await boardRepository.getBoardById(id);
const addBoard = async entity => await boardRepository.addBoard(entity);
const updateBoard = async (id, entity) =>
  await boardRepository.updateBoard(id, entity);
const deleteBoard = async id => {
  await boardRepository.deleteBoard(id);
  await taskRepository.deleteAll(id);
};

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
