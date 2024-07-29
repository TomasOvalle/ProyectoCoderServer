import express from "express"
import productManager from "./data/fs/ProductsManager.fs.js"
import usersManager from "./data/fs/UsersManager.fs.js"

const server = express()
const port = 8080
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready)

server.use(express.urlencoded({ extended: true }))

server.get("/", async(req, res) => {
    try {
        return res.status(200).json({
            response: "Coder Api",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "Error en la Api",
            success: false
        })
    }
})

server.get("/api/products", async(req, res) => {
    try {
        const { category } = req.query
        const all = await productManager.read(category)
        if (all) {
            return res.status(200).json({
                response: all,
                category,
                success: true
            })
        } else {
            const error = new Error("Not found")
            error.status = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.status).json({
            response: error.message,
            success: false
        })
    }
})

server.get("/api/products/:nid", async(req, res) => {
    try {
        const { nid } = req.params
        const one = await productManager.readOne(nid)
        if (one) {
            return res.status(200).json({
                response: one,
                success: true
            })
        } else {
            const error = new Error("Not found")
            error.status = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.status).json({
            response: error.message,
            success: false
        })
    }
})

server.get("/api/users", async(req, res) => {
    try {
        const { role } = req.query
        const all = await usersManager.read(role)
        if (all) {
            return res.status(200).json({
                response: all,
                role,
                success: true
            })
        } else {
            const error = new Error("Not found")
            error.status = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.status).json({
            response: error.message,
            success: false
        })
    }
})


server.get("/api/users/:nid", async(req, res) => {
    try {
        const { nid } = req.params
        const one = await usersManager.readOne(nid)
        if (one) {
            return res.status(200).json({
                response: one,
                success: true
            })
        } else {
            const error = new Error("Not found")
            error.status = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.status).json({
            response: error.message,
            success: false
        })
    }
})



















/*server.get("/api/products/:title/:category", async(req, res) => {
    try {
        const { title, category } = req.params
        const data = { title, category }
        const one = await productManager.create(data)
        return res.status(201).json({
            response: one,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "ERROR",
            success: false
        })
    }
})*/