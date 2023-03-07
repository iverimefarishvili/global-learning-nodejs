const validateUser = require('../utils/validateUser');

const validateUserMiddleware = (req, res, next) => {
  const validateErrors = validateUser(req.body);

  if (validateErrors) {
    const error = new Error();
    error.message = validateErrors;
    error.status = 400;
    next(error);
  }

  next();
};

module.exports = validateUserMiddleware;
