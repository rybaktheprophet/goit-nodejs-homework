const Joi = require("joi");

module.exports = {
  postValidatorContact: (req, res, next) => {
    const schema = Joi.object({
      id: Joi.string().optional(),

      name: Joi.string().min(3).max(10).required(),

      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),

      phone: Joi.number().required(),
    });

    const validationsResult = schema.validate(req.body);

    if (validationsResult.error) {
      return res.status(400).json(validationsResult.error.details);
    }

    next();
  },

  putValidatorContact: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(10).optional(),

      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .optional(),

      phone: Joi.number().optional(),
    });

    const validationsResult = schema.validate(req.body);

    if (validationsResult.error) {
      return res.status(400).json(validationsResult.error.details);
    }

    next();
  },
};
