const validateGroup = require('../utils/validateGroup');

const validateGroupMiddleware = (req, res, next) => {
  const validateErrors = validateGroup(req.body);

  if (validateErrors) {
    const error = new Error();
    error.message = validateErrors;
    error.status = 400;
    next(error);
  }

  next();
};

module.exports = validateGroupMiddleware;