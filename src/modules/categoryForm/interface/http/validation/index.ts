import Joi from 'joi';
import { FormElement, FormType } from '../../../../../domain/entities/categoryForms/enums';

const removeCategoryFormSchema = {
  params: Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
  })
};

const createCategoryFormSchama = {
  body: Joi.array().items({
    name: Joi.string().required(),
    displayName: Joi.string().required(),
    description: Joi.string().required(),
    formType: Joi.string().valid(...Object.values(FormType)),
    formElement: Joi.string().valid(...Object.values(FormElement)),
    exampleValue: Joi.string(),
    values: Joi.any(),
    value: Joi.string(),
    editable: Joi.boolean().required(),
    layout: Joi.string().required(),
    searchable: Joi.boolean().required(),
    filterable: Joi.boolean().required()
  }),
  params: Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
  })
};

const addCategoryElementSchama = {
  body: Joi.object({
    name: Joi.string().required(),
    displayName: Joi.string().required(),
    description: Joi.string().required(),
    formType: Joi.string().valid(...Object.values(FormType)),
    formElement: Joi.string().valid(...Object.values(FormElement)),
    values: Joi.any(),
    value: Joi.string(),
    editable: Joi.boolean().required(),
    layout: Joi.string().required(),
    searchable: Joi.boolean().required(),
    filterable: Joi.boolean().required()
  }),
  params: Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
  })
};

export { createCategoryFormSchama, removeCategoryFormSchema, addCategoryElementSchama };
