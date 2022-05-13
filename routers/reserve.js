const express = require('express')
const ReserveService = require('../services/serviceReserva')
const validateHandler = require('../middleware/validated.handler')
const { createReserveSchema, updateReserveSchema, getReserveSchema } = require('../schemas/squemaReserva')

const router = express.Router()
const service = new ReserveService()

router.get('/', async (req, res, next) => {
    try {
        const reserves = await service.find()
        res.status(200).json(reserves)
    } catch (error) {
        next(error)
    }
})
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const reserve = await service.findone(id)
        res.status(200).json(reserve)
    } catch (error) {
        next(error)
    }
})
router.post('/',
    validateHandler(createReserveSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body
            const newReserve = await service.create(body)
            res.status(201).json({
                message: 'created',
                data: newReserve
            })
        } catch (error) {
            res.status(201).json({
                message: error.message
            })
        }
    })
router.patch('/:id',
    validateHandler(getReserveSchema, 'params'),
    validateHandler(updateReserveSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const body = req.body
            const changeReserve = await service.update(id, body)
            res.status(202).json({
                message: 'updated',
                data: changeReserve
            })
        } catch (error) {
            next(error)
        }
    })

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const reserveDeleted = await service.delete(id)
        res.status(202).json({ reserveDeleted })
    } catch (error) {
        next(error)
    }
})

module.exports = router