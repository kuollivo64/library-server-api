const faker = require("faker");
const boom = require("@hapi/boom");

class EditorialService {
  constructor() {
    this.editorials = [];
    this.generate();
  }
  generate() {
    const amount = 50;
    for (let index = 0; index < amount; index++) {
      this.editorials.push({
        id_editorial: faker.datatype.uuid().toString(),
        name_editorial: faker.name.firstName(),
        direction: faker.name.firstName(),
        contac_phone: faker.phone.phoneNumber(),
      });
    }
  }
  async create(data) {
    const newEditorials = {
      id_editorial: faker.datatype.uuid(),
      ...data,
    };

    this.editorials.push(newEditorials);
    return newEditorials;
  }
  async find() {
    return this.editorials;
  }
  async findOne(id) {
    const editorial = this.editorials.find((item) => item.id === id);
    // const student = this.getAll();
    if (!editorial) {
      throw boom.clientTimeout("Editorial not found FINDONE XD.");
    }
    return editorial;
  }
  async update(id, data) {
    const index = this.editorials.findIndex((item) => item.id === id);
    const editorial = this.editorials[index];
    if (!editorial) {
      throw boom.notFound("Editorial not found UPDATE.");
    }
    if (!data) {
      throw boom.badData("Empty new Data.");
    }
    this.editorials[index] = {
      ...editorial,
      ...data,
    };
    return this.editorials[index];
  }
  async delete(id) {
    const index = this.editorials.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("Editorial not found.");
    }
    this.editorials.splice(index, 1);
    return {
      message: "Deleted!",
      id,
    };
  }
}

module.exports = EditorialService;
