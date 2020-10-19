const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { catchErrors } = require('../../errors/catchErrors');

router
  .route('/')
  .get(
    catchErrors(async (request, response) => {
      const users = await usersService.getAllUsers();
      await response.status(200).json(users.map(user => User.toResponse(user)));
    })
  )
  .post(
    catchErrors(async (request, response) => {
      const user = new User({
        name: request.body.name,
        login: request.body.login,
        password: request.body.password
      });

      await response
        .status(200)
        .send(User.toResponse(await usersService.addUser(user)));
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (request, response) => {
      const user = await usersService.getUserById(request.params.id);
      await response.status(200).send(User.toResponse(user));
    })
  )
  .put(
    catchErrors(async (request, response) => {
      const user = new User({
        id: request.params.id,
        name: request.body.name,
        login: request.body.login,
        password: request.body.password
      });

      await response
        .status(200)
        .send(
          User.toResponse(
            await usersService.updateUser(request.params.id, user)
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
