const faker = require('faker')
const boom = require('@hapi/boom')

class ReserveService {
    constructor() {
        this.reserves = []
        this.generate()
    }
    generate() {
        for (let index = 0; index < 50; index++) {
            this.reserves.push({
                id_book: faker.datatype.uuid(),
                id_student: faker.datatype.uuid(),
                reservation_date: faker.datatype.isoDate(),
            })
        }
    }
    async create(data) {
        const newReserve = {
            id_book: faker.datatype.uuid(),
            id_student: faker.datatype.uuid(),
            reservation_date: faker.datatype.isoDate(),
            ...data
        }
        this.reserves.push(newReserve)
        return newReserve
    }
    /*async find() {
        return this.reserves
    }
    async findone(id) {
        const reserve = this.reserves.find(item => item.id === id)
        if (!reserve) {
            throw boom.notFound('reserve not found')
        }
        return reserve
    }
    async update(id, changes) {
        const index = this.reserves.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('reserve not found')
        }
        const reserve = this.reserves[index]
        this.reserves[index] = {
            ...reserve,
            ...changes
        }
        return this.reserves[index]
    }*/
    async delete(id) {
        const index = this.reserves.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('reserve not found')
        }
        this.reserves.splice(index, 1)
        return {
            message: 'deleted',
            id
        }
    }
}

module.exports = ReserveService