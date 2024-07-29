import express from "express";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/errorHandler.js";
import morgan from "morgan";

const server = express();
const port = 8080;
const ready = () => console.log("Server ready on port " + port);
server.listen(port, ready)


server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"))

server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);