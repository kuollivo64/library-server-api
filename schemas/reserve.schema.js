const Joi = require('joi')

const id_book = Joi.string().uuid()
const id_student = Joi.string().uuid()
const reservation_date = joi.isoDate()


const createReserveSchema = Joi.object({
    id_book: id_book.required(),
    id_student: id_student.required(),
    reservation_date: reservation_date.required()
})

/*const updateReserveSchema = Joi.object({
    reservation_date
})*/

const getReserveSchema = Joi.object({
    id_book: id_book.required(),
    id_student: id_student.required()
})

module.exports = {
    createReserveSchema,
    updateReserveSchema,
    getReserveSchema
}