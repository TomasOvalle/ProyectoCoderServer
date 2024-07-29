class ProductsManager {
    #productos = [];

    create(data) {
        const { title, photo, category, price, stock } = data;
        const id = this.#generarId();
        const producto = { id, title, photo, category, price, stock };
        this.#productos.push(producto);
    }

    read() {
        return this.#productos;
    }

    #generarId() {
        return this.#productos.length > 0 ? this.#productos[this.#productos.length - 1].id + 1 : 1;
    }
}

const productsManager = new ProductsManager();

productsManager.create({
    title: "Producto 1",
    photo: "path/to/photo1.jpg",
    category: "Category 1",
    price: 10,
    stock: 100
});

productsManager.create({
    title: "Producto 2",
    photo: "path/to/photo2.jpg",
    category: "Category 2",
    price: 20,
    stock: 50
});

productsManager.create({
    title: "Producto 3",
    photo: "path/to/photo3.jpg",
    category: "Category 3",
    price: 3,
    stock: 75
});

productsManager.create({
    title: "Producto 4",
    photo: "path/to/photo3.jpg",
    category: "Category 4",
    price: 25,
    stock: 30
});

productsManager.create({
    title: "Producto 5",
    photo: "path/to/path5.jpg",
    category: "Category 5",
    price: 30,
    stock: 20
});

console.log(productsManager.read());
