const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../common/config');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    name: {
      type: String,
      default: `TEST${uuid()}`
    },
    login: {
      type: String,
      default: 'TEST'
    },
    password: {
      type: String,
      default: 'PA$$W0RD'
    }
  },
  { collection: 'Users', versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { _id: id, name, login } = user;
  return { id, name, login };
};

userSchema.pre('save', async function cb(next) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre('updateOne', async function cb(next) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  this._update.password = await bcrypt.hash(this._update.password, salt);
  next();
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
