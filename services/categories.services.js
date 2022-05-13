const faker = require('faker')
const boom = require('@hapi/boom')

class categoriesService {
    constructor() {
        this.categories = []
        this.generate()
    }
    generate() {
        const limit = 50
        for (let i = 0; i < limit; i++) {
            this.categories.push({
                id: faker.datatype.uuid(),
                name: faker.name.firstName(),
            })
        }
    }
    async create(data) {
        const newCategory = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.categories.push(newCategory)
        return newCategory
    }
    async find() {
        return this.categories
    }
    async findone(id_category) {
        const categoryFind = this.categories.find(item => item.id_category === id_category)
        if (!categoryFind) {
            throw boom.notFound('Category not found')
        } else { return categoryFind }
    }
    async update(id_category, changes) {
        const index = this.categories.findIndex(item => item.id_category === id_category)
        const category = this.categories[index]
        if (index===-1) {
            throw boom.notFound('Category not found')
        }
        
        this.categories[index] = {
            ...category,
            ...changes
        }
        return this.categories[index]
    }
    async delelte(id_category) {
        const index = this.categories.findIndex(item => item.id_category === id_category)
        if (index === -1) {
            throw boom.notFound('Category not found')
        }
        this.categories.splic(index, 1)
        return {
            message: 'deleted',
            id
        }
    }
}

module.exports = categoriesService