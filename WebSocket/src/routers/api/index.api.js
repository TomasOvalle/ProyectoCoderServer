import { Router } from "express";
import notesRouter from "./notes.api.js";


const apiRouter = Router();

apiRouter.use("/notes", notesRouter);


export default apiRouter;