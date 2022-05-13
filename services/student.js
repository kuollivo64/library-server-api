const faker = require("faker");
const boom = require("@hapi/boom");

class StudentService {
  constructor() {
    this.students = [];
    this.generate();
  }
  generate() {
    const amount = 50;
    for (let index = 0; index < amount; index++) {
      this.students.push({
        id: faker.datatype.uuid().toString(),
        name: faker.name.firstName(),
        age: parseInt(faker.random.number(40)),
        phone: faker.phone.phoneNumber(),
        image: faker.image.avatar(),
      });
    }
  }
  async create(data) {
    const newStudent = {
      id: faker.datatype.uuid(),
      ...data,
    };

    this.students.push(newStudent);
    return newStudent;
  }
  async find() {
    return this.students;
  }
  async findOne(id) {
    const student = this.students.find((item) => item.id === id);
    // const student = this.getAll();
    if (!student) {
      throw boom.clientTimeout("Student not found FINDONE XD.");
    }
    return student;
  }
  async update(id, data) {
    const index = this.students.findIndex((item) => item.id === id);
    const student = this.students[index];
    if (!student) {
      throw boom.notFound("Student not found UPDATE.");
    }
    if (!data) {
      throw boom.badData("Empty new Data.");
    }
    this.students[index] = {
      ...student,
      ...data,
    };
    return this.students[index];
  }
  async delete(id) {
    const index = this.students.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("Student not found.");
    }
    this.students.splice(index, 1);
    return {
      message: "Deleted!",
      id,
    };
  }
}

module.exports = StudentService;
