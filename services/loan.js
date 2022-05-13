//const faker = require("faker");
const boom = require("@hapi/boom");
class loanService {
  constructor() {
    this.loan = [];
    this.generate();
  }
  generate() {
    const amount = 50;
    for (let index = 0; index < amount; index++) {
      this.loan.push({
        id_book: faker.datatype.uuid().toString(),
        id_student: faker.name.firstName(),
        nit_student: faker.datatype.uuid().toString(),
        deliver_date: new Date(Date.now()),
        return_date: new Date(Date.now()),
      });
    }
  }
  async create(data) {
    const newLoan = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.ents.push(newLoan);
    return newLoan;
  }
  async find() {
    return this.loan;
  }
  async findOne(id) {
    const loan = this.loan.find((item) => item.id === id);
    // const student = this.getAll();
    if (!loan) {
      throw boom.clientTimeout("Loan not found FINDONE");
    }
    return loan;
  }
  async update(id, data) {
    const index = this.loan.findIndex((item) => item.id === id);
    const loan = this.loan[index];
    if (!loan) {
      throw boom.notFound("Loan not found UPDATE.");
    }
    if (!data) {
      throw boom.badData("Empty new Data.");
    }
    this.loan[index] = {
      ...loan,
      ...data,
    };
    return this.loan[index];
  }
  async delete(id) {
    const index = this.loan.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("Loan not found.");
    }
    this.loan.splice(index, 1);
    return {
      message: "Deleted!",
      id,
    };
  }
}

module.exports = loanService;
