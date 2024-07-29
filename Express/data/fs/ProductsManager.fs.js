import fs from "fs";
import crypto from "crypto";

class ProductsManager {
    constructor() {
        this.path = "./data/fs/files/products.json";
        this.init();
    }
    init() {
        const exist = fs.existsSync(this.path);
        if (!exist) {
            const stringData = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, stringData);
            console.log("Producto ingresado");
        } else {
            console.log("Este producto ya existe");
        }
    }

    async create(data) {
        try {
            if (!data.title) {
                throw new Error("Ingrese Producto")
            } else {
                const product = {
                    id: crypto.randomBytes(12).toString("hex"),
                    title: data.title,
                    photo: data.photo,
                    category: data.category,
                    price: data.price || 100,
                    stock: data.stock || 5
                }
                let all = await fs.promises.readFile(this.path, "utf-8");
                all = JSON.parse(all);
                all.push(product);
                all = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, all);
                console.log({created: product.id});
                return product;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async read(category = "Novelas") {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            all = all.filter((each) => each.category === category)
            if (all.length === 0) {
                //throw new Error("No hay productos")
                return null
            } else {
                console.log(all);
                return all
            }
        } catch (error) {
            console.log(error);
        }
    }

    async readOne(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let product = all.find((each) => each.id === id);
            if (!product) {
                throw new Error("No encontrado");
            } else {
                console.log(product);
                return product;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async destroy(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let product = all.find((each) => each.id === id);
            if (!product) {
                throw new Error("No se encontro")
            } else {
                let filtered = all.filter((each) => each.id !== id);
                filtered = JSON.stringify(filtered, null, 2)
                await fs.promises.writeFile(this.path, filtered);
                console.log({deleted: product.id});
                return product;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const productsManager = new ProductsManager()
export default productsManager


/*async function test() {
    try {
        const products = new ProductsManager();

        await products.create({
            title: "Producto 1",
            photo: "path/to/photo1.jpg",
            category: "Categoria 1",
            price: 100,
            stock: 5
        })

        await products.create({
            title: "Producto 2",
            photo: "path/to/photo2.jpg",
            category: "Categoria 2",
            price: 200,
            stock: 10
        })

        await products.create({
            title: "Producto 3",
            photo: "path/to/photo3.jpg",
            category: "Categoria 3",
            price: 300,
            stock: 15
        })

        await products.create({
            title: "Producto 4",
            photo: "path/to/photo4.jpg",
            category: "Categoria 4",
            price: 400,
            stock: 20
        })

        await products.create({
            title: "Producto 5",
            photo: "path/to/photo5.jpg",
            category: "Categoria 5",
            price: 500,
            stock: 25
        })

        await products.create({
            title: "Producto 6",
            photo: "path/to/photo6.jpg",
            category: "Categoria 6",
            price: 600,
            stock: 30
        })

        await products.create({
            title: "Producto 7",
            photo: "path/to/photo7.jpg",
            category: "Categoria 7",
            price: 700,
            stock: 35
        })

        await products.create({
            title: "Producto 8",
            photo: "path/to/photo8.jpg",
            category: "Categoria 8",
            price: 800,
            stock: 40
        })

        await products.create({
            title: "Producto 9",
            photo: "path/to/photo9.jpg",
            category: "Categoria 9",
            price: 900,
            stock: 45
        })

        await products.create({
            title: "Producto 10",
            photo: "path/to/photo10.jpg",
            category: "Categoria 10",
            price: 1000,
            stock: 50
        })

        await products.create({
            title: "Producto 11",
            photo: "path/to/photo11.jpg",
            category: "Categoria 11",
            price: 1100,
            stock: 55
        })

        await products.create({
            title: "Producto 12",
            photo: "path/to/photo12.jpg",
            category: "Categoria 12",
            price: 1200,
            stock: 60
        })

        await products.create({
            title: "Producto 13",
            photo: "path/to/photo13.jpg",
            category: "Categoria 13",
            price: 1300,
            stock: 65
        })

        await products.create({
            title: "Producto 14",
            photo: "path/to/photo14.jpg",
            category: "Categoria 14",
            price: 1400,
            stock: 70
        })

        await products.create({
            title: "Producto 15",
            photo: "path/to/photo15.jpg",
            category: "Categoria 15",
            price: 1500,
            stock: 75
        })

        await products.create({
            title: "Producto 16",
            photo: "path/to/photo16.jpg",
            category: "Categoria 16",
            price: 1600,
            stock: 80
        })

        await products.create({
            title: "Producto 17",
            photo: "path/to/photo17.jpg",
            category: "Categoria 17",
            price: 1700,
            stock: 85
        })

        await products.create({
            title: "Producto 18",
            photo: "path/to/photo18.jpg",
            category: "Categoria 18",
            price: 1800,
            stock: 90
        })

        await products.create({
            title: "Producto 19",
            photo: "path/to/photo19.jpg",
            category: "Categoria 19",
            price: 1900,
            stock: 95
        })

        await products.create({
            title: "Producto 20",
            photo: "path/to/photo20.jpg",
            category: "Categoria 20",
            price: 2000,
            stock: 100
        })

        //await products.read();
        //await products.readOne("b21c2bcf742af33dc11adb9a")
        //await products.destroy("b48ac3a467500ebf6547fe18")

    } catch (error) {
        console.log(error);
    }
}
test();*/