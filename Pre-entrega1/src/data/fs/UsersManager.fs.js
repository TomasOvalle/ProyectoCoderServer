import fs from "fs";
import crypto from "crypto";

class UserManager {
    constructor() {
        this.path = "./src/data/fs/files/users.json";
        this.init();
    }
    init() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            const stringData = JSON.stringify([], null , 2);
            fs.writeFileSync(this.path, stringData);
            console.log("User created");
        } else {
            console.log("This user is already exist");
        }
    }

    async create(data) {
        try {
            if (!data.email) {
                throw new Error("Enter a valid email address");
            } else {
                const users = {
                    id: crypto.randomBytes(12).toString("hex"),
                    photo: data.photo || "photo",
                    email: data.email,
                    password: data.password,
                    role: data.role || 0
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
            return error;
        }
    }

    async read( role ) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            role &&  (all = all.filter((each) => each.role === role));
            return all;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async readOne(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let users = all.find((each) => each.id === id);
            return users;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async destroy(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let users = all.find((each) => each.id === id);
            if (users) {
                let filtered = all.filter((each) => each.id !== id);
                filtered = JSON.stringify(filtered, null, 2);
                await fs.promises.writeFile(this.path, filtered);
                console.log({deleted: users.id});
                return users;
            } else {
                const error = new Error("A user has not been found");
                error.statusCode = 404
                throw error;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(id, data) {
        try {
            let all = await this.read();
            let one = all.find( each => each.id === id)
            if (one) {
                for (let prop in data) {
                    one[prop] = data[prop]
                }
                all = JSON.stringify(all, null, 2)
                await fs.promises.writeFile(this.path, all)
                return one;
            } else {
                const error = new Error("Not found")
                error.statusCode = 404
                throw error
            }
        } catch (error) {
            throw error
        }
    }
}

const usersManager = new UserManager()
export default usersManager
