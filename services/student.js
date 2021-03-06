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
        id_student:faker.datatype.uuid().toString(),
        password_student:faker.name.firstName(),
        name_student:faker.name.firstName(),
        date_of_birth:faker.name.firstName(),
        college_career:faker.name.firstName(),
        phone:faker.phone.phoneNumber(),
        mail:faker.name.firstName()
      });
    }
  }
  async create(data) {
    const newStudent = {
      nit_student: faker.datatype.uuid(),
      ...data,
    };

    this.students.push(newStudent);
    return newStudent;
  }
  async find() {
    return this.students;
  }
  async findOne(id) {
    const student = this.students.find((item) => item.id_student === id);
    // const student = this.getAll();
    if (!student) {
      throw boom.clientTimeout("Student not found FINDONE XD.");
    }
    return student;
  }
  async update(id, data) {
    const index = this.students.findIndex((item) => item.id_student === id);
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
    const index = this.students.findIndex((item) => item.id_student === id);
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
