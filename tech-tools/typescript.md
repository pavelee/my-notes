# Typescript

## Ogólne

- Jest to nakładka na JS
  - wprowadza silne typowanie do JS
- kompiluje do natywnego JS'a
- W przypadku braku jawnego typowania ts domyśla się typu po przypisanej inicacyjnej wartości
- wszystkie typy w TS sa zapisane małymi literami np. string, number
- Przykład typowania zmiennej

```js
let myVariable: string;
```

## Używanie

- instalacja poprzez npm, instalujemy w trybie globalnym

```bash
npm install -g typescript
```

- Tworzymy plik TS np. nazwa_pliku_do_kompilacji.ts

```js
let somets: string = 'test';
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
tsc
```

aby przekompilować cały projekt lub to samo w trybie --watch


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
    const person: object = { name: 'test' }
    console.log(person.name); // bład kompilacji, to tylko pusty obiekt dla TS
    ```

  - jeśli chcemy określić jak powinnien być zbudowany obiekt zapisujem to jak poniżej

    ```js
    const person: { name: string } = { name: 'test' }
    console.log(person.name); // brak błedu kompilacji! TS wie czego się spodziewać
    ```

  - w przypadku zagnieżdzania obiektu zapisujemy to jak poniżej

    ```js
    const person: {
        id: string;
        price: number;
        tags: string[];
        details: {
            title: string;
            description: string;
        }
    } = {
        id: 'abc1',
        price: 12.99,
        tags: ['great-offer', 'hot-and-new'],
        details: {
            title: 'Red Carpet',
            description: 'A great carpet - almost brand-new!'
        }
    }
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
type SomeLiteral = 'someliteral' | 'otherliteral';
```

Dodatkowo możemy tworzyć własne typy w TS!

```js
type User = { name: string; age: number };
const u1: User = { name: 'Max', age: 30 };
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
let someFunction: (a: number, b: number) => number
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
ui = 'Max'; // ok
ux = ui; // blad komplilacji, nie można przypisać unknown do string!
```

## Typ never

Jest to typ oznaczający że funkcja nigdy niczego nie zwraca, ale w sensie że nie wykonuje się zupełnie np.

```js
function someFunction(): never {
  throw Error('some error, function never execute properly');
}
```

Jest to tylko pomocne oznaczenie takie przypadku, dosyć rzadkiego
