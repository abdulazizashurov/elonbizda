import Joi from 'joi';

const loginSchema = {
  body: Joi.object({
    phoneNumber: Joi.string().required(),
    password: Joi.string().required()
  })
};

export { loginSchema };
