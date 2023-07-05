interface Product {
    name: string;
    price: number;
}

abstract class ProductFactory {
    abstract make(): Product;
}

class Book implements Product {
    constructor(
        public name: string,
        public price: number,
        public pages: number
    ) {
        this.name = name;
        this.price = price;
    }
}

class Bike implements Product {
    constructor(public name: string, public price: number) {}
}

class BookFactory extends ProductFactory {
    make(): Product {
        return new Book("fasf", 24, 3);
    }
}

class BikeFactory extends ProductFactory {
    make(): Product {
        return new Bike("Super Bike", 23);
    }
}

class Cart {
    private products: Product[] = [];

    declare addToCart: (product: Product) => void;
}

let factory: ProductFactory;

// init system;

factory = new BookFactory();
factory = new BikeFactory();

let product1: Product = factory.make();

let cart = new Cart();
cart.addToCart(product1);
