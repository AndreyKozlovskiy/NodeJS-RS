const boardRepository = require('./board.memory.repository');
const { deleteTaskByBoardId } = require('../tasks/task.service');

const getAllBoards = () => boardRepository.getAllBoards();
const getBoardById = id => boardRepository.getBoardById(id);
const addBoard = entity => boardRepository.addBoard(entity);
const updateBoard = (id, entity) => boardRepository.updateBoard(id, entity);
const deleteBoard = async id => {
  await deleteTaskByBoardId(id);
  return await boardRepository.deleteBoard(id);
};

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  deleteBoard,
  updateBoard
};
