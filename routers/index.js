const express = require("express");

const student = require("./student");
const loan = require("./loan");
const editorial = require("./editorial");
const categories = require("./categories");
const reserve = require("./reserve");

function routerApi(app) {
  const router = express.Router();

  app.use("/univalle/v1", router);

  router.use("/reserve", reserve);
  router.use("/editorial", editorial);
  router.use("/student", student);
  router.use("/loan", loan);
  router.use("/categories", categories);
}

module.exports = routerApi;
