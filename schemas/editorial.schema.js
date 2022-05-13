const Joi = require("joi");

const id_editorial = Joi.string().uuid();
const name_editorial = Joi.string().min(3).max(30);
const direction = Joi.string().min(3).max(30);
const contac_phone = Joi.string().min(7).max(14);

const createEditorialSchema = Joi.object({
  name_editorial: name_editorial.required(),
  direction: direction.required(),
  contac_phone: contac_phone.required(),
});

const updateEditorialSchema = Joi.object({
  name_editorial,
  direction,
  contac_phone,
});

const getEditorialSchema = Joi.object({
  id_editorial: id_editorial.required(),
});

module.exports = {
  createEditorialSchema,
  updateEditorialSchema,
  getEditorialSchema,
};
