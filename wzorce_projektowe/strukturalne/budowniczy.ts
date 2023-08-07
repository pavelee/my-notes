/*
Problem
    -   Tworzymy obiekty z ogomnymi konstruktorami, które są trudne do zrozumienia 
        bo chcemy mieć możliwość tworzenia obiektów z różnymi konfiguracjami
    -   Tworzymy ogromną ilość podklas z różnymi konfiguracjami. Dodanie kolejnego parametru powoduje spore problemy
Rozwiązanie
    -   Tworzymy klasę budowniczego, która ma metody do konfiguracji obiektu
        -   Może być wiele klas budowniczych, które implementują ten sam interfejs (np. dla różnych systemów)
    -   Dzieli konstrukcję obiektu na kroki
    -   Możemy się ograniczyć tylko do tych kroków, które są nam potrzebne
    -   Kierownik (director) może być opcjonalny, który określa kolejność kroków (gotowiec)
        -   ukrywanie szczegółów implementacji dla klienta
Zastosowanie
    -   Stosuj wzorzec budowniczy aby pozbyć się "teleskopowego" konstruktora
    -   Stosuj wzorzec budowniczy gdy potrzebujesz możliwości tworzenia różnych reprezentacji
        jakiegoś produktu (na przykład domy z kamienia i domy z drewna)
    -   Stsuj ten wzorzec do konstruowania drzew kompozytowych lub innych złożonych obiektów
Jak zaimplementować
    -   Upewnij się że jesteś wstanie zdefiniować wspólne kroki dla tworzenia wszystkich produktów
    -   Stwórz interfejs budowniczego z metodami do konfiguracji produktu 
        i opcjonalnie metdoą do zwracania produktu (jeśli produkt ma wspólny interfejs)
    -   Stwórz klasy budowniczego dla każdego rodzaju produktu i implementuj wspólny interfejs
    -   Rozważ stworzenie klasy kierownika, która będzie określała kolejność kroków konstrukcji
Zalety
    -   Pozwala na tworzenie produktów krok po kroku, odkładać niektóre etapy, wywoływać rekurencyjnie
    -   Możesz wykorzystać ponownie ten sam kod konstrukcyjny dla różnych reprezentacji produktów
    -   SRP, możesz przenieść kod konstrukcyjny do jednej klasy, a kod konfiguracji do innych
Wady
    -   Może być trudno utrzymać kod budowniczego w przypadku gdy produkty są bardzo złożone
    -   Wieksza ilość klas
*/

// mamy wspólny interfejs dla wszystkich budowniczych
interface IBuilder {
  reset(): void;
  setSeats(n: number): void;
  setEngine(): void;
  setTripComputer(): void;
  setGPS(): void;
}

// produkty nie muszą mieć wspólnego interfejsu
class Car {
  seats: number;
  engine: string;
  tripComputer: boolean;
  gps: boolean;

  constructor() {
    this.seats = 0;
    this.engine = "";
    this.tripComputer = false;
    this.gps = false;
  }
}

// budowniczy dla samochodu, implementuje wspólny interfejs
class CarBuilder implements IBuilder {
  car: Car;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.car = new Car();
  }

  setSeats(n: number): void {
    this.car.seats = n;
  }

  setEngine(): void {
    this.car.engine = "V8";
  }

  setTripComputer(): void {
    this.car.tripComputer = true;
  }

  setGPS(): void {
    this.car.gps = true;
  }

  getResult(): Car {
    return this.car;
  }
}

// kolejny produkt który nie musi mieć wspólnego interfejsu
class CarManual {
  seats: string;
  engine: string;
  tripComputer: string;
  gps: string;

  constructor() {
    this.seats = "";
    this.engine = "";
    this.tripComputer = "";
    this.gps = "";
  }
}

// budowniczy dla instrukcji obsługi, wspólny interfejs
class CarManualBuilder implements IBuilder {
  carManual: CarManual;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.carManual = new CarManual();
  }

  setSeats(n: number): void {
    this.carManual.seats = n.toString();
  }

  setEngine(): void {
    this.carManual.engine = "V8";
  }

  setTripComputer(): void {
    this.carManual.tripComputer = "true";
  }

  setGPS(): void {
    this.carManual.gps = "true";
  }

  getResult(): CarManual {
    return this.carManual;
  }
}

// opcjonalnie, kierownik, który określa kolejność kroków i ukrywa szczegóły implementacji dla kodu klienckiego
class Director {
  builder: IBuilder;

  constructor(builder: IBuilder) {
    this.builder = builder;
  }

  constructSportsCar(): void {
    this.builder.reset();
    this.builder.setSeats(2);
    this.builder.setEngine();
    this.builder.setTripComputer();
    this.builder.setGPS();
  }

  constructSUV(): void {
    this.builder.reset();
    this.builder.setSeats(4);
    this.builder.setEngine();
    this.builder.setGPS();
  }
}

// kod kliencki określa buildera i kierownika
function clientCode(director: Director) {
  let builder = new CarBuilder();
  director.builder = builder;

  director.constructSportsCar();
  let car = builder.getResult();
  console.log(car);

  let builder2 = new CarManualBuilder();
  director.builder = builder2;

  director.constructSportsCar();
  let carManual = builder2.getResult();
  console.log(carManual);
}

let director = new Director(new CarBuilder());
clientCode(director);
