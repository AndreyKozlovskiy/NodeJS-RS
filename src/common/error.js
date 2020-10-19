const logger = require('./logger');
const {
  onUnhandledPromiseRejection,
  onUncaughtException
} = require('../errors/catchErrors');

const errorMiddleware = (err, req, res, next) => {
  if (err.status === 404) {
    logger.error(`StatusCode ${err.status}, Message: ${err.message}`);
    res.status(err.status).send({ error: err.message });
  } else if (err) {
    logger.error(`Internal Server Error: ${err.stack || err.message}`);
    res.sendStatus(500);
  }

  next();
};

process.on('uncaughtException', error => {
  onUncaughtException(error);
});

process.on('unhandledRejection', error => {
  onUnhandledPromiseRejection(error);
});

module.exports = errorMiddleware;
