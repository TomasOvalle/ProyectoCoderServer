import { Router } from "express";
/*import usersManager from "../../data/mongo/manager/UsersManager.mongo.js"
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPassword from "../../middlewares/isValidPassword.mid.js";
import createHashPassword from "../../middlewares/createHashPassword.mid.js"*/
import passport from "../../middlewares/passport.mid.js"

const sessionsRouter = Router();

sessionsRouter.post("/register", passport.authenticate("register", { session: false }), /*isValidData, isValidEmail, createHashPassword,*/  async (req, res, next) => {
    try {
        //const data = req.body;
        //await usersManager.create(data); // La creacion debe darse de igual manera en la estrategia
        return res.json({
            statusCode: 201,
            message: "Registered"
        })
    } catch (error) {
        return next (error)
    }
})

sessionsRouter.post("/login", passport.authenticate("login", { session: false }), /*isValidUser, isValidPassword,*/ async (req, res ,next) => {
    try {
        /*const { email } = req.body;
        const one = await usersManager.readByEmail(email)
            req.session.email = email;
            req.session.role = one.role;
            req.session.photo = one.photo
            req.session.online = true;
            req.session.user_id = one._id;*/
            return res.json({ 
                statusCode: 200, 
                mesagge: "Logged in",
                //token: req.user.token
            });
    } catch (error) {
        return next (error);
    }
});

sessionsRouter.get("/online", async (req, res, next) => {
    try {
        if (req.session.online) {
            return res.json({
                statusCode: 200,
                message: "is online",
                user_id: req.session.user_id,
            })
        }
        return res.json({
            statusCode: 401,
            message: "Bad auth", // esta permitido por ahora, faltan metodos que aprender.
        })
    } catch (error) {
        return next (error)
    }
});

sessionsRouter.post("/signout", async (req, res, next) => {
    try {
        if (req.session.email) {
            req.session.destroy();
            return res.json({
                statusCode: 200, 
                message: "Signed out",
            })
        }
        const error = new Error("Invalid credentials from signout")
        error.statusCode = 401;
        throw error;
    } catch (error) {
        return next (error)
    }
});

sessionsRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"]}))
sessionsRouter.get("/google/callback", passport.authenticate("google", {session: false}), (req, res, next) => {
    try {
        return res.json({
            statusCode: 200,
            message: "Logged in with google"
        })
    } catch (error) {
        return next (error);
    }
})

// Por el momento esta con get para poder probrarlo, pero debe ser un boton el qie active 
// lo anterior por medio de un post.

/*sessionsRouter.post("/api/sessions"), async (req, res , next) => {
    try {
        if (!req.session.user_id) {
            return res.json({
                statusCode: 401,
                message: "Usuario no autenticado"
            });
        }
        const user = await usersManager.findById(req.session.user_id);
        if (!user) {
            return res.json({
                statusCode: 404,
                message: "Usuario no encontrado"
            })
        }
        res.json(user);
    } catch (error) {
        return next (error)
    }
}*/


export default sessionsRouter;