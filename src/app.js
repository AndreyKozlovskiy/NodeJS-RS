const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const error = require('./common/error');
const logger = require('./common/logger');
const {
  onUnhandledPromiseRejection,
  onUncaughtException
} = require('./errors/catchErrors');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logger.url);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(error);

process.on('uncaughtException', err => {
  onUncaughtException(err);
});

//throw Error('oops');

process.on('unhandledRejection', err => {
  onUnhandledPromiseRejection(err);
});

// Promise.reject(new Error('Oops!'));

module.exports = app;
