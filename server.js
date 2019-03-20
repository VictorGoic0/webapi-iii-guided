const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/hubs", restricted, hubsRouter);

function restricted(req, res, next) {
  if (req.headers.token === "mellon") {
    next();
  } else {
    res.status(400).send("You shall not pass!");
  }
}

server.get("/", restricted, (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda Hubs API</p>
    `);
});

module.exports = server;
