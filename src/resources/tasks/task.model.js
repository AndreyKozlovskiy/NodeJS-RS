const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: {
      type: String,
      default: 'titleTask'
    },
    order: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      default: 'Description'
    },
    userId: {
      type: String,
      default: null
    },
    boardId: {
      type: String,
      default: null
    },
    columnId: {
      type: String,
      default: null
    }
  },
  {
    collection: 'Tasks',
    versionKey: false
  }
);

taskSchema.statics.toResponse = task => {
  const {
    _id: id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  } = task;

  return { id, title, order, description, userId, boardId, columnId };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
