const { PORT } = require('./common/config');
const { MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');

const User = require('./resources/users/user.model');
const Board = require('./resources/boards/board.model');
const Task = require('./resources/tasks/task.model');

const users = [];
const board = new Board();
const tasks = [];

users.push(new User({ login: 'admin', password: 'admin' }));
for (let i = 0; i < 3; i++) {
  users.push(new User());
}

tasks.push(new Task({ boardId: board.id }), new Task({ boardId: board.id }));

const connectToMongoDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const DB = mongoose.connection;
  DB.on('error', console.error.bind(console, 'connection error:'));
  DB.once('open', () => {
    console.log(
      `Successful connection!\nApp is running on http://localhost:${PORT}`
    );
    DB.dropDatabase();
    users.forEach(user => user.save());
    board.save();
    tasks.forEach(task => task.save());
    cb();
  });
};

connectToMongoDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
