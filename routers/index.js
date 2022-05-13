const express = require("express");
const loan = require("./loan");

function routerApi(app) {
  const router = express.Router();

  app.use("/univalle/v1", router);

  router.use("/loan", loan);
}

module.exports = routerApi;
