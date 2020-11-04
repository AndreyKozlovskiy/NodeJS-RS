const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
  HTTP_HEADER_AUTHORIZATION: process.env.HTTP_HEADER_Authorization,
  AUTHORIZATION_SCHEMA: process.env.Authorization_Schema
};
