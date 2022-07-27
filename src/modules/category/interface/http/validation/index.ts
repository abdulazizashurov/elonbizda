import Joi from 'joi';

const createCategorySchama = {
  body: Joi.object({
    name: Joi.string().required(),
    icon: Joi.string(),
    isHead: Joi.boolean(),
    parentId: Joi.string().required()
  })
};

const deleteCategorySchema = {
  params: Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
  })
};

const createMainCategorySchama = {
  body: Joi.object({
    name: Joi.string().required(),
    icon: Joi.string()
  })
};

const getCategorySchema = {
  params: Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
  })
};

const updateCategoryNameSchema = {
  body: Joi.object({
    name: Joi.string().required()
  }),
  params: Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
  })
};
export {
  createCategorySchama,
  updateCategoryNameSchema,
  createMainCategorySchama,
  getCategorySchema,
  deleteCategorySchema
};
