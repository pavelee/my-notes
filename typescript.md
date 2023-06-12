# Typescript

## Triki

### Oznaczenie że to nie będzie nullem znaj !

Znak ! przy zmiennej/wywołaniu funkcji oznacza że deklarujemy że dana wartość nie będzie nullem. TS w takim przypadku "ufa" nam.

```js
let someObject: {key: string};

function someFunctionReturningSomeObject(): someObject | null; // przykładowa funkcja, funkcja zwrawca someObject | null

let concreteSomeObject = someFunctionReturningSomeObject()!; // Uwaga! Znak ! na końcu stwierdza że mamy pewność że nie będzie to null!

concreteSomeObject.key = 'someString'; // jeśli byśmy nie użyli ! w poprzedniej linijce, byśmy mieli problem z kompilacją
```

Ewentualną aleternatywą jest type guard

```js
let someObject: {key: string};

function someFunctionReturningSomeObject(): someObject | null; // przykładowa funkcja, funkcja zwrawca someObject | null

let concreteSomeObject = someFunctionReturningSomeObject(); // Uwaga! Znak ! na końcu stwierdza że mamy pewność że nie będzie to null!

if (concreteSomeObject) { // type guard, gwarantuje że nie będzie to null <3
  concreteSomeObject.key = 'someString'; // jeśli byśmy nie użyli ! w poprzedniej linijce, byśmy mieli problem z kompilacją
}
```

### Oznaczenie że parametr nie będzie używamy

Możemy oznaczyć że parametr nie będzie używany, mimo że jest zdefiniowany. Tak aby TS nie zgłaszał tego jako błąd

```js
function someFunction(_: string) {
  // brak błedu, mimo że nie używamy parametru
  return null;
}
```

### Przydatne rozszerzenia dla VSCode

- ESLint - sprawdzanie jakości kodu
- Prettier - CodeFormatter
- Debugger for Chrome
  - Wymaga opcji "sourceMap" na true

## Ogólne

- Jest to nakładka na JS
  - wprowadza silne typowanie do JS
- kompiluje do natywnego JS'a
- W przypadku braku jawnego typowania ts domyśla się typu po przypisanej inicacyjnej wartości
- wszystkie typy w TS sa zapisane małymi literami np. string, number

### Wymuszenie ingorowania błedów kompilatora

- @ts-ignore
  - ignorowanie konretnej linii kodu
- @ts-expect-error
  - podobne do powyższego ale podczas kompilacji wyrzuca informacje jeśli w tym miejscu nie mamy błedu
- @ts-nocheck
  - ignorowanie całego pliku (dodajemy u góry pliku)

Powyzsza adnotacje dodajemy jako komentarz

```js
// @ts-ignore
let ts: string = 3;
```

### Przykład typowania zmiennej

```js
let myVariable: string;
```

### Typowanie this w metodzie

```js
class SomeClass {
  name: string;

  describe(this: SomeClass) {
    // dzięki takiemu zapisowi mamy gwarancje że będzie to wywołane tylko z obiektu SomeClass
    return this.name;
  }
}
```

### Readonly

Jest to funkcjonalność TS (nie istnieje w JS). Umożliwa oznaczeni pól klasy jako tylko do odczytu.

```js

class SomeClass {
  constructor(private readonly id) {

  }
}

```

### protected, public

protected, public to dodatek TS. Nie istnieje odpowiednik w vanilla js

### Gettery i settery

Możemy wykorzystać specjalny zapis js dla getterów i setterów

```js
class SomeClass {
    private someParam: string;

    // słowo kluczowe get
    get getSomeParam() { // nazwa nie może być taka sama jak nazwa parametru
        return this.someParam;
    }

    set setSomeParam(value: string) {
        this.someParam = value;
    }
}

// następnie używamy pól jak atrybutów

someClassObject.getSomeParam; // zwara wartość gettera
someClassObject.setSomeParam = 'someNewValue'; // wywołuje settera klasy
```

## Używanie

- instalacja poprzez npm, instalujemy w trybie globalnym

```bash
npm install -g typescript
```

- Tworzymy plik TS np. nazwa_pliku_do_kompilacji.ts

```js
let somets: string = "test";
```

- Następnie używamy typescript poprzez polecenie tsc
  - W parametrze podajemy plik TS do kompilacji

```js
tsc nazwa_pliku_do_kompilacji.ts
```

### Tryb watch

Umożliwia uruchomienie tryby w którym plik zostanie przekompilowany w momencie jak zajdzie jakaś zmiana

```js
tsc --watch twoj_plik.ts
```

### Tryb komplilacji całego projektu

Aby kompilować wszystkie pliki w projekcie wykonujemy polecenie

```js
tsc --init
```

to nam tworzy plik tsconfig.json w projekcie, nic mie musimy z tym robić. Mamy tam konfiguracje TS (jeśli chcemy to zmieniamy)

Następnie odaplamy polecenie

```js
tsc;
```

aby przekompilować cały projekt lub to samo w trybie --watch

### Includowanie / Excludowanie plików

Aby excludować plik z kompilacji, w pliku tsconfig.js

```js
...
"exclude": {
  "analytics.ts"
  "node_modules" // warto dodać aby tego nie kompilować
  // *.dev.ts - aby excludować wszystkie takie pliki
  // **/*.dev.ts - aby excludować wszystkie takie pliki w dowolnym katalogu
}
```

aby includować pliki do kompilacji, w pliku tsconfg.js

```js
"include": {
  "app.ts",
  ...
}
```

pominięte pliki w include zostana zignorowane, wiec to przydatne gdy nie chcemy robić dużej listy w exclude

### Opcje tsconfig.js

#### target

target określa do jakiej wersji JS chcemy kompilować nasz kod TS'a. To ma znaczenia obsługi przez przeglądarki.

TS umożliwa że kompiluje es5, który nie posaida let oraz const.

#### lib

umożliwa określenie jakie opcje posiada TS. Na przykład obsługę globalnej zmiennej document. Domyślnie posiada opcje aby to złapać.

#### allowJs

Umożliwa aby TS akceptował zwykły JS w samym sobie. Przydatne kiedy mamy jakies legacy i nie chcemy tego przepisywać.

#### checkJS

TS będzie też sprawdzał pliki .js zamias tylko .ts

#### sourceMap

Jak ustawimy na true to generuje nam plik .js.map plik, to powoduje że przegladarka widzi wszystkie pliki projektu. (do przetestowania)

Jest to przydatna opcja do debugowania, ponieważ możemy debugować nasz kod JS w samej przegladarce.

#### outDir, rootDir

umożliwa zmiane struktury projektu, na przykład jak chcemy aby TS generował pliki js w katalogu dist itp.

#### removeComments

Usuwanie kometarzy w finalnym buildzie TS

#### noEmitOnError

Umożliwa zablokowanie generowania pliku TS jeśli znajdują się w nim błędy. Przydatne, domyślnie sa generowanie pliki co może prowadzić do "olewania" problemów.

#### strict

oznacza że wszystkie opcje sprawdzania kodu są uruchomoione.

Natomiast mamy konkretne opcje

- NoImplicitAny - blokuje używania parametrów które nie sa jasno określone. Nie akceptuje typu "any"
- strictNullChecks - blokuje zmiennej które potencjalnie mogą być nullem (brak inicjacji). Na przykłąd pochodzi ze funkcji która MOŻE zwrócić null'a
- strictFunctionTypes - sprawdzanie syngnatury funkcji
- strictBindCallAplly - sprawdzanie czy przekazujemy wszystkie potrzebne parametry

## Typy TS

- number
  - 1, 5.3, -10
- boolean
  - true, false
- string
  - 'Hi', "Hi", `Hi`
- object

  - w przypadku braku typowania, TS ustawi domyślne typy po inicjujacej wartości kluczy
  - domyślnie typujemy poprzez "object", natomiast to powoduje że TS nie ma informacji o typach pól, powoduje to potem problemy przy kompilacji

        ```js
        const person: object = { name: "test" };
        console.log(person.name); // bład kompilacji, to tylko pusty obiekt dla TS
        ```

  - jeśli chcemy określić jak powinnien być zbudowany obiekt zapisujem to jak poniżej

        ```js
        const person: { name: string } = { name: "test" };
        console.log(person.name); // brak błedu kompilacji! TS wie czego się spodziewać
        ```

  - w przypadku zagnieżdzania obiektu zapisujemy to jak poniżej

        ```js
        const person: {
            id: string,
            price: number,
            tags: string[],
            details: {
                title: string,
                description: string,
            },
        } = {
            id: "abc1",
            price: 12.99,
            tags: ["great-offer", "hot-and-new"],
            details: {
                title: "Red Carpet",
                description: "A great carpet - almost brand-new!",
            },
        };
        ```

- array
  - może przechowywać dowolną kolelcje typów np. number, string itp.
  - musimy określić typ danych w array np. string[] lub określić że typy moga być dowolne (mieszane) poprzez any[]
- tuple
  - Jest to array z określonymi typami elementów
  - np. [number, string]
- enum

  - Typ dodany przez TS

    ```js
      enum Role { ADMIN, READ_ONLY, USER }
    ```

  - TS pod spodem zamienia to na integer, ale zystkujemy możliwość czystego kodu
  - ewentualnie możesz ustawić wartość enum

    ```js
      enum Role { ADMIN = 'ADMIN', READ_ONLY = 'READ_ONLY', USER = 'USER' }
    ```

- any
  - Dowolny typ, wylaczenie komplilatora TS
  - nie jest zalecane używanie

## Union Type

umożliwa wskazanie kilku typów dla zmiennej itp.

np.

```js
function combine(input1 number | string, input2) {

}
```

## Typ literany

W TS możemy ustawlić literalną wartość dla zmiennej. Jest to przydatne jako element syngatury funkcji

```js
funciton combine(someparam: 'first-value' | 'second-value') {}
```

Od teraz TS będzie pilnował czy przypadkiem nie zrobliliśmy literówki w parametrze!

## Typ aliasu

Umożliwa ukrycie pod aliasem bardziej skomplikowany typ np. Union czy literał

```js
type Combinable = numer | string;
type SomeLiteral = "someliteral" | "otherliteral";
```

Dodatkowo możemy tworzyć własne typy w TS!

```js
type User = { name: string, age: number };
const u1: User = { name: "Max", age: 30 };
```

## Zwracany typ funkcji

W TS możemy ustalić zwracany typ poprzez funkcje, jeśli tego nie zrobimy to TS automatycznie domyśli się jaki to powinnien być typ.

```js
function something(): number {
  return 1;
}
```

Jeżeli funkcja nie zwraca niczego powinna być void

Uwaga! Funkcja nie może zwracać typu undefined, w takim przypadku powinnien być to typ void. Co ciekawe możemy typować zmienną jako undefined (zamiast void)

## Typ funkcji

W TS możemy oznaczyć zmienną jako funkcje (przechowuje referencje do funkcji)

Możemy to określić jako "ogólnie" funkcje, natomiast to nie gwarantuje że to będzie dokładnie taka funkcja (o tej sygnaturze)

```js
let someFunction: Function;
```

W inny przypadku możemy określić synature funkcj jaka możemy przypisać do zmiennej

```js
let someFunction: (a: number, b: number) => number;
```

## Przekazanie w sygnaturze callbacka

Aby przekazać callback w sygnaturze funkcji, robimy tak jak poniżej

```js
function someFunction(a: number, b: number, cb: (a: number) => void) {
  cb(a);
}
```

## Typ unknown

Jest podobny do typu any, przyjmuje dowonlną wartość natomiast posiada znaczącą różnicę. Nie może być przypisany do innej zmiennej która posiada już jakiś typ, takie lekkie zabezpiecznie

```js
let ui: unknown;
let ux: string;

ui = 5; // ok
ui = "Max"; // ok
ux = ui; // blad komplilacji, nie można przypisać unknown do string!
```

## Typ never

Jest to typ oznaczający że funkcja nigdy niczego nie zwraca, ale w sensie że nie wykonuje się zupełnie np.

```js
function someFunction(): never {
  throw Error("some error, function never execute properly");
}
```

Jest to tylko pomocne oznaczenie takie przypadku, dosyć rzadkiego

## interface

Jest to specjalny typ istniejący tylko w TS

```js
interface SomeInterface {
  name: string;
  age: number;
  greet(phrase: string): void;
}

let user: User;
```

Używamy do do opisu obiekty, alternatywą jest customwy typ ale to są odrębne koncpecje

- customowy typ - opisuje typ danych
- interfejs - opisuje obiekt

### Interfejs dla klasy

- Interejsy nie są tłumaczone do vanilla js, to byt istniejący tylko w TS

```js
interface SomeInterface {
  // w TS interfejs może zawierać pola oraz metody
  someMandatoryField: string;
}

class SomeClass implements SomeInterface {
  someMandatoryField: string; // musimy przykryć interfejs
}

let someObject: SomeClass; // mamy pewność że obiekt posiada metody interfejsu
```

### Read only atrybut na interfejsie

Możemy zdefinować w interfejsie atrybut jako read only, co powoduje że nie będzie możliwości zmiany

```js
interface SomeInterface { // w TS interfejs może zawierać pola oraz metody
    readonly someMandatoryField: string;
}

class SomeClass implements SomeInterface {
    someMandatoryField: string; // musimy przykryć interfejs
}

let someObject: SomeClass; // mamy pewność że obiekt posiada metody interfejsu

someObject = new SomeClass();
someObject.someMandatoryField = 'someValue'; // bład kompilacji
```

### Interfejsy mogą dziedziczyć

Interfejs może dziedziczyć po innym interfejsie

```js
interface SomeInteface1 {
  name: string;
}

interface SomeInterface2 extends SomeInteface1 {
  surname: string;
}
```

### Interfejs może być sygnaturą dla funkcji

```js
interface SomeFunctionInterface {
  (a: number, b: number): number;
}
```

### Interfejsy opcjonalne parametry oraz metody

- znak ? dla parametrów
- znak ! dla metod

```js
interface SomeInterface {
    optionalParam?: string,
    optionalMethod! => (a: number): number
}
```

## Zaawansowane typy - Advanced types

### Intersekcja typów

Możemy połczczyć różne typy w TS

```js
type Admin = {
  name: string,
  access: boolean,
};

type Employee = {
  position: string,
};

type ElevatedEmployee = Employee & Admin;
```

Możemy uzyskać podobny efekt poprzez interfejsy, natomiast w takim przypadku mamy inny operator łączenia

```js
interface Admin = {
    name: string,
    access: bool
}

interface Employee = {
    position: string
}

interface ElevatedEmployee extends Employee, Admin; // połączenie dwóch interfejsów
```

Operator działa inaczej w przypadku typów prostszych, w takim przypadku szuka wspólnej części tych zmiennych

```js
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric; // będzie to typ numeric, bo to jest wspólne
```

### Strażnik typu - Type Guard

Strażnik typu to podpowiedź dla TS że sprawdzamy czy rzeczywiście zmienna jest tym czym powinna być

Pierwszy guard - typeof

```js
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

function add(a: Universal, b: Universal) {
  if (typeof a === "string" || typeof b === "string") {
    // to jest strażnik typu, bez tego dostalibyśmy bład kompilacji. TS domyśla że przypadek stringowy rozwaliłby nam kodzik
    return a.toString() + b.toString();
  }
  return a + b;
}
```

Kolejny guard - składnia 'jakisAtrybut' in object

```js
type Admin = {
  name: string,
  access: boolean,
};

type Employee = {
  position: string,
};

type UnknownEmplyee = Employee | Admin;

function printEmplyee(a: UnknownEmplyee) {
  if ("access" in a) {
    // type guard, zapewniamy TS że to zadziała
    console.log(a.access);
  }
}
```

Ostatnią opcją jest aby użyć instanceof. Uwaga! To zadziała tylko jeśli to jest istniejąca klasa w kodzie. **Nie zadziałą to dla składki TS, np. typu, czy interfejsu**

```js
instanceof NazwaKlasy
```

### Discriminated Unions

Możemy TS podpowiedzieć typ poprzez wspólne pole np. type. Jest to technika Discriminated Unions

```js
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runingSpeed: numer;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let s;
  switch (
    animal.type // istotne dla TS, rozpoznanie jakie to typ.
  ) {
    case "bird": // Uwaga! TS nawet rozpoznaje jeśli zrobimy literówke w typie! Super!
      console.log(animal.flyingSpeed); // jest ok, TS wie że to odpowiedni obiekt
    case "horse":
      console.log(animal.runingSpeed);
  }
}
```

### Castowanie typu

W TS możemy castować typ

```js
// pierwszy sposób castowania elementu <NazwaTypu>
// Uwaga! Ten sposób nie jest przyjazny w aplikacjach reaktowych, może być trakotwane jako component..
const userInputElement = <HtmlInputElement>document.getELementById("someIdElement")!;

// drugi sposób castowania elementu as NazwaTypu
const userInputElement = document.getELementById("someIdElement")! as HtmlInputElement;

userInputElement.value = 'Hiii';

// kolejna alternatywa, skrótwa do castowania jak powyżej
(userInputElement as HtmlInputElement).value = 'Hiii';
```

### Ineksowane atrybuty - Index Properties

W przypadku kiedy mam potrzebe zdefinoiwania obiektu który może posiadać różne atrybuty ale konkretnego typu

```js
interface ErrorContainer { // chcemy aby mógł posiadać pola typu: email: 'błedny email', username: 'błedne znaki' itp
  [props: string]: string // tutaj określamy że może posiadać WIELE LUB WCALE atrybutów ale MUSI być klucz string oraz wartość string
  id: string; // jeśli chcemy dodać konkretne pole to musi się zgadzać z tym powyżej!
  something: number; // BŁAD KOMPILACJI, nie zgadza się z dynamicznym polem
}
```

### Preciążanie funkcji - function overloads

Przeciązanie funkcji (tak jak w c++)

```js
type Combinable = string | number;

function add(a: number, b: number): string;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b:number): string; // przeciażenie syngnatury funkcji, number będzie też pasował do implementacji
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    // to jest strażnik typu, bez tego dostalibyśmy bład kompilacji. TS domyśla że przypadek stringowy rozwaliłby nam kodzik
    return a.toString() + b.toString();
  }
  return a + b;
}
```

### Opcjonalnie wywoływanie w łancuchu - Optional Chaining

W przypadkiu kiedy nie wiemy czy dany atrybut istnieje możemy poinstruować TS że dane pole może nie istnieć na obiekcie

```js
const fetchedUserData = {
  id: "u1",
  name: "Max",
  // job: { title: 'CEO' } // w takim przypadki będzie ok, TS został poinformowany że pole może nie istnieć, natomaist może się pojawić poźniej
};

fetchedUserData?.job?.title; // ?. oznacza że pole może nie istnieć. Jeśli pole nie istnieje to przerywa łańcuch

// odpowiednik w vanilla JS, sprawdzenie czy dane istnieją
if (fetchedUserData.job && fetchedUserData.job.title) {
  // coś tam zrób
}
```

### Zlewanie się nulla - Null Coalescing

W przypadku kiedy chcemy aby TS przypisał konkretną wartość w przypadku kiedy wartość jest nie ustawiona (null, undefined)

```js
const userInput = undefined; // w przypadku "" (pusta wartość) to przejdzie dalej!
const storedData = userInput ?? "DEFAULT"; // przypisz wartość DEFAULT jeśli userInput jest nie ustawiony
```

## Generyczne typy - Generics

https://www.typescriptlang.org/docs/handbook/generics.html

Typ generyczny to typ który jest silnie powiązany z innym typem. Główny typ finalnie zwraca swój powiązany typ, np Array złożny z string'a (Array<string>) albo promise który zwraca string (Promise<string>)

**Generyczne typy dają nam to elastyczność z bezpieczństem typu**

Uwaga! W przypadku array mamy ten sam zapis dla:

```js
Typ Array<string> = string[]
```

Typ generyczny pozwala przewidzieć co będzie wynikiem np.

```js
let someResult = await function somePromise(): Promise<string>
someResult.split(' '); // to działa! TS wie że zwrotką będzie string z promise (po await, czyli resolve)
```

### Generyczna funkcja

W przypadu kiedy łączymy dynamiczne obiekty możemy to zdefinować jako generycznye typy

```js
function merge<T, U>(objA: T, objB: U) {
  // Uwaga! gdybyśmy tego nie zrobili i zwracali zwykły obiekt spowodowałoby to bład kompilacji
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Max" }, { age: 30 }); // TS automatycznie uzupełnia generyczne typy zgodnie z tym co wstawiliśmy do parameterów
mergedObj.name; // brak błedu komplikacji, TS wie że to będzie obiekt jakiegoś dynamicznego typu

// możemy też zdefiniować dla TS jakiego typu będą parametry przekazane do generycznej funkcji
const mergedObj1 = merge<string, number>(...);
```

### wymuszenie konkretnego typu dla generycznych parametrów

Możemy wymusić z jakiej "rodziny" typów musi być wskazany generyczny parametr

```js
// parametr T MUSI być obiektem
function merge<T extends object, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
```

### kolejny przykład funkcji generycznej

```js
interface Lengthy {
  length: number;
}

function counterAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let dt = "Got no value";
  if (element.length === 1) {
    dt = "Got 1 element";
  } else if (element.length > 1) {
    dt = `Got ${element.length} elements`;
  }
  return [element, dt];
}

counterAndDescribe('some text'); // jest ok, string posiada właściwość length
```

### funkcja generyczna z dynamicznymi kluczami - keyof

Przykład kiedy mamy funkcję generyczną która zwraca klucz dynamicznego obiektu

```js
function extractAndConvert<T: extends object, U extends keyof T>(obj: T, key: U) {
  return `Value: ` + obj[key];
}

extractAndConvert({}, 'name');
```

### Klasy generyczne

Tak jak funkcje, możemy tworzyć też generyczne klasy.

```js

class DataStorage<T> { // gdzie T może być np. string, object itp.
  private data:T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>{}; // przychowujemy string'i
const numberStorage = new DataStorage<number>{}; // przychowujemy number'y
```

### Typ generyczny Partial

Typ Partial pozwala nam na "tymczasowe" zbudowania pustego obiektu jakiegoś konkretnego obiektu. Tak aby następnie dynamicznie dodać niezbędne pola. Może być przydatne przy tworzeniu obiektu w builderze itp.

```js
interface CurseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  completeUntil: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}; // To działa! TS ma obiecane że finalnie z tego powstanie obiekt CourseGoal
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = completeUntil;
  return courseGoal as CourseGoal; // Uwaga! Tutaj musimy castować ponieważ to nadal był Partial
}
```

### Typ generyczny Readonly

Readonly pomaga nam zablokować dane na jakiekolwiek zmiany

```js
const names: Readonly<string[]> = ["Max", "Anna"];
names.push("Something"); // nie zadziała, names jest tylko do odczytu
```

### Typ generyczny vs Union type (łączenie typów)

Jest znacząca różnica pomiędzy typem generycznym a unionem.

Co istotne union powoduje że typy mogą być wymieszane!

```js
class UnionDataStorage {
  private data: (string | number | boolean)[] = []; // w tym przypadku możemy mieszać typy!
}
class GenericDataStorage<T> {
  private data: (T)[] = []; // w tym przypadku mozemy ustalić że będziemy mieć tylko konkretny typ! To jest lepsze!
}
```

## Dekoratory - Decorators

Dekoratory to funkcje które dodajemy do klas, "dekorujemy"

Odpala się w momencie jak klasa jest inicowana

Jest to wykorzystywane w np. Angularze do generowania templatki (podpiętę pod klase komponentu)

Jest to forma "meta programming" czyli dodawanie kolejnch warstw logiki poprzez dekoratory

Uwaga!

```
Dekoratory wymagają w tsconfig.json opcji:

- "target": "ed6"
- "experimentalDecorators": true -> odkomentować w konfiguracji
```

przykład dekoratora

```js
function Logger(constructor: Function) {
  // constructor to funkcja konstruktora z klasy, możemy jej użyć aby utworzyć instancje klasy do której jest podpięty dekorator
  const someNewObj = new constructor();
  console.log("Logging...");
}

@Logger
class Person {
  name = "Max";

  constructor() {
    console.log("Someting...");
  }
}
```

możemy też inaczje zapisać dektoratora, w taki sposób aby móc go sparametryzować

```js
function Logger(someStringParam: string) {
  return function (onstructor: Function) {
    // w tym przypadku zwracamy funkcje dektoratora
    console.log("Logging...");
  };
}

@Logger("Some passed value") // teraz możemy sparametryzować dekorator!
class Person {
  name = "Max";

  constructor() {
    console.log("Someting...");
  }
}
```

bardziej praktyczny robudowany przykład

```js
function withTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  };
}

@withTemplate("<h1>asdas</h1>", "some-selector") // teraz możemy sparametryzować dekorator!
class Person {
  name = "Max";

  constructor() {
    console.log("Someting...");
  }
}
```

Możemy dodawać wiele dektoratów do klasy

Co istotne:

- Dekoratory tworzą się w kolejności od góry do dołu
  - np. inicjacja
- Dektoratory wykonują się w kolejności od dołu do góry
  - już body funkcji dektoratora

```js
function Logger(someStringParam: string) {
  console.log('LOGGER'); // to wykona się pierwsze w kolejności!
  return function (constructor: Function) {
    console.log('INSIDE LOGGER'); // to wykona się w czwartej kolejności
    // w tym przypadku zwracamy funkcje dektoratora
    console.log("Logging...");
  };
}

function withTemplate(template: string, hookId: string) {
  console.log('TEMPLATE'); // to wykona się w drugiej kolejności
  return function (constructor: any) {
    console.log('INSIDE TEMPLATE'); // to wykona się w drugiej kolejności
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  };
}

@Logger("asdas")
@withTemplate("<h1>asdas</h1>", "some-selector") // ten dekorator jest pierwszy!
class Person {
  name = "Max";

  constructor() {
    console.log("Someting...");
  }
}
```

Dekoratory też możemy dodawać do

- atrybutów klas
- metod
- parametrów metod

**Uwaga! Wszystkie poniższe dekoratory odpalają się w momencie jak DEFINIUJEMY KLASE**

Celem jest odpowiednie przygotowanie klasy zanim rozpocznie się wykonywanie kodu, tzw. udekorowanie klasy

```js
// target any ponieważ nie wiemy co to będzie
// propertyName to nazwa właściwości
function Log(target: any, propertyName: string | Symbol) {
  console.log('dekorator atrybutu: ' + propertyName);
}

// można dodać do dowolnej metody
funciton Log2(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('dekorator akcesora: ' + name)
}

// można dodać do dowolnej metody
// position -> to jest pozycja argumentu w sygnaturze metody
funciton Log3(target: any, name: string | Symbol, position: number) {
  console.log('dekorator akcesora: ' + name)
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    this._price = 0;
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log2
  someMethod(@Log3 someParam: string) {
    console.log('doing nothing');
  }
}
```

Dekoratory też mogą zwracać wartość w postaci nowego obiektu. Pozwala to dekorować obiekt customową logiką. A nawet zwrócić inny obiekt np. jakiegoś interfejsu.

Dekoratory które mogą zwracać wartość to podpięte do

- klasy
- metod
  - tutaj możemy zwrócić inny obiekt property descriptor i zmienić w jaki sposób zachowuje się metoda.

Oczywiście inne mogą też zwracać, ale nie będzie to brane pod uwagę

```js
function withTemplate(template: string, hookId: string) {
  console.log('TEMPLATE'); // to wykona się w drugiej kolejności
  return function<T extends { new (...args: any[]): {name: string}}> (originalConstructor: any) { // { name: string } po to aby TS wiedział że obiekt będzie posiadał pole name
    return class extends originalConstructor {
      constructor(..._: args) { // zmienna to _ aby TS nie przyczepiał się do tego że używamy tego parametru
        super(); // inicujemy parenta czyli nasz orginalny obiekt
        // tutaj customowa logika
        console.log('INSIDE TEMPLATE'); // to wykona się w drugiej kolejności
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    }
  };
}

@withTemplate("<h1>asdas</h1>", "some-selector") // ten dekortor kompletnie zmienia naszą klasę! wow
class Person {
  name = "Max";

  constructor() {
    console.log("Someting...");
  }
}
```

Wykorzystanie dektoratora do naprawy problemu scop'u this w podpiętym evencie

```js
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() { // nadpisujemy metodę get tej metody
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
}

class Printer {
  message = "this works";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage); // to zadziała!
// w vanilla js musielibyśmy zrobić tak jak poniżej, dektorator to za nas naprawia
// button.addEventListener('click', p.showMessage.bind(p));
```

Dektoratory dla walidacji - przykład

To jest książkowy przykład użycia dekoratorów. To mogłoby być zewnętrzna biblioteka która umożliwia Ci udekrowanie klasy odpowiedniami constraintami

przykład biblioteki: https://github.com/typestack/class-validator

```js
function Required() {}

function PositiveNumber() {}

function validate(obj: object) {}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

// poźniej w kodzie np.

validate(formData); // co odpali logikę walidacji, w zależności od konfiguracji walidatorów
```

## Moduły

Moduły to sposób na podzielenie swojego kondu na wiele plików, tak aby potem to includować.

sposoby:

- Namespaces and file bundling
  - tylko w TS
  - grupowanie po namespace
  - importowanie po namespace
  - per plik lub bundluje wszystkie pilki do jednego wspólnego (automatycznie)
- ES6 imports/Exports - ES6 modules
  - niezalezne od TS, vanilla JS
  - dostępny w wielu przeglądarkach
    - przeglądarki samodzielnie importują potrzebne pliki
  - wspierane przez TS
  - per plik ale wystarczy jeden import (script tag)
  - potrzebny jest webpack aby uzyskać bundle (jeden plik) zamiast extra requestów po pliki

### Namespaces and file bundling w TS

Przykład wykorzystania namespaców w TS

np. plik some_interesting_class.ts

```js
namespace App { // Uwaga musimy mieć ten sam namespace!
  export class SomeInterestingClass { // Uwaga musimy mieć export aby typ był widoczny, tylko w przypadku kiedy chcemy aby było widoczne
    public someName: string;
  }
}
```

następnie mamy nasz główny plik app.ts

```js
// poniżej specjalna składnia importu, znaki /// to specjalny zapis dla TS
/// <reference path="some_interesting_class.ts">

namespace App { // Uwaga musimy mieć ten sam namespace!
  class SomeClassUsingInterestingClass {
    public someInterestingAttr: SomeInterestingClass; // to możliwe bo TS widzi ten plik w imporcie
  }
}
```

**Uwaga!** Aby nie mieć problemów z ładowaniem plików po stronie przeglądaki musimy złaczyć nas wynik do jednego pliku. Możemy to zrobić poprzez ustawienie w konfiguracji

- outFile -> np. /dist/bundle.js
  - Uwaga! ten plik będziemy następnie ładować po stronie HTML (script tag)
- module -> amd

Minusem namespace w TS jest to że plik includowany w innym miejscu może nam dać złudzenie że nie musimy tego importować w innym. Nie ma technicznego wymogu aby importować to co realnie jest używane w pliku. Natomiast może to potem prowadzić do skomplikowanych bugów gdzie usunięcie jednego reference popsuje inny plik który na tym polegał.

### ES6 import / export

W tej styuacji jest znacznie prościej.

Uwaga! Domyślnie to będzie działać tylko w najnowszych przeglądarkach (wspierające ES6). Przeglądarka automatycznie dociągnie brakujacy plik poprzez request HTTP.

Aby to uruchomić dla starszych przeglądarek musimy dodać do naszego stacku Webpacka (spakuje wszystko w jeden bundle)

Przykład wykorzystania namespaców

np. plik some_interesting_class.ts

```js
  export class SomeInterestingClass { // wystarczy sam export!
    public someName: string;
  }
```

następnie mamy nasz główny plik app.ts

```js
// poniżej specjalna składnia importu, znaki /// to specjalny zapis dla TS
/// <reference path="some_interesting_class.ts">
import { SomeInterestingClass } from 'some_interesting_class.js'; // Uwaga! tutaj końcówka musi być js, finalnie to będdzie ładowane przez przeglądarke

class SomeClassUsingInterestingClass {
  public someInterestingAttr: SomeInterestingClass; // widoczne po imporcie
}
```

Następnie w opcjach TS musimy ustawić:

- module -> ES2015

oraz przy tagu script który ładuje aplikacje dodać type="module"

```html
<script type="module" src="/dist/app.js"></script>
```

Dużą zaletą takiego podejścia jest to że teraz każdy plik musi samodzielnie importować wymagane zależności. Mniej dziwnych bugów.

Dodatkowo możemy:

- zgrupować importy z pliku do jakiegoś agregatora np.

```js
import * as MyPackage from "some-file.js";
new MyPackage.SomeExportedClass(); // używamy po kropce
```

- Wykonać rename importu tylko w konteście tego pliku

```js
import { SomeExportedClass as RenamedExportedClass } from "some-file.js";
new RenamedExportedClass();
```

- Wykonać default export aby dać znać który obiekt będzie domyślnie importowany

some-file.js

```js
export default SomeExportedClass {};
```

app.js

```js
import SomeExportedClass from "some-file.js"; // domyślnie importowany wieć nie potrzeba { }
new SomeExportedClass();
```

Uwaga! Kod importowanego pliku wykonuje sie tylko jednokrotnie. Nie zależnie ile razy jest importowany!

```js
export default SomeExportedClass {};
console.log('Jakiś log'); // zobaczymy tylko jednokrotnie, niezależnie ile razy moduł został zaimportowany
```
