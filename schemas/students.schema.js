const Joi = require('joi')

const nit_student = Joi.string()
const password_student = Joi.string()
const name_student = Joi.string()
const date_of_birth = Joi.string()
const college_career = Joi.string()
const phone = Joi.string()
const mail = Joi.string()

const createStudentSchema = Joi.object({
    nit_student,
    password_student,
    name_student,
    date_of_birth,
    college_career,
    phone,
    mail
})

const updateStudentSchema = Joi.object({
    nit_student,
    password_student,
    name_student,
    date_of_birth,
    college_career,
    phone,
    mail
})

const getStudentSchema = Joi.object({
    nit_student
})

module.exports = {
    createStudentSchema,
    updateStudentSchema,
    getStudentSchema
}