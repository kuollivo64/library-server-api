const Joi = require('joi')

const id_category = Joi.string().uuid()
const name_category = Joi.string().min(3).max(30)

const createCategorySchema = Joi.object({
    name_category:name_category.required()
}
)

const updateCategorySchema = Joi.object({
    name_category
})

const getCategorySchema = Joi.object({
    id_category: id_category.required()
})

module.exports={
    createCategorySchema,updateCategorySchemam,getCategorySchema
}
