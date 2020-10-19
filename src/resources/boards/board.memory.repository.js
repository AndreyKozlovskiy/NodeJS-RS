const { NOT_FOUND_ENTITY_ERROR } = require('../../errors/error');
const DB = require('../../utils/DBinMemory');

const TABLE_NAME = 'Boards';
const ENTITY_NAME = 'board';

const getAllBoards = async () => await DB.getAllTable(TABLE_NAME);

const getBoardById = async id => {
  const entity = await DB.getEntityById(TABLE_NAME, id);
  if (!entity) {
    throw new NOT_FOUND_ENTITY_ERROR(ENTITY_NAME, { id });
  }

  return entity;
};

const addBoard = async board => await DB.addEntity(TABLE_NAME, board);

const updateBoard = async (id, board) => {
  const updatedBoard = await DB.updateEntity(TABLE_NAME, id, board);
  if (!updatedBoard) {
    throw new NOT_FOUND_ENTITY_ERROR(ENTITY_NAME, { id });
  }

  return updatedBoard;
};

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
