class ProductsManager {
    static quantity = 0;
    static #products = [];

    create(data) {
        try {
            const product = {
                id: 
                    ProductsManager.quantity === 0
                        ? 1 
                        : ProductsManager.#products[ProductsManager.quantity - 1].id + 1,
                title: data.title,
                photo: data.photo,
                category: data.category,
                price: data.price,
                stock: data.stock,
            };
            if (!data.title) {
                throw new Error("Ingrese un producto")
            } else {
                ProductsManager.#products.push(product) && ProductsManager.quantity++; 
                console.log("Se ha ingresa un producto");
            }
        } catch (error) {
            console.log(error);
        }
    }

    read() {
        try {
            if (ProductsManager.#products.length === 0){
                throw new Error("No hay productos")
            } else {
                return ProductsManager.#products;
            }
        } catch (error) {
            console.log(error);
        }
    }

    readOne(id) {
        try {
            const uno = ProductsManager.#products.find((each) => each.id === id);
            if (!uno) {
                throw new Error("No existe el producto");
            } else {
                return uno;
            }
        } catch (error) {
            console.log(error);
        }
    }

    destroy(id) {
        try {
            const borrar = ProductsManager.#products.filter((each) => each.id !== id);
            ProductsManager.#products = borrar
            console.log("Producto eliminado");
        } catch (error) {
            console.log(error);
        }
    }
}

const products = new ProductsManager(); 

products.create({
    title: "Producto 1",
    photo: "path/to/photo1.jpg",
    category: "Categoria 1",
    price: 100,
    stock: 5
})

products.create({
    title: "Producto 2",
    photo: "path/to/photo2.jpg",
    category: "Categoria 2",
    price: 200,
    stock: 10
})


products.create({
    title: "Producto 3",
    photo: "path/to/photo3.jpg",
    category: "Categoria 3",
    price: 300,
    stock: 15
})


products.create({
    title: "Producto 4",
    photo: "path/to/photo4.jpg",
    category: "Categoria 4",
    price: 400,
    stock: 20
})


products.create({
    title: "Producto 5",
    photo: "path/to/photo5.jpg",
    category: "Categoria 5",
    price: 500,
    stock: 25
})


products.create({
    title: "Producto 6",
    photo: "path/to/photo6.jpg",
    category: "Categoria 6",
    price: 600,
    stock: 30
})


products.create({
    title: "Producto 7",
    photo: "path/to/photo7.jpg",
    category: "Categoria 7",
    price: 700,
    stock: 35
})


products.create({
    title: "Producto 8",
    photo: "path/to/photo8.jpg",
    category: "Categoria 8",
    price: 800,
    stock: 40
})


products.create({
    title: "Producto 9",
    photo: "path/to/photo9.jpg",
    category: "Categoria 9",
    price: 900,
    stock: 45
})


products.create({
    title: "Producto 10",
    photo: "path/to/photo10.jpg",
    category: "Categoria 10",
    price: 1000,
    stock: 50
})

products.create({
    title: "Producto 11",
    photo: "path/to/photo11.jpg",
    category: "Categoria 11",
    price: 1100,
    stock: 55
})

products.create({
    title: "Producto 12",
    photo: "path/to/photo12.jpg",
    category: "Categoria 12",
    price: 1200,
    stock: 60
})

products.create({
    title: "Producto 13",
    photo: "path/to/photo13.jpg",
    category: "Categoria 13",
    price: 1300,
    stock: 65
})

products.create({
    title: "Producto 14",
    photo: "path/to/photo14.jpg",
    category: "Categoria 14",
    price: 1400,
    stock: 70
})

products.create({
    title: "Producto 15",
    photo: "path/to/photo15.jpg",
    category: "Categoria 15",
    price: 1500,
    stock: 75
})

products.create({
    title: "Producto 16",
    photo: "path/to/photo16.jpg",
    category: "Categoria 16",
    price: 1600,
    stock: 80
})

products.create({
    title: "Producto 17",
    photo: "path/to/photo17.jpg",
    category: "Categoria 17",
    price: 1700,
    stock: 85
})

products.create({
    title: "Producto 18",
    photo: "path/to/photo18.jpg",
    category: "Categoria 18",
    price: 1800,
    stock: 90
})

products.create({
    title: "Producto 19",
    photo: "path/to/photo19.jpg",
    category: "Categoria 19",
    price: 1900,
    stock: 95
})

products.create({
    title: "Producto 20",
    photo: "path/to/photo20.jpg",
    category: "Categoria 20",
    price: 2000,
    stock: 100
})


/*console.log(products.read());
console.log(products.readOne(2));
console.log(products.readOne(12));
console.log(products.destroy(3));
console.log(products.destroy(15));*/