const boom = require("@hapi/boom");

function validateHandler(schema, property) {
  return async (res, req, next) => {
    console.log(req);
    const data = await req.body;
    const { error } = schema.validate(data);
    console.log("TEST", data);

    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validateHandler;
