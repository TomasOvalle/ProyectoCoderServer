import { Router } from "express";
import notesRouter from "./notes.view.js";
import productsRouter from "./products.view.js";
import usersRouter from "./profile.view.js";
import registerRouter from "./register.view.js";

const viewsRouter = Router();

viewsRouter.use("/notes", notesRouter);
viewsRouter.use("/products/real", productsRouter);
//viewsRouter.use("/products/:pid", productsRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.use("/users/register", registerRouter);
viewsRouter.get("/", (req, res , next) => {
    try {
        return res.render("index", { title: "HOME" });
    } catch (error) {
        return next(error);
    }
});

export default viewsRouter;