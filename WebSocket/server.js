import express, { urlencoded } from "express"
import { createServer } from "http"
import { Server } from "socket.io"; // Este import es nuevo, este "server" se creará a partir del server HTTP
import morgan from "morgan";
import { engine } from "express-handlebars"


import indexRouter from "./src/routers/index.router.js"
import socketCb from "./src/routers/index.socket.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import pathHandler from "./src/middlewares/pathHandler.mid.js"
import __dirname from "./utils.js"

const server = express()
const port = 8080
const ready = () => console.log("Server ready on port " + port);
const nodeServer = createServer(server)
const socketServer = new Server(nodeServer); //socketServer será un servidor para trabajar en sockets
socketServer.on("connection", socketCb)


nodeServer.listen(port, ready);

server.engine("handlebars", engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname+'/src/views')

server.use(express.json());
server.use(urlencoded( {extended: true }));
server.use(morgan("dev"));

server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
