const { NOT_FOUND_ENTITY_ERROR } = require('../errors/error');

const USER = require('../resources/users/user.model');
const BOARD = require('../resources/boards/board.model');
const TASK = require('../resources/tasks/task.model');

const DBinMemory = {
  Users: [],
  Boards: [],
  Tasks: [],

  fixUsers: user => {
    if (user) {
      DBinMemory.Tasks.filter(task => task).forEach(task => {
        task.userId = task.userId === user.id ? null : task.userId;
      });
    }
  },

  fixBoards: board => {
    if (board) {
      DBinMemory.Tasks.filter(
        task => task && task.boardId === board.id
      ).forEach(
        task => (DBinMemory.Tasks[DBinMemory.Tasks.indexOf(task)] = undefined)
      );
    }
  },

  fixTasks: () => {}
};

(() => {
  const board = new BOARD();
  for (let i = 0; i < 3; i++) {
    DBinMemory.Users.push(new USER());
  }
  DBinMemory.Boards.push(board);
  DBinMemory.Tasks.push(
    new TASK({ boardId: board.id }),
    new TASK({ boardId: board.id })
  );
})();

const getAllTable = tableName => {
  return DBinMemory[tableName].filter(entity => entity);
};

const getEntityById = (tableName, id) => {
  const entities = DBinMemory[tableName]
    .filter(entity => entity)
    .filter(entity => entity.id === id);

  if (entities.length > 1) {
    throw new NOT_FOUND_ENTITY_ERROR(tableName, { id });
  }

  return entities[0];
};

const addEntity = (tableName, entity) => {
  DBinMemory[tableName].push(entity);
  return getEntityById(tableName, entity.id);
};

const deleteEntity = (tableName, id) => {
  const removeEntity = getEntityById(tableName, id);
  if (removeEntity) {
    DBinMemory[`fix${tableName}`](removeEntity);
    const index = DBinMemory[tableName].indexOf(removeEntity);
    DBinMemory[tableName] = [
      ...DBinMemory[tableName].slice(0, index),
      ...(DBinMemory[tableName].length > index + 1
        ? DBinMemory[tableName].slice(index + 1)
        : [])
    ];
  }

  return removeEntity;
};

const deleteAll = async (tableName, id) => {
  const result = [];

  const entitiesToDelete = DBinMemory[tableName].filter(item => {
    for (const [key, val] of Object.entries(id)) {
      if (item[key] !== val) {
        return false;
      }
    }

    return true;
  });

  for (const i of entitiesToDelete) {
    await deleteEntity(tableName, i.id);
  }

  return result;
};

const updateEntity = (tableName, id, entity) => {
  const entityToUpdate = getEntityById(tableName, id);
  if (entityToUpdate) {
    DBinMemory[tableName][DBinMemory[tableName].indexOf(entityToUpdate)] = {
      ...entity
    };
  }

  return getEntityById(tableName, id);
};

module.exports = {
  getAllTable,
  getEntityById,
  addEntity,
  updateEntity,
  deleteEntity,
  deleteAll
};
