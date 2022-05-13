const express = require("express");
const routerApi = require("./routers");

const {
  errorHandler,
  logError,
  boomError,
} = require("./middleware/error.handler");
const validateHandler = require("./middleware/validate.handler");

const app = express();
const PORT_SERVER = process.env.PORT || 3977;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "RESPUESTA DE LA API" });
});

routerApi(app);

app.use(logError);
app.use(boomError);
app.use(errorHandler);
app.use(validateHandler);

app.listen(PORT_SERVER, () => {
  console.log("######################");
  console.log("###### API_REST ######");
  console.log("######################");
  // console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}`);
});
