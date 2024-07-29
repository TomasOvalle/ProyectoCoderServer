import fs from "fs";
import crypto from "crypto";

class UserManager {
    constructor() {
        this.path = "./data/fs/files/users.json";
        this.init();
    }
    init() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            const stringData = JSON.stringify([], null , 2);
            fs.writeFileSync(this.path, stringData);
            console.log("Usuario creado");
        } else {
            console.log("Este usuario ya existe ");
        }
    }

    async create(data) {
        try {
            if (!data.email) {
                throw new Error("Ingrese un email válido")
            } else {
                const users = {
                    id: crypto.randomBytes(12).toString("hex"),
                    photo: data.photo,
                    email: data.email,
                    password: data.password,
                    role: data.role || "peón"
                };
                let all = await fs.promises.readFile(this.path, "utf-8");
                all = JSON.parse(all);
                all.push(users);
                all = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, all);
                console.log({created: users.id});
                return users;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async read( role = "peón" ) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            all = all.filter((each) => each.role === role)
            if (all.length === 0) {
                //throw new Error("No hay usuarios")
                return null
            } else {
                console.log(all);
                return all;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async readOne(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let users = all.find((each) => each.id === id);
            if (!users) {
                throw new Error("No encontrado");
            } else {
                console.log(users);
                return users;
            }
        } catch (error) {
            
        }
    }

    async destroy(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let users = all.find((each) => each.id === id);
            if (!users) {
                throw new Error("No se ha encontrado un usuario")
            } else {
                let filtered = all.filter((each) => each.id !== id);
                filtered = JSON.stringify(filtered, null, 2);
                await fs.promises.writeFile(this.path, filtered);
                console.log({deleted: users.id});
                return users;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const usersManager = new UserManager()
export default usersManager

/*async function test() {
    try {
        const users = new UserManager();

        await users.create({
            photo: "photo1.jpg",
            email: "email1@email.com",
            password: "password1",
            role: "torre"
        })

        await users.create({
            photo: "photo2.jpg",
            email: "email2@email.com",
            password: "password2",
            role: "torre"
        })

        await users.create({
            photo: "photo3.jpg",
            email: "email3@email.com",
            password: "password3",
            role: "alfil"
        })

        await users.create({
            photo: "photo4.jpg",
            email: "email4@email.com",
            password: "password4",
            role: "peón"
        })

        //await users.read();
        //await users.readOne("485344378f7138df34052574");
        await users.destroy("9668c3f2b27eb746f305702d");

    } catch (error) {
        console.log(error);
    }
}
test();*/