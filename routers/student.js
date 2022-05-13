const faker = require("faker");
const express = require("express");
const StudentService = require("../services/student");
const validateHandler = require("../middleware/validate.handler");
const {
  createStudentSchema,
  updateStudentSchema,
  getStudentSchema,
} = require("../schemas/students.schema");

const api = express.Router();

const service = new StudentService();

// api.get("/get-student/:id/", (req, res) => {
//   const id = req.params.id;
//   res.json({
//     code: 200,
//     id,
//     name: "Alberto Perez",
//     civilStatus: "Soltero",
//   });
// });

// api.get("/get-student/:idStudent/course/:idCourse", (req, res) => {
//   const idCourse = req.params.idCourse;
//   const idStudent = req.params.idStudent;
//   res.json({
//     code: 200,
//     idCourse,
//     idStudent,
//     name: "Alberto Perez",
//     civilStatus: "Soltero",
//   });
// });

// api.get("/:amount", (req, res) => {
//   const { amount } = req.query;
//   const students = [];
//   for (let index = 0; index < amount; index++) {
//     students.push({
//       name: faker.name.firstName(),
//       age: parseInt(faker.random.number(40)),
//       phone: faker.phone.phoneNumber(),
//       image: faker.image.avatar(),
//     });
//   }
//   res.json(students);
// });

api.get("/", async (req, res, next) => {
  try {
    const students = await service.find();
    res.status(200).json(students);
  } catch (err) {
    // res.status(404).json({ message: err.message });
    next(err);
  }
});

api.get(
  "/:id",
  validateHandler(getStudentSchema, "params"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const student = await service.findOne(id);
      res.status(200).json(student);
    } catch (err) {
      // res.status(404).json({ message: err.message });
      next(err);
    }
  }
);

api.post(
  "/",
  validateHandler(createStudentSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newStudent = await service.create(data);
      res.status(201).json({
        message: "Created!",
        newStudent,
      });
    } catch (err) {
      res.status(404).json({ message: err.message });
      // next(err);
    }
  }
);

api.patch(
  "/:id",
  [
    validateHandler(updateStudentSchema, "body"),
    validateHandler(getStudentSchema, "params"),
  ],
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const dataStudent = await service.update(id, body);
      res.status(202).json({
        message: "Update!",
        dataStudent,
      });
    } catch (err) {
      next(err);
    }
  }
);

api.delete(
  "/:id",
  validateHandler(getStudentSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const dataStudent = await service.delete(id);
      res.status(200).json({
        message: `The student with id: ${id} deleted`,
        id,
        dataStudent,
      });
    } catch (err) {
      // res.status(404).json({ code: 404, message: err.message });
      next(err);
    }
  }
);

module.exports = api;
