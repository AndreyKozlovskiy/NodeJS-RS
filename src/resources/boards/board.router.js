const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (request, response) => {
  const boards = await boardsService.getAllBoards();
  await response.status(200).json(boards.map(board => Board.toResponse(board)));
});

router.route('/').post(async (request, response) => {
  const board = new Board({
    title: request.body.title,
    columns: [...request.body.columns]
  });

  await response
    .status(200)
    .send(Board.toResponse(await boardsService.addBoard(board)));
});

router.route('/:id').get(async (request, response) => {
  const board = await boardsService.getBoardById(request.params.id);
  if (board) {
    await response.status(200).send(Board.toResponse(board));
  } else {
    await response.sendStatus(404);
  }
});

router.route('/:id').put(async (request, response) => {
  const board = new Board({
    id: request.params.id,
    title: request.body.title,
    columns: [...request.body.columns]
  });

  await response
    .status(200)
    .send(
      Board.toResponse(
        await boardsService.updateBoard(request.params.id, board)
      )
    );
});

router.route('/:id').delete(async (request, response) => {
  await boardsService.deleteBoard(request.params.id);
  response.sendStatus(204);
});

module.exports = router;
