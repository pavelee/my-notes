interface Product {
    name: string;
    price: number;
}

abstract class ProductFactory {
    abstract make(): Product;
}

class Book implements Product {
    name: string;
    price: number;
    pages: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

class BookFactory extends ProductFactory {
    make(): Product {
        return new Book("fasf", 24);
    }
}

let factory: ProductFactory;

// init system;

factory = new BookFactory();

let product1: Product = factory.make();
