const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { catchErrors } = require('../../errors/catchErrors');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../common/config');

router
  .route('/users/')
  .get(
    catchErrors(async (request, response) => {
      const users = await usersService.getAllUsers();
      await response.status(200).json(users.map(user => User.toResponse(user)));
    })
  )
  .post(
    catchErrors(async (request, response) => {
      const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS);
      const newUser = new User({ ...request.body, password: hash });
      await response
        .status(200)
        .send(User.toResponse(await usersService.addUser(newUser)));
    })
  );

router
  .route('/users/:id')
  .get(
    catchErrors(async (request, response) => {
      const user = await usersService.getUserById(request.params.id);
      await response.status(200).send(User.toResponse(user));
    })
  )
  .put(
    catchErrors(async (request, response) => {
      await response
        .status(200)
        .send(
          User.toResponse(
            await usersService.updateUser(request.params.id, request.body)
          )
        );
    })
  )
  .delete(
    catchErrors(async (request, response) => {
      await usersService.deleteUser(request.params.id);
      await response.sendStatus(204);
    })
  );

module.exports = router;
