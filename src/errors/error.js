class NotFoundEntityError extends Error {
  constructor(entity, params, message) {
    super(
      message || `Couldn't find a(an) ${entity} with: ${JSON.stringify(params)}`
    );
    this.status = 404;
  }
}

module.exports = { NOT_FOUND_ENTITY_ERROR: NotFoundEntityError };
