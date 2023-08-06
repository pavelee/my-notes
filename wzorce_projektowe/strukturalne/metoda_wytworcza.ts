/*
Zastosowanie
-   gdy nie wiesz z góry jakie obiekty będą potrzebne i jakie będą między nimi zależności
-   oddziela kod od tworzenia obiektów od kodu używającego obiektów - łatwiej rozszerzać kod
-   dodanie nowego typu obiektu wymaga jedynie dodania nowej klasy i implementacji metody
-   gdy zamierzasz budować bibliotekę lub framework, ułatwić rozszerzanie systemu
-   rozszerzanie jest najłatwiejszym sposobem rozsezrzenia systemu
-   gdy chcesz oszczędzać pamięć w aplikacji poprzez wykorzystanie istniejaących obiektów

Zalety
-   uniezależnia kod od sposobu tworzenia obiektów
-   ułatwia dodawanie nowych typów obiektów do systemu
-   unikasz ścisłego sprzęgnięcia pomiędzy twórcą a konkretymi produktami
-   kod kreacyjny jest w jednym miejscu -> SRP
-   OCP - łatwo dodawać nowe typy produktów

Wady
-   może spowodować zwiększenie liczby klas w systemie
-   może być trudne do utrzymania w systemach złożonych
*/

// musimy mieć wspólny interfejs dla wszystkich produktów
interface Product {
    name: string;
    price: number;
}

// musimy mieć wspólny interfejs dla wszystkich fabryk
abstract class ProductFactory {
    abstract make(): Product;
}

// musimy mieć konkretne implementacje dla każdego produktu
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

// kolejny produkt, możemy ich mieć wiele
class Bike implements Product {
    constructor(public name: string, public price: number) {}
}

// konkretna fabryka dla każdego produktu
class BookFactory extends ProductFactory {
    make(): Product {
        return new Book("fasf", 24, 3);
    }
}

// kolejna fabryka dla każdego produktu
class BikeFactory extends ProductFactory {
    make(): Product {
        return new Bike("Super Bike", 23);
    }
}

// klasa, która będzie używać produktów
class Cart {
    private products: Product[] = [];
    declare addToCart: (product: Product) => void;
}

// abstrakcyjna fabryka jako intefejs
let factory: ProductFactory;

// w zależności od potrzeby możemy użyć konkretnej fabryki, inicjujemy w konfiguracji aplikacji
factory = new BookFactory();
factory = new BikeFactory();

let product1: Product = factory.make();

let cart = new Cart();
cart.addToCart(product1);
