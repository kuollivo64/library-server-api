const faker = require("faker");
const express = require("express");
const EditorialService = require("../services/editorial");
const validateHandler = require("../middleware/validate.handler");
const {
  createEditorialSchema,
  updateEditorialSchema,
  getEditorialSchema,
} = require("../schemas/editorial.schema");

const api = express.Router();

const service = new EditorialService();

api.get("/", async (req, res, next) => {
  try {
    const editorials = await service.find();
    res.status(200).json(editorials);
  } catch (err) {
    // res.status(404).json({ message: err.message });
    next(err);
  }
});

api.get(
  "/:id",
  validateHandler(getEditorialSchema, "params"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const editorial = await service.findOne(id);
      res.status(200).json(editorial);
    } catch (err) {
      // res.status(404).json({ message: err.message });
      next(err);
    }
  }
);

api.post(
  "/",
  validateHandler(createEditorialSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newEditorial = await service.create(data);
      res.status(201).json({
        message: "Created!",
        newEditorial,
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
    validateHandler(updateEditorialSchema, "body"),
    validateHandler(getEditorialSchema, "params"),
  ],
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const dataEditorial = await service.update(id, body);
      res.status(202).json({
        message: "Update!",
        dataEditorial,
      });
    } catch (err) {
      next(err);
    }
  }
);

api.delete(
  "/:id",
  validateHandler(getEditorialSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const dataEditorial = await service.delete(id);
      res.status(200).json({
        message: `The student with id: ${id} deleted`,
        id,
        dataEditorial,
      });
    } catch (err) {
      // res.status(404).json({ code: 404, message: err.message });
      next(err);
    }
  }
);

module.exports = api;
