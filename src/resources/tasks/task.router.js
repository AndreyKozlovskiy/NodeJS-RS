const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (request, response) => {
  const tasks = await tasksService.getAllTasks();
  await response.status(200).json(tasks.map(task => Task.toResponse(task)));
});

router.route('/').post(async (request, response) => {
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
});

router.route('/:id').get(async (request, response) => {
  const task = await tasksService.getTaskById(request.params.id);
  if (task) {
    await response.status(200).send(Task.toResponse(task));
  } else {
    await response.sendStatus(404);
  }
});

router.route('/:id').put(async (request, response) => {
  const task = new Task({
    id: request.params.id,
    title: request.body.title,
    order: request.body.order,
    description: request.body.description,
    userId: request.body.userId,
    boardId: request.body.boardId,
    columnId: request.body.columnId
  });

  await response
    .status(200)
    .send(
      Task.toResponse(await tasksService.updateTask(request.params.id, task))
    );
});

router.route('/:id').delete(async (request, response) => {
  await tasksService.deleteTask(request.params.id);
  await response.sendStatus(204);
});

module.exports = router;
