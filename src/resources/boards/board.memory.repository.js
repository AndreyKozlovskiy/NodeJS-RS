const { NOT_FOUND_ENTITY_ERROR } = require('../../errors/error');
const DB = require('../../utils/DBinMemory');

const TABLE_NAME = 'Boards';
const ENTITY_NAME = 'board';

const getAllBoards = async () => await DB.getAllTable(TABLE_NAME);

const getBoardById = async id => await DB.getEntityById(TABLE_NAME, id);

const addBoard = async board => await DB.addEntity(TABLE_NAME, board);

const updateBoard = async (id, board) =>
  await DB.updateEntity(TABLE_NAME, id, board);

const deleteBoard = async id => {
  if (!(await DB.deleteEntity(TABLE_NAME, id))) {
    throw new NOT_FOUND_ENTITY_ERROR(ENTITY_NAME, id);
  }
};

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
