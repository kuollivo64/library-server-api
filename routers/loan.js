const express = require("express");
const loanService = require("../services/loan");
const api = express.Router();
const {
    createLoanSchema,
    updateLoanSchema,
    getLoanSchema,
  } = require("../schemas/loan");
const service = new loanService();

api.get("/get-loans", (req, res, next) => {
    try {
        const loan = await service.find();
        res.status(200).json(loan);
      } catch (err) {
        // res.status(404).json({ message: err.message });
        next(err);
      }
});
api.get("/", async (req, res) => {
  try {
    const loan = await service.find();
    res.status(200).json(loan);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
api.post(
    "/",
    validateHandler(createLoanSchema, 'body'),
    async (req, res, next) => {
      try {
        const data = req.body;
        const newLoan = await service.create(data);
        res.status(201).json({
          message: "Created!",
          newLoan,
        });
      } catch (err) {
        res.status(404).json({ message: err.message });
        // next(err);
      }
    }
  );
api.get(
    "/:id",
    validateHandler(getLoanSchema, "params"),
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const loan = await service.findOne(id);
        res.status(200).json(loan);
      } catch (err) {
        // res.status(404).json({ message: err.message });
        next(err);
      }
    }
  );

api.patch(
    "/:id",
    [
      validateHandler(updateLoanSchema, "body"),
      validateHandler(getLoanSchema, "params"),
    ],
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const dataLoan = await service.update(id, body);
        res.status(202).json({
          message: "Update!",
          dataLoan,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  api.delete(
    "/:id",
    validateHandler(getLoanSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const dataLoan = await service.delete(id);
        res.status(200).json({
          message: `The loan with id: ${id} deleted`,
          id,
          dataLoan,
        });
      } catch (err) {
        // res.status(404).json({ code: 404, message: err.message });
        next(err);
      }
    }
  );

module.exports = api;
