const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const errorMiddleware = require('./common/error');
const logger = require('./common/logger');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const authRouter = require('./resources/auth/auth.router');
const authMiddleware = require('./resources/auth/authMiddleware');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app
  .use(express.json())
  .use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
  .use('/', authRouter)
  .use(logger.url)
  .use('/', authMiddleware, userRouter)
  .use('/', authMiddleware, boardRouter)
  .use('/', authMiddleware, taskRouter)
  .use(errorMiddleware);

module.exports = app;
