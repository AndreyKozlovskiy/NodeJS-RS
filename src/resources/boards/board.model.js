const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: {
      type: String,
      default: 'TITLE'
    },
    columns: {
      type: Array,
      default: []
    }
  },
  { collection: 'Boards', versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { _id: id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
