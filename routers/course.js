const faker = require("faker");
const express = require("express");


const api = express.Router();

api.get("/get-courses", (req, res) => {
  const { page } = req.query;
  res.status(200).send({
    code: 200,
    page,
  });
});

api.get("/get-courses", (req, res) => {
  const { page, limit } = req.query;
  res.status(200).send({
    code: 200,
    page,
    limit,
  });
});

api.get("/", (req, res) => {
  const { amount = 50 } = req.query;
  const courses = [];
  for (let index = 0; index < amount; index++) {
    courses.push({
      name: faker.name.firstName(),
      age: parseInt(faker.random.number(40)),
      phone: faker.phone.phoneNumber(),
      image: faker.image.avatar(),
    });
  }
  res.status(200).json(courses);
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
        message: `The course with id: ${id} deleted`,
        id,
        data,
    })
  })
  

module.exports = api;
