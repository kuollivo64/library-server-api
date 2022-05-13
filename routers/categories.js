const express = require('express');
const req = require('express/lib/request');

const ValidateHandler = require('../middleware/validate.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/categories.schema');
const categoriesService = require('../services/categories.service')

const router = express.Router()
const service = new categoriesService()

//Buscar todas las categorias
router.get('/', async (req, res) => {
    try {
        const category = await service.find()

        res.status(200).json(category)
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})

//Buscar una categoria por su id
router.get('/:id_category',
    ValidateHandler(getCategorySchema, 'body '),
    async (req, res) => {
        try {
            const { id_category } = req.params
            const category = await service.findone(id_category)
            if (!category) {
                throw new Error('category not found')
            }
            res.status(200).json(category)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    })

//Crear una nueva categoria
router.post('/',
    ValidateHandler(createCategorySchema, 'body '),
    async (req, res, next) => {
        try {
            const body = req.body
            const newCategory = await service.create(body)
            res.status(201).json({
                message: 'crated',
                data: newCategory
            })
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    })

router.patch('/:id',
    ValidateHandler(getCategorySchema, 'params'),
    ValidateHandler(updateCategorySchema, 'body'),
    async (req, res, next) => {
        try {
            const { id_category } = req.params
            const body = req.body
            const changeCategory = await service.update(id_category, body)

            res.status(200).json({
                message: 'updated',
                data: changeCategory
            })
        } catch (error) {
            next(error)
        }
    })

router.delete('/:id',
    ValidateHandler(getCategorySchema, 'body '),
    async (req, res) => {
        try {
            const { id_category } = req.params
            const categoryDeleted = await service.delelte(id_category)
            res.status().json(categoryDeleted)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    })

module.exports = router;