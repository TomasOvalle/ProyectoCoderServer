import { Router } from "express";
import userManager from "../../data/fs/UsersManager.fs.js"


const usersRouter = Router();

usersRouter.get("/", read);
usersRouter.get("/:uid", readOne);
usersRouter.post("/", create );
usersRouter.put("/:uid", update);
usersRouter.delete("/:uid", destroy);

async function create (req, res, next) {
    try {
        const data = req.body;
        const one = await userManager.create(data);
        res.json({
            statusCode: 201,
            message: "CREATED ID: " + one.id,
        });
    } catch (error) {
        return next(error);
    }
};

async function update (req, res, next) {
    try {
        const { uid } = req.params
        const data = req.body
        const one = await userManager.update(uid,data);
        return res.json({
            statusCode: 200,
            response: one
        })
    } catch (error) {
        return next(error);
    }
};

async function destroy (req, res, next) {
    try {
        const { uid } = req.params
        const one = await userManager.destroy(uid);
        return res.json({
            statusCode: 200,
            response: one
        })
    } catch (error) {
        return next(error);
    }
}

async function read( req, res, next) {
    try {
        const { category } = req.query;
        const all = await userManager.read(category);
        if (all.length > 0) {
            return res.json({
                statusCode: 200,
                response: all,
            });
        } else {
            const error = new Error("Not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

async function readOne( req, res, next) {
    try {
        const { uid } = req.params;
        const one = await userManager.readOne(uid);
        if (one) {
            return res.json({
                statusCode: 200,
                response: one,
            });
        } else {
            const error = new Error("Not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

usersRouter.get("/api/users", async (req, res, next) => {
    try {
        const { category } = req.query;
        const all = await usersRouter.read(category);
        if (all.length > 0) {
            return res.json({
                statusCode: 200,
                response: all
            });
        } else {
            const error = new Error("not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
});

usersRouter.get("/api/users/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const one = await usersRouter.readOne(uid);
        if (one) {
            return res.json({
                statusCode: 200,
                response: one,
            });
        } else {
            const error = new Error("Not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
})


export default usersRouter;