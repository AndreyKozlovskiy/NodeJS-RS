const winston = require('winston');
const onFinished = require('on-finished');

const options = {
  info: {
    filename: './logs/log.log',
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  },
  error: {
    filename: './logs/errorLog.log',
    level: 'error',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.info),
    new winston.transports.File(options.error)
  ]
});

logger.url = (request, response, next) => {
  const { method, originalUrl, body, query } = request;
  const start = Date.now();

  onFinished(response, () => {
    const ms = Date.now() - start;
    const { statusCode } = response;
    logger.info(
      `Method: ${method}, 
      url: ${decodeURI(originalUrl)},
      query object: ${JSON.stringify(query)},
      request body: ${JSON.stringify(body)}, 
      response statusCode: ${statusCode} [${ms}ms]`
    );
  });

  next();
};

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;
