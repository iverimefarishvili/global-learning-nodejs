const Joi = require('@hapi/joi');

const groupSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  permissions: Joi.array().required(),
});

const validateGroup = group => {
  const result = groupSchema.validate(group, { allowUnknown: true, convert: true });

  return result.error ? result.error.details : null;
};

module.exports = groupSchema;
module.exports = validateGroup;