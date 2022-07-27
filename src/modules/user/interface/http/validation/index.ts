import Joi from 'joi';
import { UserGender } from '../../../../../domain/entities/user/User';

const createUserSchama = {
  body: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().required(),
    avatar: Joi.string(),
    gender: Joi.string().valid(...Object.values(UserGender))
  })
};

const verifyUserSchama = {
  body: Joi.object({
    code: Joi.string().required()
  })
};

const registerUserSchama = {
  body: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    avatar: Joi.string(),
    gender: Joi.string().valid(...Object.values(UserGender)),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password'))
  })
};

export { createUserSchama, registerUserSchama, verifyUserSchama };
