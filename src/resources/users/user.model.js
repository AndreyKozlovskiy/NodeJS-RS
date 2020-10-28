const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    name: {
      type: String,
      default: 'username'
    },
    login: {
      type: String,
      default: 'login'
    },
    password: {
      type: String,
      default: 'PA$$W0RD'
    }
  },
  {
    collection: 'Users',
    versionKey: false
  }
);

userSchema.statics.toResponse = user => {
  const { _id: id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('Users', userSchema);

module.exports = User;
