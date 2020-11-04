const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  HTTP_HEADER_AUTHORIZATION,
  JWT_SECRET_KEY
} = require('../../common/config');
const User = require('../users/user.model');
const { catchErrors } = require('../../errors/catchErrors');

router.post(
  '/login',
  catchErrors(async (request, response) => {
    const { login, password } = request.body;
    const user = await User.findOne({ login });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return response.sendStatus(403);
    }
    const _token = jwt.sign(
      { login: user.login, userId: user._id },
      JWT_SECRET_KEY
    );
    return response
      .header(HTTP_HEADER_AUTHORIZATION, _token)
      .send({ token: _token });
  })
);

module.exports = router;
