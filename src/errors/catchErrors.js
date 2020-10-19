const logger = require('../common/logger');

const catchErrors = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    return next(error);
  }
};

const onUncaughtException = err => {
  logger.error(`Unhandled exception: ${err.message}, stack: ${err.stack}`);
};

const onUnhandledPromiseRejection = err => {
  logger.error(
    `Unhandled promise rejection: ${err.message}, stack: ${err.stack}`
  );
};

module.exports = {
  catchErrors,
  onUnhandledPromiseRejection,
  onUncaughtException
};
