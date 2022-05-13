const express = require("express")

const student = require("./student");
const teacher = require("./teacher");
const course = require("./course");

function routerApi(app) {
    const router = express.Router();

    app.use("/univalle/v1", router)

    router.use(`/student`, student)
    router.use(`/teacher`, teacher)
    router.use(`/course`, course)
}

module.exports = routerApi;
