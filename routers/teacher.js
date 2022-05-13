const faker = require("faker");
const express = require("express");

const api = express.Router();

api.get("/get-teacher/:id/", (req, res) => {
  const id = req.params.id;
  res.json({
    code: 200,
    id,
    name: "Alberto Perez",
    civilStatus: "Soltero",
  });
});

api.get("/get-teacher/:idTeacher/course/:idCourse", (req, res) => {
  const idCourse = req.params.idCourse;
  const idTeacher = req.params.idTeacher;
  res.json({
    code: 200,
    idCourse,
    idTeacher,
    name: "Alberto Perez",
    civilStatus: "Soltero",
  });
});

api.get("/", (req, res) => {
  const { amount = 50 } = req.query;
  const students = [];
  for (let index = 0; index < amount; index++) {
    students.push({
      name: faker.name.firstName(),
      age: parseInt(faker.random.number(40)),
      phone: faker.phone.phoneNumber(),
      image: faker.image.avatar(),
    });
  }
  res.status(200).json(students);
});

api.post("/", (req, res) => {
  const data = req.body;
  res.status(201).json({
      message: "Created!",
      data,
  })
})

api.patch("/:id", (req, res) => {
  const {id} = req.params;
  const data = req.body;
  res.status(202).json({
      message: "update",
      id,
      data,
  })
})

api.delete("/:id", (req, res) => {
  const {id} = req.params;
  const data = req.body;
  res.status(200).json({
      message: `The teacher with id: ${id} deleted`,
      id,
      data,
  })
})


module.exports = api;
