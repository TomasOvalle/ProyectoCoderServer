import { Router } from "express";
import usersManager from "../../data/fs/UsersManager.fs.js";

const registerRouter = Router();

registerRouter.get("/", async ( req, res, next) => {
    try {
        const register = await usersManager.read()
        return res.render("register", { register : register})
    } catch (error) {
        return next(error)
    }
})

export default registerRouter;