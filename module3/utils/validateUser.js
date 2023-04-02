const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  id: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
  age: Joi.number().min(4).max(130).required(),
  is_deleted: Joi.boolean().required()
});

const loginSchema = Joi.object({
  loginSubstring: Joi.string().required(),
  limit: Joi.number().integer().positive().required()
});

const validateUser = user => {
  const result = userSchema.validate(user, { allowUnknown: true, convert: true });

  return result.error ? result.error.details : null;
};

module.exports = loginSchema;
module.exports = userSchema;
module.exports = validateUser;
