import Joi from 'joi';
import { CurrencyType } from '../../../../../domain/entities/poster/enums';

const createPosterSchama = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    exchange: Joi.boolean(),
    currency: Joi.string().valid(...Object.values(CurrencyType)),
    used: Joi.boolean().required(),
    location: Joi.object({
      map: Joi.object({
        lon: Joi.string(),
        lat: Joi.string()
      }),
      address: Joi.string()
    }),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    agreement: Joi.boolean(),
    additionalInformations: Joi.object()
  })
};

export { createPosterSchama };
