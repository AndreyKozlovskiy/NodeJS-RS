const Board = require('./board.model');

const getAllBoards = async () => await Board.find({});
const getBoardById = async id => await Board.findOne({ _id: id });
const addBoard = async entity => await Board.create(entity);
const updateBoard = async (id, entity) =>
  await Board.updateOne({ _id: id }, entity);

const deleteBoard = async id => await Board.deleteOne({ _id: id });

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
