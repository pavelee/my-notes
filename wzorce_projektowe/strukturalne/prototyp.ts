/*
Prototyp - to kreacyjny wzorzec projektowy, który umożliwia kopoiowanie obiektów bez tworzenia zależności pomiędzy twoim kodem, a klasami obiektów

Problem

- Problem kiedy potrzebujemy kopii obiektu
  - W rzeczywistości często taki obiekt ma pola prywatne, które nie są dostępne z zewnątrz
- Kod staje się zależny od klas obiektów, które chcemy kopiować

Rozwiązanie

- Stwórz interfejs prototypu, który będzie zawierał metodę kopiującą
- Przydatne kiedy chcemy skopiować obiekt, który ma pola prywatne np. konfiguracja
- Obiekt posiadający metodę kopiującą jest nazwany prototypem

Zastosowanie

- Stosuj wzorzec Prototyp gdy chcesz aby twój kod nie był zależony od konkretnej klasy kopiowanego obiektu
- Stosuj ten wzorzec gdy chcwsz zredukować ilość podklas różniących się jedynie sposobem inicjalizacji ich pól
  - Zamiast tego możesz skopiować prototyp i zmienić mu pola

Zalety

- Możesz klonować obiekty bez zależności od ich klas
- Możęsz pozbyć się wielokrotnego powielania kodu inicjalizującego pola obiektu
- Dużo wygodniejsze produkowanie złożonych obiektów
- alternatywa do dziedziczenia gdy mamy do czynienia z wcześniej zdefiniowanymi obiektami konfiguracyjnymi

Wady

- Klonowanie złożonych obiektów, które mają referencje do innych obiektów może być trudne
*/

class Shape {
  constructor(public x: number, public y: number, public color: string) {}

  // mamy wspólny intefejs dla wszystkich klas dziedziczących
  // mógłby być też wspólny interfejs dla wszystkich klas, które chcemy kopiować
  clone(): Shape {
    return new Shape(this.x, this.y, this.color);
  }
}

class Rectangle extends Shape {
  constructor(public width: number, public height: number, color: string) {
    super(width, height, color);
  }

  clone(): Rectangle {
    return new Rectangle(this.width, this.height, this.color);
  }
}

class Circle extends Shape {
  constructor(public radius: number, color: string) {
    super(radius, radius, color);
  }

  clone(): Circle {
    return new Circle(this.radius, this.color);
  }
}

const shapes: Shape[] = [];

const circle = new Circle(10, "red");
shapes.push(circle);

const rectangle = new Rectangle(10, 20, "blue");
shapes.push(rectangle);

const anotherCircle = circle.clone();
shapes.push(anotherCircle);

const anotherRectangle = rectangle.clone();
shapes.push(anotherRectangle);

console.log(shapes);
