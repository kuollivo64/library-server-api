const Joi = require("joi");

const id_book = Joi.string().uuid();
const id_student = Joi.string().uuid();
const deliver_date = Joi.isodate();
const return_date = Joi.isodate();

const createLeanSchema = Joi.object({
  id_book: id_book.required(),
  id_student: id_student.required(),
  deliver_date: deliver_date.required(),
  return_date: return_date.required(),
});

const updateLeanSchema = Joi.object({
  id_book: id_book.required(),
  id_student: id_student.required(),
  deliver_date: deliver_date.required(),
  return_date: return_date.required(),
});

const getLeanSchema = Joi.object({
  id_book: id_book.required(),
});

module.exports = {
  createLeanSchema,
  updateLeanSchema,
  getLeanSchema,
};
