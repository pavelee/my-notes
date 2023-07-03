# Typescript

## Podstawy Type Safety

-   po co type checker?
    -   redukujemy naszą odpowiedzaloność za sprawdzanie typów
    -   zaufanie do kompilatora, mamy większy komfort pracy
    -   wychwytywanie błedów wcześniej, w compile-time zamiast runtime
        -   mniej debugowania!
    -   nie potrzebujemy testów dla poprawności struktur, type checker to już robi za nas
    -   typ to podpowiedź, szczególnie dla innych programistów którzy używają nas kod
        -   pozwala zapisać intencje programisty
-   ogranicznia TypeScripty
    -   nie sprawdziwmy poprawności odpowiedzi z API
        -   to jest nieznane do momentu odpalenia kodu
    -   warunki wyścigu (race conditions)
        -   problem kiedy TypeScript nie jest pewien czy zmienna jest już zainciowana
        -   tutaj możemy to potwierdzić że tak będzie poprzez znak ! ale bierzemy na siebie odpowiedzalność
    -   niektóre operacje JS koercja, TypeScript pozwala na to co już silnie wrosło w JS-owa tradycje
        -   {} + ''
        -   100 / 0 -> to przejdzie chociaż i tak dostaniemy wynik w postaci inifinity
-   kompilator powiada nam gdzie kod może się wywalić
    -   znajdujemy błędy we wczesnym etapie
-   nie powinniśmy czekać z upgradewaniem wersji TS, czym później tym to będzie trudniejsze
    -   to jak z pull requestami, czym dłużej leża tym merge będzie trudniejszy
-   TS możemy wypróbować online -> https://www.typescriptlang.org/play
    -   Też się sprawdza do testowania nowej wersji
    -   Nowe wersje wychodzą średnio co 2 miesiące :o
-   jest to przydatne w przypadku dzielenie się kodem
    -   my sami znamy nasz kod, inny nie koniecznie
-   jeśli jest jaka korzyść, to musi być cena
    -   tutaj ceną jest potrzeba znajmości typów
-   popularne type checkery w świecie JS
    -   TypeScript
    -   Flow
    -   PureScript
    -   Hegel
-   Najlepszym wyborem jest TypeScript ponieważ jest najbardziej popularny

### System typów Typescript

-   typowanie statyczne vs dynaminczne
    -   typowanie statyczne wymaga od nas określenai jaki to będzie typ danych
        -   spowolni pisanie kodu bo musimy przmyśleć jakie typ danych to będzeie
        -   jakość kodu wzrośnie, jest to inwestycja aby mieć mniej bugów w kodzie
    -   typowanie dynamiczne nie wymaga myślenia o typie, jest to płynne
        -   prostsze w użyciu, szybsze
        -   ceną jest mniejsza jakość kodu, więcej potencjalnych runtime errorów
        -   mimo szybszego developementu, poprawa błedów może skutować utratą czasu
-   typowanie silne vs słabe
    -   ocena nie jest 0/1, różne jezyki mają różny poziom silności/słabości, to często ocena subiektywna, zależna od programisty
    -   dla nie poprawnych operacji
        -   silne rzuci błedem
            -   wolimy to w bardziej "poważnym" sofcie
            -   operacja 5 / 0 nie pozwoli na kompilacje kodu
            -   tzw. loud fail
        -   słabe probram działa dalej "jakoś"
            -   tzw. silent fail
            -   np. dla operacji 5 / 0 -> dostaniemy infinity zamiast bład działania
            -   jest to dobre dla poczatkujących
            -   każdy słaby język ma inną graince akceptowalności błedów
                -   w ES6 js nie akceptuje dwóch letów dla zmiennej
-   przykłady znanych jezyków w kwestii bycie statycznym i silnie typowanym
    -   java -> statyczna & silna
    -   python -> dynamiczny & silny
    -   js -> dynamiczny & słaby
    -   TS -> stopniowo typowany - stopień silności zależy od ustawień
-   poliformizm w TS
    -   apparent type - jak kompilator to widzi, co wie
    -   actual type - czym realnie jest obiekt (RunTime)
-   Typowanie: strukturalne vs nominalne
    -   Pytanie, co to znaczy że coś jest kompatibilne z intefejsem X?
    -   Nominalne - implementuje Java, C#
        -   istotna jest nazwa klasy/intefejsu, hierarchia dziedziczenia
        -   dwie klasy o tej samej strukturze NIE SA TOZSAME
        -   poliformizm oparty o klasę bazową interejs
    -   Strukturalne - implementuje TS
        -   istotnaj jest zawartość obiektu
        -   dwie identyczne struktury są TOŻSAME
        -   poliforizm strukturalny
-   Anotacje vs asercje (Typów)
    -   wnioskowanie typu
        -   var e = value -> typ e przyjmie domyślnie typ value (kompilator domyśli się)
    -   anotacja typu
        -   var e: string = value -> typ e to string! Mamy Type Safe!
    -   asercja typu
        -   var e = value as string -> Wiemy lepiej co to jest, wymuszamy typ!
        -   jest to niebezpieczne, możemy się pomylić
        -   tracimy korzyści z Type Safe
        -   asercja istnieje jako "furtka" w momencie jak kompilator źle wnioskuje typ danych
        -   stosujemy to jako ostateczność!
-   Technniczne TypeScript posiada dwie przestrzenie nazw (namespace)
    -   przestrzeń nazw
        -   to przenika do JS
    -   przestrzeń typów
        -   to istnieje tylko w TS, ulotni się podczas kompilacji
    -   technicznie rzecz biorąc możemy mieć zmienną oraz typ danych o tych samych nazwach, to możliwe!
-   Wnioskowanie Typów
    -   Różnicą pomiędzy instrukcją a wyrażeniem
        -   instrukcja to najmniejsza jednostka, jakiś rozkaz, bez typu
        -   wyrażenie to rzeczownik, jakaś rzecz, mają typ
        -   wyrażenie można przypisać do zmiennej, instrukcji nie
    -   Różnica let czy const
        -   let powoduje że zmienna na typ, może sie zmienić
        -   const powoduje że to jest jakaś wartość, jeśli nie ustalimy typu to przyjmie to przypisaną wartość jako stałą
            -   const x = 'napis' => typ -> "napis"
            -   const y: string = 'napis' => typ -> string
-   Zbiory zmiennych

    -   Typy to zbiory

        -   Typy top & bottom

            -   top - czyli wszystko

                -   możemy do nich przypisać dowolny elemement
                -   any - możemy stosować wszędzie
                    -   niebezpieczny, type unsafe, sprawaia że kompilator zamyka oczy
                    -   gubi błedy, bo wszystko jest zgodne w obie strony
                    -   jeżeli nadużywamy any to po co stosować TS?
                    -   ma to zastosowanie w fomie "poddania" się kiedy np. walczymy z zewnętrzną biblioteką
                    -   typy zbliżone
                        -   Function - any wśród funkcji
                        -   Object - prototyp wszystkich funkcji w js
                        -   object - non-primitive type
                -   unknown - nie możemy z tym nic zrobić do póki nie sprawdzimy czym jest, nic nie jest gwarantowane

                    -   czyli w funkcji musimy zweryfikować typ aby potwierdzić czym jest
                    -   to nam daje bezpieczeństwo w kodzie, należy zweryfikować czym jest zmienna
                    -   stostujemy wtedy kiedy nie wiemy czym coś jest

                    ```js
                    type Gruszka = { kolor: string };
                    type GruszkaSoczysta = Gruszka & { kolor: string }

                    // customowy type guard, aby sprawdzić czy obiekt jest kompatybilny!
                    function customTypeGuardGruszka(a: any): a is Gruszka {
                        return (a as Gruszka).kolor !== undefined;
                    }

                    function zjedzGruszke(gruszka: unknown): Gruszka {
                        if (customTypeGuardGruszka(gruszka)) {
                            return gruszka;
                        }
                        return { kolor: 'asds' }
                    }
                    ```

            -   bottom - czyli nic, zbiór pusty
                -   never
                    -   stosuje się dosyć rzadko, aby rzucić wyjątkiem
                    -   zwracają ja funkcje które są zapętlone
                    -   TS zwraca taki typ gdy przecięcie zbiorów typów jest puste
                    -   systemów typów potrzebuje mieć sufit oraz podłogę tak aby mieć od czego się odbić

    -   string, number, boolean to osobne zbiory
    -   Unie i przecięcia

        -   znakiem | ozbaczamy unie
            -   w tym przypadku TS nie wie ktorym typem jest obiekt, to powoduje że będzie wyrzucał błąd przy próbie wywołania metody jednego z nich
            -   będziemy mieć dostępne tylko to co występuje w obu obiektach jednocześnie np. pole name
        -   znakiem & przecięcia
            -   to tak jakby klasa implementowałą dwa interfejsy
            -   będziemy mieć dostępne wszystkie wspólne pola (to musi być jednoczęsnie połączenie obiektów)
        -   unie dyskriminacyjne

            -   wykorzystujemy wspólne pole Type aby podpowiedzieć jaki to typ

            ```js
            type A = { type: "A", uniqueField: "x" };
            type B = { type: "B" };
            type C = { type: "C" };
            type Union = A | B | C;
            type PropType = Union["type"];

            function someFunction(someParam: Union) {
                switch (someParam.type) {
                    case "A": // tzw. type guard
                        someParam.uniqueField; // TS już wie że to będzie typ A!
                        break;
                    default:
                        // tzw. exhaustiveness type
                        let x: never = someParam; // feature w TS, zabezpieczenie przed tym aby nie zapomnieć o dodaniu nowego typu
                }
            }
            ```

    -   opcja --strictNullChecks=false pozwala na przypisanie nulla do string
    -   Typy vs Intefejsy
        -   obiekty można otypować typem oraz intefejsem
        -   typy i interfejsy można rozszerzać, dziedziczyć oraz implementować
        -   więkoszości przypadków możemy używać ich zamiennie, nie ma to takiej różnicy
        -   jakie są różnice?
            -   declaration merging - tylko intefejsy mogą być mergowane do jednego wspólnego jeśli występują w wielu miejsach w kodzie (redux i redux-thunk)
            -   interejsy muszą znać wszystkie pola, odpadają unie i typy warunkowe
        -   Twórcy TS zalecają stosownie Intefejsów, może to przyspieczać kompilowanie kodu

## Triki

### Kompatibliność: Excessive Atrribute Check

W Ts mamy specjalny wyjątek gdzie nie możemy przypisać rozszerzonego literału do typu obiektowego, ma to taki cel aby wyłapywać literówki w przekazywanych parametrach do funkcji

Pozwala to wypłapać takie przypadki:

```js
type Konfiguracja = { version: "4" | "5" };

function MojaBiblioteka(conf: Konfiguracja) {}

MojaBiblioteka({ version1: "4" }); // błąd, literówka w literale
```

Jakby nie było takiego wyjątku to moglibyśmy mieć nie fajne bugi, tzw. silent fail

zespół TS chciał aby takie przypadki to było zawsze loud fail

#### Kompatiblilność: weak type

Weak type w TS to obiekt który posiada wszystkie opcjonalne pola.

Jest weak ponieważ można do niego przypisać dowolny inny obiekt.

Tutaj mam wyjątek, TS wali błedem jeśli chcemy przypisać do weak type obiekt który nie posiada chociaż jednego wspólnego pola.

Celem jest wyłapanie prawdopodonych czeskich błędów.

przykład

```js
type myWeakObject = {
    name?: string,
    value?: string,
};

const instanceOfMyWeakObjecy = { someNotExisingField: "asds" };

function weakFunction(o: myWeakObject): void {}

weakFunction(instanceOfMyWeakObjecy); // bład! brak ani jednego wspólnego pola z myWeakObject
```

### Object vs object

W TS nie powinniśmy stosować typu Object, to element samego JS i pozwala na takie cos jak

```js
let y1: Object = 4; // zadziała :o
```

to wynika z tego że w JS mamy autoboxing i konwertuje 4 do obiektu

zmiast tego stosujemy typ zmałej litery (TS) czyli object

```js
let y2: object = 4; // nie zadziała, oczekuje realnego obiektu
```

### PropertyKey

PropertyKey to specjalny typ w TS, pasuje idealnie do klucza obiektu (generycznego) = string | number | symbol

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

-   ESLint - sprawdzanie jakości kodu
-   Prettier - CodeFormatter
-   Debugger for Chrome
    -   Wymaga opcji "sourceMap" na true

## Ogólne

-   Jest to nakładka na JS
    -   wprowadza silne typowanie do JS
-   kompiluje do natywnego JS'a
-   W przypadku braku jawnego typowania ts domyśla się typu po przypisanej inicacyjnej wartości
-   wszystkie typy w TS sa zapisane małymi literami np. string, number

### Wymuszenie ingorowania błedów kompilatora

-   @ts-ignore
    -   ignorowanie konretnej linii kodu
-   @ts-expect-error
    -   podobne do powyższego ale podczas kompilacji wyrzuca informacje jeśli w tym miejscu nie mamy błedu
-   @ts-nocheck
    -   ignorowanie całego pliku (dodajemy u góry pliku)

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

-   instalacja poprzez npm, instalujemy w trybie globalnym

```bash
npm install -g typescript
```

-   Tworzymy plik TS np. nazwa_pliku_do_kompilacji.ts

```js
let somets: string = "test";
```

-   Następnie używamy typescript poprzez polecenie tsc
    -   W parametrze podajemy plik TS do kompilacji

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

-   NoImplicitAny - blokuje używania parametrów które nie sa jasno określone. Nie akceptuje typu "any"
-   strictNullChecks - blokuje zmiennej które potencjalnie mogą być nullem (brak inicjacji). Na przykłąd pochodzi ze funkcji która MOŻE zwrócić null'a
-   strictFunctionTypes - sprawdzanie syngnatury funkcji
-   strictBindCallAplly - sprawdzanie czy przekazujemy wszystkie potrzebne parametry

## Typy TS

-   number
    -   1, 5.3, -10
-   boolean
    -   true, false
-   string
    -   'Hi', "Hi", `Hi`
-   object

    -   w przypadku braku typowania, TS ustawi domyślne typy po inicjujacej wartości kluczy
    -   domyślnie typujemy poprzez "object", natomiast to powoduje że TS nie ma informacji o typach pól, powoduje to potem problemy przy kompilacji

            ```js
            const person: object = { name: "test" };
            console.log(person.name); // bład kompilacji, to tylko pusty obiekt dla TS
            ```

    -   jeśli chcemy określić jak powinnien być zbudowany obiekt zapisujem to jak poniżej

            ```js
            const person: { name: string } = { name: "test" };
            console.log(person.name); // brak błedu kompilacji! TS wie czego się spodziewać
            ```

    -   w przypadku zagnieżdzania obiektu zapisujemy to jak poniżej

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

-   array
    -   może przechowywać dowolną kolelcje typów np. number, string itp.
    -   musimy określić typ danych w array np. string[] lub określić że typy moga być dowolne (mieszane) poprzez any[]
-   tuple
    -   Jest to array z określonymi typami elementów
    -   np. [number, string]
-   enum

    -   Typ dodany przez TS

        ```js
          enum Role { ADMIN, READ_ONLY, USER }
        ```

    -   TS pod spodem zamienia to na integer, ale zystkujemy możliwość czystego kodu
    -   ewentualnie możesz ustawić wartość enum

        ```js
          enum Role { ADMIN = 'ADMIN', READ_ONLY = 'READ_ONLY', USER = 'USER' }
        ```

-   any
    -   Dowolny typ, wylaczenie komplilatora TS
    -   nie jest zalecane używanie

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

-   customowy typ - opisuje typ danych
-   interfejs - opisuje obiekt

### Interfejs dla klasy

-   Interejsy nie są tłumaczone do vanilla js, to byt istniejący tylko w TS

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

-   znak ? dla parametrów
-   znak ! dla metod

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

-   Dekoratory tworzą się w kolejności od góry do dołu
    -   np. inicjacja
-   Dektoratory wykonują się w kolejności od dołu do góry
    -   już body funkcji dektoratora

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

-   atrybutów klas
-   metod
-   parametrów metod

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

-   klasy
-   metod
    -   tutaj możemy zwrócić inny obiekt property descriptor i zmienić w jaki sposób zachowuje się metoda.

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

### Materiały

-   JavaScript Modules (Overview): https://medium.com/computed-comparisons/commonjs-vs-amd-vs-requirejs-vs-es6-modules-2e814b114a0b
-   More on ES Modules: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

### Moduły

Moduły to sposób na podzielenie swojego kondu na wiele plików, tak aby potem to includować.

sposoby:

-   Namespaces and file bundling
    -   tylko w TS
    -   grupowanie po namespace
    -   importowanie po namespace
    -   per plik lub bundluje wszystkie pilki do jednego wspólnego (automatycznie)
-   ES6 imports/Exports - ES6 modules
    -   niezalezne od TS, vanilla JS
    -   dostępny w wielu przeglądarkach
        -   przeglądarki samodzielnie importują potrzebne pliki
    -   wspierane przez TS
    -   per plik ale wystarczy jeden import (script tag)
    -   potrzebny jest webpack aby uzyskać bundle (jeden plik) zamiast extra requestów po pliki

### Namespaces and file bundling w TS

Raczej nie zalecane, lepiej używać ES6 importów z webpackiem. To może być wartościowe dla mniejszych projektów w TS.

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

-   outFile -> np. /dist/bundle.js
    -   Uwaga! ten plik będziemy następnie ładować po stronie HTML (script tag)
-   module -> amd

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

-   module -> ES2015

oraz przy tagu script który ładuje aplikacje dodać type="module"

```html
<script type="module" src="/dist/app.js"></script>
```

Dużą zaletą takiego podejścia jest to że teraz każdy plik musi samodzielnie importować wymagane zależności. Mniej dziwnych bugów.

Dodatkowo możemy:

-   zgrupować importy z pliku do jakiegoś agregatora np.

```js
import * as MyPackage from "some-file.js";
new MyPackage.SomeExportedClass(); // używamy po kropce
```

-   Wykonać rename importu tylko w konteście tego pliku

```js
import { SomeExportedClass as RenamedExportedClass } from "some-file.js";
new RenamedExportedClass();
```

-   Wykonać default export aby dać znać który obiekt będzie domyślnie importowany

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

## TS i Webpack

dokumentacja webpack: https://webpack.js.org/

-   Webpack może nam pomóc wdrożyć importy ES6 dla starszych przeglądarek
-   Webpack pozwala nam spakować (bundle) pliki tak aby uniknąć ładowania wielu plików osobno
-   Okiestruje pliki zgodnie z konfiguracją
-   bundluje kod, mniej potrzebnych importów
-   optymalizuje kod, mniej kodu do pobrania
-   łatwo rozwijalna konfiguracja

### Instalacja webpacka

```
npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader
```

-   webpack - pakiet ktory potrzebujemy
-   webpack-cli - CLI do webpacka
-   webpack-dev-server - hot reloading dla devowego środowiska
-   ts-loader - ładowanie TS przez webpacka, jak konwertować TS do JS

### Konfiguracja TS w Webpack

-   target -> es6
    -   Tutaj Webpack będzie wiedział do jakiej wersji JS ma dążyć
-   module -> es2015
-   outDir -> ./dist or inny plik
-   rootDir - już nie potrzebny, webpack to przejmuje
-   sourceMap -> true
    -   to pomaga debugować kod TS

### Konfiguracja Webpack

#### Usuwamy wszystkie rozszerzenia .js z importów ES6

Webpack tego nie oczekuje, to tylko sładania dla przegladrek z ES6

#### Dodanie pliku konfiguracyjnego

Dodajemy plik webpack.config.js do projektu

Nastepnie dodajemy podstawową konfiguracje

```js
const path = require('path'); // corowy moduł, nie potrzeba instalacji

module.exports = {
  entry: './src/app.ts' // gdzie zaczyna się nasz projekt, główny plik
  output: {
    filename: 'bundle.js'
    path: path.resolve(__dirname, 'dist') // bezwzględna ścieżka do katalogu
  },
  devtool: 'inline-source-map', // pakuje mapy do bundle i daje nam lepsze debugowanie
  module: { // jak sobie radzić z konkretnymi plikami
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/ // omijamy node_modules
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'] // co razem pakujemy
  }
};
```

#### Kompilacja projektu poprzez Webpack

kompilujemy projekt poprzez polecenie

```
webpack
```

#### Dodajemy bundle.js do script w HTML'u

Pamiętamy o dodaniu linku script w HTML do bundle.js z Webpacka

### Dodanie webpack-dev-server

Po zainstalowaniu webpack-dev-server musimy poprawić naszą konfiguracje do wersji:

```js
const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/app.ts",
    devServer: {
        static: [
            {
                directory: path.join(__dirname),
            },
        ],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
};
```

zawiera nowe rzeczy potrzebne do działania webpack dev server:

-   mode -> development
-   publicPath -> /dist/

wystarczy że wystartujemy serwer poprzez polecenie

```js
webpack - dev - server;
```

### Uruchomienie wersji produkcyjnej

Dodajemy nowy plik z konfiguracją dla produkcji (nazwa może być inna):

```
webpack.config.prod.js
```

Doinstalowujemy specjalny pakiet do czyszczenia dysku w momencie przeładowania projektu

```
npm install --save-dev clean-webpack-plugin
```

aktualizujemy naszą konfiguracje:

```js
const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
    mode: "production", // wersja produkcyjna
    entry: "./src/app.ts",
    devServer: {
        static: [
            {
                directory: path.join(__dirname),
            },
        ],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        // publicPath: "/dist/", -> już nie potrzebne, chcemy mieć pliki na dysku a nie w pamieci
    },
    // devtool: 'inline-source-map', // wyrzucamy z produkcji, ale jakbyśmy zostawili to moglibyśmy debugować na prodzie
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
        // globalne pluginy
        new CleanPlugin.CleanWebpackPlugin(), // automatyczne czyszcze w momecnie rebuildu
    ],
};
```

Na sam koniec aktualizujemy komende do odpalenia webpacka z konfiguracją produkcyjną

```
webpack --config webpack.config.prod.js
```

## Zewnętrzne biblioteki i TS

### W jaki sposób używać JS-owej zew biblioteki w TS

Problemem jest to że vanilla js nie zadziała poprawnie w TS, będziemy mieć błedy ponieważ TS oczekuje kodu TS.

**Uwaga! Jest to do uruchomienia bo mimo wszystko pod spodem jest JS, ale będziemy mieć błedy walidacji. Jeśli wyłączymy przerywanie kompilacji to uruchomimy mimio wszystko nasz projekt. Natomiast możemy mieć potem problemy ze zbudowaniem produkcyjnej wersji.**

Rozwiązaniem jest poszukanie tzw. types dla biblioteki. np. dla lodash szukamy @types/lodash

```js
npm install --save-dev @types/lodash
```

takie bibliotki to zbiory tylko typów, mają nazwy np. uniq.d.ts gdzie d oznacza że to dekorator.

### Co w przypadku kiedy nie istnieją typy?

#### Przypadek globalnej zmiennej

Na przykład na stronie mamy zdefiniowaną zmienną globalna

```js
var globalna = "zmienna";
```

Aby zadziałało nam to w TS musimy zadeklarować jej istnienie, wraz z typem jakie oczekujemy. Jeżeli to coś zewnętrznego zawsze możemy użyć typu any.

```js
declare var globalna: string;
declare var jakasZewnetrznaZmienna: any;
```

#### class-transformer - automatyczna zamiana JSON (raw data) do klas

https://github.com/typestack/class-transformer

```js
npm install --save class-transfomer reflect-metadata
```

proste użycie

```js
import "reflect-metadata";
import { plainToClass } from "class-transformer";

const products = [
    { title: "xx", price: 29 },
    { title: "yy", price: 33 },
];

const convertedToClasses = plainToClass(NazwaKlasy, products); // super skrócik, konwertuje do klas
```

#### class-validator - walidacja poprzez dekoratory

https://github.com/typestack/class-validator

```js
npm install class-validator --save
```

proste użycie

```js
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

class Product {
    @IsNotEmpty()
    title: string;
    @IsNumber()
    @IsPositive()
    price: number;

    // i tak dalej...
}
```

i następnie walidujemy

```js
import { validate } from "class-validator";

const p = new Prodct(); // cos tutaj inicujemy
validate(p).then((errors) => {
    if (errors.length > 0) {
        console.log(errors);
    }
});
```

## React & TS

### Typowanie w przypadku useState

```js
import React, { useState } from "react";

const SomeComponent = () => {
    const [someParam, setSomeParam] = useState < string > ""; // typ generyczny, możemy zdefininiować czym to będzie!
};
```

## Node.js & TS

### Konfiguracja projektu

#### Inicjalizacja projektu

```
npm init
```

```
tsc --init
```

#### Ustawienia typescript

-   target -> es2018
-   moduleResolution -> node (nowa pozycja)
-   outDir -> ./dist
-   rootDir -> ./src

#### Piszemy kod!

Następnie dodaj folder src i zacznij pisać kod!

### Konfiguracja express.js

```
npm install --save express body-parser
```

nodemon - automatycznie restartuje node.js przy zmianie plików

```
npm install --save-dev nodemon
```
