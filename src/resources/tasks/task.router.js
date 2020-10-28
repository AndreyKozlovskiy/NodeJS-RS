const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const { catchErrors } = require('../../errors/catchErrors');

router
  .route('/')
  .get(
    catchErrors(async (request, response) => {
      const tasks = await tasksService.getAllTasks();
      await response.status(200).json(tasks.map(task => Task.toResponse(task)));
    })
  )
  .post(
    catchErrors(async (request, response) => {
      const task = new Task({
        title: request.body.title,
        order: request.body.order,
        description: request.body.description,
        userId: request.body.userId,
        boardId: request.params.boardId,
        columnId: request.body.columnId
      });

      await response
        .status(200)
        .send(Task.toResponse(await tasksService.addTask(task)));
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (request, response) => {
      const task = await tasksService.getTaskById(request.params.id);
      if (task) {
        await response.status(200).send(Task.toResponse(task));
      } else {
        await response.sendStatus(404);
      }
    })
  )
  .put(
    catchErrors(async (request, response) => {
      await response
        .status(200)
        .send(
          Task.toResponse(
            await tasksService.updateTask(request.params.id, request.body)
          )
        );
    })
  )
  .delete(
    catchErrors(async (request, response) => {
      await tasksService.deleteTask(request.params.id);
      await response.sendStatus(204);
    })
  );

module.exports = router;
