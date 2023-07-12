# Testy na froncie

## Cele testownia i semantyka

-   poprawnie działanie aplikacji - czy można wdrażać?
-   zaufanie - wiemy że nie padnie na produkcji
    -   jeżeli wiemy że gdzieś są problemy, przykryjmy to miejsce testami
-   testy chronią przed regresją
-   stablilność aplikacji (np. przykłady brzegowe)
-   stabilny i przewidywalny rozwój aplikacji
-   żywa dokumentacja - dopóki uruchaiamy testy, zawsze muszą być aktualne
-   testowalność (zazwyczaj) zwiększa czytelność i zmniejsza coupling
    -   kod nie testowany staje się ciężki do testowania (mniej czytelny, brudniejszy, przekomplikowany)

### Testy jednostkowe

-   testy: funkcje, klasy, przetarzanie danych, a także komponenty wizualne (jednostka, mały wycinek systemu)
-   działają na bardzo małym wycinku danych
-   niskopoziomowe
-   wartość: mówią że nie działa np. funkcja ale nie powiedzą jakie niesie to konsekwencje
-   szybkie!

### Testy integracyjne

-   integrują kilka elementów lub warstw
-   wartość: jeżeli zmienimy implementacje ale wynik nadal jest poprawny to nie musimy przerabiać testów integracyjnych. W przypadku jednostkowych byłoby to konieczne.
-   wartość: dzadzą nam znać że jakiś wycinek systemu nie działa, wiemy jakie niesie to konsekwencje
-   raczej szybkie, ale wolniejsze od jednostkowych.

### Testy jednostkowe/integracyjne komponentów UI

-   testy jednostowe testują atomowe zachowania
    -   kilknięcie buttona powoduje wywołane fn
    -   wstrzyknięcie props powoduje wyświetlenie tekstu
-   testy integracyjne - testowanie kilku/kilkudziesięciu komponentów razem - sprawdzany spójną całość

### Testy End-to-End (UI)

-   działają na całym systemie
-   wysokopoziomowe
-   bardzo wolne (nawet minuty np. 15 min)
-   wartość: dzadzą nam znać jeśli usługa biznesowa nie działa, ale nie powiedza dlaczego

### Piramida testów

https://martinfowler.com/bliki/TestPyramid.html

Dla frontu mamy pojęcie "Testing Trophy"

https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests

### Inne rodzaje testów

-   Somke-testy
    -   włączam, nic więcej, sprawdzam czy żyje
    -   tanie w utrzymaniu ale nie chronią funkcjonalności biznesowych
-   Testy regresyjne
    -   wszystkie testy są poniekąd regresyjne
    -   badają czy po zmianie kodu wystąpiła regresja
-   Testy akceptacyjne
    -   wszystkie testy są poniekąd akceptacyjne
    -   przechodzące testy akceptacyjne dają zielone światło do wdrożenia

## Watościowe testy

### FIRST

-   F - Fast
    -   powinny szybko działać, inaczej będą pomijane
-   I - Independent
    -   niezależne, przewidywalne, mogą działać samodzielnie
-   R - Repeatable
    -   powtarzalne, na każdym środowisku
-   S - Self-Validating
    -   jednoznaczny wynik, pass or fail
-   T - Timely
    -   Powinniśmy przemyśleć testy na samym początku, jak już zaimplementujemy to napisanie testów może być trudne, bo kod nie jest łatwy do testowania

### Dodatkowe wartościowe cechy

-   czytelne - patrze na test i wiem co się tam dzieje
-   mają precyzyjne testy - wiem które odpalić, wiem że się nachodzą testowanym obszarem
-   powinny współdzielić między sobą jak najmniej
-   są proste i nie zawierają logiki
-   sprawdzają tylko jedna rzecz, jak wybuchnie to wiem co jest nie tak, oraz sprawdzają ją tylko raz
    -   jak będziemy kopiować testowanie funkcjonalności do wielu testów to położymy wiele testów z jednego powodu, to utrudni zrozumienie problemu
-   nie testują metod prywatnych
-   badają zachowanie a nie stan
    -   dla usera istotne jest zachowanie UI a nie stan komponentu
-   zachowują precyzyjne asercje
    -   precyzyjne wskazanie gdzie jest bład
-   pokrywają znalezione defekty
-   nie są zakomentowane na wieki
-   sprawdzają happy path i również sad path
    -   happy path - aplikacja poprawnie działająca, to jest spodziewane
    -   sad path - coś gdzieś jest nie halo, to też powinnien być oczekiwany scenariusz, wychwytywanie rozmaitych przypadków
-   tanie w utrzymaniu
    -   testy mogą być zbyt drogie do utrzymania bo
        -   testują zbytnie szczegóły
        -   testują stan zamiast zachowania

### Struktura testu

Aktualnie używa się dwóch popularnych sposóbow pisania testów. Używamy komentarzy do pokazania struktury

-   Arrange, Act, Assert

```js
// arrange - przygotowanie danych wejściowych
// act - interakcja, czynność, wywołanie
// assert - weryfikujemy rezultat, czy jest poprawny
```

-   Given, When, Then

```js
// given - przygotowanie danych wejściowych
// when - interakcja, czynność, wywołanie
// then - weryfikujemy rezultat, czy jest poprawny
```

### Testy False-Positive, Flase-Negative

Kategorie problematycznych testów na które trzeba uważać, np. zafixowana data, która kiedyś wybuchnie

https://khorikov.org/posts/2020-01-29-false-positives-negatives/

-   True-Pass - przechodzi, powinnien
-   True-Fail - nie przychodzi, nie powinnien
-   **Flase-Pass - przechodzi, nie powinnien**
-   **False-Fail - nie przechodzi, a powinnien**

### Watość bojowa - zero

Jeśli nie wiesz jaki test chcesz napisać to lepiej tego nie robić. Wykonać konsultacje czy coś.

Dodatkowo jak mamy plany na przyszłość to w jest możemy to zapisać:

```js
it.todo("Tutaj moja obietnica do spełnienia");
```

-   **Dobrym pomysłem jest najpierw napisanie komentarzy z przypadkami testowymi, tak aby potem uzupełnić implementaje. Jak już wiemy co chcemy.**
-   Czy twój test jest czytelny? Intencja? Wczuj się w role programisty który po raz pierwszy czyta Twój test
-   NIE TESTUJEMY PRYWATNYCH METOD

### White-Box testing vs Black-box testing

-   White-box testing - testowanie znając implementacje, testujemy do tej implementacji
-   Black-box testing - nie znamy implementacji, nie wiem co jest w skrzynce, korzystam z publicznego API
    -   To jest lepsze, publiczne API nie powinno się zmieniać często

## Asercje

Asercje to fundametalny elment testów. Każdy test powinnien posiadać jakieś asercje.

### Filtrowanie w Jest

Domyślnie jest odpali wszystkie test jakie znajdzie w projekcie. Natomiast możemy przefiltrować testy:

-   po nazwie (pattern)
-   po nazwie pliku (pattern)

### Co to Asercja?

Asercja to warunkowe rzucenie wyjątku

### Asercje dokumentacja i dodatkowe źródło (3-th party)

https://jestjs.io/docs/en/expect
https://github.com/testing-library/jest-dom

Dodatkowe

https://www.chaijs.com/
https://sinonjs.org/releases/latest/assertions - przydatne asercje z mockami. Natomiast wymaga runnera testów

### Najgorsza asercja na świecie

Tak jak poniżej rzutujemy do boolean, aby potem przyrównać do boola. Natomiast to powoduje że komunikat błedu jest mniej precyzyjny.

"jest źle ale nie wiadomo o co chodzi"

```js
expect(condition).toBe(true);
expect(condition).toBeTruthy();
```

Przykład na assercji długości array'a

```js
const items = [1, 2, 3, 4, 5];
const result = items.map((x) => x * 2);

// słabo, nie wiadomo o co chodzi
expect(result.length === items.length + 1).toBe(true);
// już lepiej, mam bardziej precyzyjnie
expect(result.length).toBe(items.length + 1);
// super, komunikat jest precyzyjny
expect(result).toHaveLength(items.length + 1);
```

**Finalnie to co ułatwia pisanie czytelnych asercji to używanie odpowiednich asercji do problemu. To wymaga znajomości dokumentacji, tak aby wiedzieć że takowe istnieją**

np. toBeChecked() itp.

**KORZYSTAJMY Z PRECYZYJNYCH ASERCJI**

## Referential equality

W przypadku porównywania obiektów należy pamiętać że to nie jest prymitywna wartość.

.toEqual -> wartość
.toBe -> tożsamość, czyli referncja

## Mockowanie

### Tipy

#### Publiczne API do fakownia REST API

Mamy dostępne publiczne API do testowania uderzeń do REST API: https://jsonplaceholder.typicode.com

#### Co to hoistowanie?

To trik który polega na tym że kod mocka jest przenoszony na samą góre bundle, co za tym idzie jako pierwszy wpisuje się w cache require i wypycha realny obiekt :o

#### spy mock - logowanie jak to było wywoływanie

Spy mock daje nam możliwość podglądu jak był wywołany śledzony kod np.

```js
console.log(spy.mock.calls); // wywołania
console.log(spy.mock.results); // wyniki wywołań
// itp.
```

### Po co?

Mockowanie to sposób na wstrzyknięcie "fakowych" zależności do testowanego komponentu.

Celem jest to aby odizolować testowany komponent, tak aby zależności nie miały wpływu na wynik testu.

Dodatkowo to pozwala udawać produkcyjne zależności, których nie możemy przetestować w devowych warunkach.

### Co możemy mockowac?

-   metody
-   moduły
-   klasy
-   hooki
-   komponenty
-   http
-   itp.

### Mockowanie metod obiektu - jest.spyOn

#### Bez mockowania implementacji

jest.spyOn - bez drugiego parametru nie mockuje implementecji tylko opakowuje w swojego "szpiega" który śledzi np. ilość wywołań.

```js
it("should make an actual call", async () => {
    // arrange
    const repo = new AlbumRepository();
    const spy = jest.spyOn(repo, "sync");
    // act
    const album = { userId: 1, id: 1, title: "księga tajemnicza. prolog" };
    repo.add(album);
    // assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
    spy.mockRestore();
});
```

#### Z mockowaniem implementacji

Po podaniu drugiego argumentu wywołuje go, zamiast oryginalnej implementacji

```js
it("should mock the call", async () => {
    // arrange
    const repo = new AlbumRepository();
    const spy = jest.spyOn(repo, "sync").mockImplementation(async () => {});
    // act
    const album = { userId: 1, id: 1, title: "księga tajemnicza. prolog" };
    repo.add(album);
    // assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
    spy.mockRestore();
});
```

### Mockowanie modułów

#### Mockowanie modułów - jest.mock

W przypadku elementów które są "implicite" musimy wykorzytać mockowanie całego modułu (pliku)

```js
// dzięki babel-plugin-jest-hoist mockowanie zawsze jest pierwsze w kolejności. To istotne ponieważ  musimy w pierwszej kolejności uderzyć require.cache aby to nakarmić fakowymi modułami
jest.mock("./AlbumDAO"); // mockowanie całego modułu (pliku)
import * as AlbumDAO from "./AlbumDAO";

test("module should have all functions mocked", () => {
    expect(AlbumDAO.baseURL).toMatchInlineSnapshot(
        `"https://jsonplaceholder.typicode.com"`
    );
    expect(AlbumDAO.fetchAlbums).toBeInstanceOf(Function); // to jest po prostu jest.fn() (pusta funkcja). Jest automatycznie to podstawia
    expect(AlbumDAO.saveAlbums).toBeInstanceOf(Function); // jest.fn()
});
```

#### Mockowanie modułów - factory function

Jeżeli jako drugi parametr do jest.mock przekażamy funkcje zwacającą json'a to możemy zamockować co zwróci dany moduł.

**Co istotne jeżeli coś pominiemy to tego nie będzie finalnie w mocku. Będzie efekt braku funkcji itp**

```js
jest.mock("./AlbumDAO", () => ({
    // podmiana CAŁEJ zwartości modułu, to nie jest PATCH
    saveAlbums: async () => {},
}));
import * as AlbumDAO from "./AlbumDAO";

test("module should have only the specified elements mocked", () => {
    expect(AlbumDAO.baseURL).toBeUndefined(); // ❗️ nie ma
    expect(AlbumDAO.fetchAlbums).toBeUndefined(); // ❗️ nie ma
    expect(AlbumDAO.saveAlbums).toBeInstanceOf(Function);
});
```

#### Mockowanie modułów - require actual

Mozemy w teście pobrać orygnialną metodę używająć jest.requireActual, mimo że moduł jest zamockowany

```js
jest.mock("./AlbumDAO", () => ({
    saveAlbums: async () => {},
}));
import * as AlbumDAO from "./AlbumDAO";
const { fetchAlbums } = jest.requireActual("./AlbumDAO"); // pobranie oryginalnej metody, ktora nie jest mockiem!

test(`module should have only the specified elements mocked
          and original items imported via requireActual are available`, () => {
    expect(AlbumDAO.baseURL).toBeUndefined(); // ❗️ nie ma
    expect(fetchAlbums).toBeInstanceOf(Function); // ❗️ jest, prawdziwe
    expect(AlbumDAO.saveAlbums).toBeInstanceOf(Function);
});
```

### Mockowanie klas

#### Mockowanie całej klasy

Proste, przy tworzeniu klasy dostaniemy mocka (z funkcji) zamiast realnej klasy

```js
import { Stuff } from "./stuff";

jest.mock("./stuff", () => {
  return {
    Stuff: class {
      constructor(
        private mockData: number[]
      ){}

      calculate(){
        return this.mockData.reduce((product, n) => product * n)
      }
    }
  }
});
```

#### Mockowanie konstruktora klasy

Bardziej złożone możemy podmienić konstruktor klasy i zwórcić obiekt który będzie reprezentował klase

Przydatne kiedy chcemy zmienić coś per konkretny test

```js
import { Stuff } from "./stuff";

jest.mock("./stuff");
test("module should a class/constructor mocked", () => {
  (Stuff as jest.Mock).mockImplementation((mockData: number[]) => ({
    calculate: () => mockData.reduce((product, n) => product * n),
  }));

  const mocked = new Stuff([1,2,3,4]);
  expect(mocked.calculate()).toEqual(24);
});
```

### Mockowanie hooków

Nie ma sensu mockowania większości wbudowanych hooków, natomiast to co może się przydać to mockowanie useContext

```js
import React from "react";
import { render } from "@testing-library/react";

import { useStuff } from "./stuff-context";
jest.mock("./stuff-context", () => ({
    useStuff: () => ({ value: "honk honk" }),
}));

export const Stuff: React.FC = () => {
    const { value } = useStuff();
    return <>the value is: {value}</>;
};

test("component should access mocked context via hook", () => {
    const { container } = render(<Stuff />);
    expect(container).toMatchInlineSnapshot(`
    <div>
      the value is: 
      honk honk
    </div>
  `);
});
```

### Mockowanie komponentów

#### Dlaczego możemy potrzebować mockować komponenty

-   js DOM nie wspiera funkcjonalności (np. CRA v3 / jsdom 14)
    -   Tutaj warto sprawdzić czy jest używa najnowszej wersji jsdom
-   Koszt obsługi DOM za wysoki (szczególnie 3rd party pakiety)
    -   np. WYSWIG

#### Minsy mockowania komponentów

-   zamiast testować faktyczny komponent, testujemy mocka
    -   mock nie jest tym co będzie na prodzie
-   łatwo o rozjazd pomiędzy realnym komponentem a jego mockiem (np. propsy)
    -   jeżeli zmienimy propsy w oryginalnym komponenencie to musimy tego pilnować w mocku
-   ostatnia deska ratunku

#### Przykład

```js
import React from "react";

jest.mock("./Editor", () => {
    const _React: typeof React = require("react"); // musimy zaimportowac react w środku mocka!
    const Editor = ({ initialValue, onChange }: any) => {
        const [value, setValue] = _React.useState(initialValue);

        return (
            <textarea
                data-testid={`texteditor`}
                value={value}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setValue(newValue);
                    onChange(newValue);
                }}
            />
        );
    };

    return { Editor };
});
```

```js
import "./jest-mock-component-editor";
import { fireEvent, render } from "@testing-library/react";
import { Editor } from "./Editor";

interface ArticleProps {
    onChange: (value: string) => void;
}

const Article: React.FC<ArticleProps> = (props) => {
    const { onChange } = props;
    return (
        <>
            <h2>article</h2>
            <Editor onChange={onChange} />
        </>
    );
};

test("component", () => {
    const spy = jest.fn();
    const { getByTestId } = render(<Article onChange={spy} />);

    const editor = getByTestId("texteditor");
    fireEvent.change(editor, { target: { value: "some text" } });

    expect(spy).toHaveBeenCalled();
});
```

### Mockowanie HTTP - jest.mock

**Dobrą praktyką jest aby komponent nie wysyłał bezpośrednio żądań HTTP**

#### Mockowanie stackowe, jak ma się zachować w kolejnych wywołaniach

```js
jest.mock("./AlbumDAO", () => ({
  // fetchAlbums: () => [] // fake
  fetchAlbums: jest.fn() // mock
}));

import { fetchAlbums } from './AlbumDAO'

test("mocked function should return values as specified in sequence (return)", async () => {
  const spy = (fetchAlbums as jest.Mock)
    .mockReturnValue(Promise.resolve([])) // to wywołanie będzie 4 i każdym kolejnym jak skończa się poniższe :o
    .mockReturnValueOnce(Promise.resolve([{ id: 1 }])) // pierwsze wywołanie
    .mockReturnValueOnce(Promise.resolve([{ id: 2 }]))
    .mockReturnValueOnce(Promise.resolve([{ id: 3 }]))
  const result1 = await fetchAlbums()
  expect(result1).toEqual([{ id: 1 }])
  const result2 = await fetchAlbums()
  expect(result2).toEqual([{ id: 2 }])
  const result3 = await fetchAlbums()
  expect(result3).toEqual([{ id: 3 }])
  const result4 = await fetchAlbums()
  expect(result4).toEqual([])
});

test("mocked function should return values as specified in sequence (resolved)", async () => {
  (fetchAlbums as jest.Mock)
    .mockResolvedValue([]) // tak jak powyżej ale nie musimy już explicite przekazywać że to będzie Promise
    .mockResolvedValueOnce([{ id: 1 }])

  const result1 = await fetchAlbums()
  expect(result1).toEqual([{ id: 1 }])
  const result2 = await fetchAlbums()
  expect(result2).toEqual([])
});

```

#### Mockowanie fetch

zewnętrzne bilbioteki

-   fetch
    -   fetch-mock
    -   isomorhic-fetch
-   axjos
    -   axios-mock-adapter

Plusem tych bibliotek jest to że są bardzo rozbudowane. Zawierają też asercje.

Minusem jest to że mocno przywiązujemy się do jakieś biblioteki. Dodatkowo wymaga to nauki specjalnie pod kątem tych bibliotek.

```js
// in setupTests.js
require("isomorphic-fetch");
jest.mock("node-fetch", () => require("fetch-mock").sandbox());
const fetchMock = require("fetch-mock");

import { fetchAlbums, baseURL } from "./AlbumDAO";

describe("HTTP and fetch-mock", () => {
    it("should make an actual call", async () => {
        // act
        const res = await fetchAlbums();
        // assert
        expect(fetchMock.calls(/albums/)).toHaveLength(0);
    });

    it("should mock the call", async () => {
        // arrange
        const item = { userId: 1, id: 1, title: "księga tajemnicza. prolog" };
        fetchMock.mock(`${baseURL}/albums`, [item]);
        // act
        const res = await fetchAlbums();
        // assert
        expect(fetchMock.calls(/albums/)).toHaveLength(1);
        fetchMock.restore();
    });
});
```

#### Mockowanie z MSW

MSW - mock service worker. Pozwala mockować ruch na HTTP, nie zależnie jakiej biblioteki używamy.

**Jest to zalecane! Mockujemy na poziomie sieciowym, co jest świetne! Pozwala ominąć problem mockowania jakiś tam metod**

MWS celowo nie implementuje asercji, uznając je za detel implementacyjny

```js
import { rest } from "msw";
import { setupServer } from "msw/node";
import { baseURL, fetchAlbums, saveAlbums } from "./AlbumDAO";

const handlers = [
    rest.get(`${baseURL}/albums`, async (req, res, ctx) => {
        return res(ctx.delay(1000), ctx.json([{ id: 1 }]));
    }),
    rest.post(`${baseURL}/albums`, async (req, res, ctx) => {
        throw new SyntaxError("Unexpected token");
    }),
];
const server = setupServer(...handlers);

describe("AlbumDAO", () => {
    beforeAll(() =>
        server.listen({
            onUnhandledRequest: "error", // określa co się stanie jeśli poleci request który nie jest określony w naszym handlers. error - walnie błedem, warn - ostrzeżenie w konsoli, bypass - silent mode, żadnych informacji
            // zalecane jest warn - tak aby wiedzieć że poleciał request
        })
    );
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test("should mock the call", async () => {
        const response = await fetchAlbums();
        expect(response).toEqual([{ id: 1 }]);
    });

    test("should mock a failure", async () => {
        jest.spyOn(console, "error").mockImplementation(() => {});
        await expect(saveAlbums([])).rejects.toThrow("Failed to fetch");
    });
});
```

## Dane Testowe

Dane testowe to jest to czym nakarmimy testowane funkcje czy inne elementy.

### Mockowanie vs Type-Safety

W przypadku mockownia często chcemy zdefinować różne dane względem testów, w przypadkach kiedy mamy duży obiekty potrzebujemy jakiegoś wycnika itp.

Natomiast TS będzie domyślnie krzyczał że potrzebuje całego obiektu.

Jakie mamy sposoby na to?

-   Annotation - to nie wiele daje, TS będzie wymuszał nadal uzupełnienie wszystkich pól

```js
describe("getTotalSalary", () => {
    it("should calculate sum of employees salaries (type annotation)", () => {
        const mockEmployees: Employee[] = [
            {
                salary: 100,
            },
            {
                salary: 200,
            },
        ];

        const result = getTotalSalary(mockEmployees);
        expect(result).toEqual(300);
    });
});
```

-   Type assertion - to już lepiej, ale mamy ryzyko że będą błedy w runtime. Ryzykujemy debugowanie po wiele godzin

```js
  it('should calculate sum of employees salaries (type assertion)', () => {
    const mockEmployees = [{
      salary: 100
    }, {
      salary: 200
    }] as Employee[]

    const result = getTotalSalary(mockEmployees);
    // const result = getTotalSalary(mockEmployees.filter(e => e.nationality == 'PL'));
    expect(result).toEqual(300);
  });
```

-   ES6 proxy - sposób na to aby dostać bład jakich pól nam brakuje w wycinkowym obiekcie. Lepszy komunikat błędu!

```js
  const asProxy = <TAsserted extends TActual, TActual extends object = object>(t: TActual) => {
    const proxy = new Proxy(t, {
      get: function(obj, prop) {
        if (!(prop in obj)) {
          throw new Error(`Trying to access non-existent property "${String(prop)}" on object ${JSON.stringify(obj)}`)
        }

        // IF powyżej nie gwarantuje jako type guard, że `prop` istnieje w `obj`, stąd type assertion
        return (obj as any)[prop];
        // return obj[prop as keyof TActual];
      }
    })
    return proxy as TAsserted
  }

  // 3. PROXY

  // istnieją wymagane pola
  it('should calculate sum of employees salaries (ES6 proxy)', () => {
    const mockEmployees = [{
      salary: 100
    }, {
      salary: 200
    }].map(obj => asProxy<Employee>(obj))

    const result = getTotalSalary(mockEmployees);
    expect(result).toEqual(300);
  });
```

-   Zewnętrzne biblioteki

### Wszystko zależy jak chcemy do tego podejść

-   W przypadku centralizownia typów podejście numer 1 - pełne typy
-   W przypadku rozpraszania typów (per test) podejście numer 2

### Zasada Don't cate - don't specify

Zasada która mówi o tym aby nie specyfikować danych wejściowych których nie interesuje test.

#### Użycie buildera i prototypu aby zbudować potrzebny obiekt na potrzeby testu

```js
import { Log } from "./data-logs"
import { countBy } from "./data-utils"

// wybrakowane obiekty które pełnią role fake'ów
const partialMockLogs = [{
  level: "ERROR"
}, {
  level: "DEBUG"
}] as Log[]

test('should count occurrences of partial mock log levels', () => {
  expect(countBy(partialMockLogs, log => log.level)).toEqual({"DEBUG": 1, "ERROR": 1})
})

// prototyp - zawiera przykładową strukturę obiektu
// opakowujemy w funkcje bo chcemy zawsze tworzyć jednorazowo obiekt
const sampleLog = (): Log => ({
  "id": "61898d11-cf3f-4b87-a042-b1a774d98d18",
  "date": "2020-12-13T06:16:50.000Z",
  "level": "DEBUG",
  "account": "f80e65b7-6250-40ae-8a16-7c738aa70fd3",
  "content": "Nihil id reiciendis officiis qui ut dolor incidunt consequatur."
})

// zawsze zwraca nowy obiekt -> parametr to wywołanie funkcji
const logBuilder = (object = sampleLog()) => {
  return {
    valueOf(){
      return object
    },
    withLevel(level: Log['level']){
      return logBuilder({ ...object, level })
    },
    withAccount(account: Log['account']){
      return logBuilder({ ...object, account })
    },
  }
}

const fullMockLogs = [
  // budowanie potrzebnych obiektów
  logBuilder().withLevel("ERROR"),
  logBuilder().withLevel("DEBUG"),
  logBuilder().withLevel("ERROR").withAccount('123'),
].map(builder => builder.valueOf())

test('should count occurrences of full mock log levels', () => {
  expect(countBy(fullMockLogs, log => log.level)).toEqual({"DEBUG": 1, "ERROR": 2})
})
```

## Rodzaje testów

### Testy asynchroniczne

```js
// test zwracajacy Promise
test.skip("should fail because promise is rejected", () => {
    return Promise.reject("kaboom! W-1");
});

// test rozpakowujacy Promise (await), wynikiem jest to co jest rozpakowane
// Uwaga! reject oznacza rzucenie błedem w przypadku rozpakowywania
test.skip("should fail because awaited promise is rejected", async () => {
    await Promise.reject("kaboom! X-1");
});

// parametr done umożliwa wywołanie metody w momencie jak test będzie zakończony
test.skip("should hang because done callback doesn't get invoked", (done) => {
    Promise.reject("kaboom! Y-1");
});

// przypadek kiedy Promise nie wypływa na wynik testu! Na to trzeba uważać bo mamy FALSE PASS
test.skip("a FALSE PASS (but throws in console) - promise is not awaited", () => {
    Promise.reject("kaboom! Z-1");
});
```

#### Przykład radzenia sobie z timerami

Użycie jest aby zasymulować upływ czasu

```js
const sleep = (ms: number) => {
    return new Promise((res, rej) => {
        setTimeout(res, ms);
    });
};

// sposób aby oszukać JS ale jednocześnie symulować upływanie czasu bez realnego czekania na wykonanie kodu
test("promise should resolve after time passed", async () => {
    jest.useFakeTimers();

    const delay1 = sleep(1000);
    jest.runAllTimers(); // istotne, to symuluje upływ czasu
    await delay1; // istotne! wykonujemy dopiero po wywołaniu poprzedniej linijki, razem z await

    // analogicznie, mimo 0, czas wykonania jest dokładnie taki sam
    const delay2 = sleep(0); // nawet dla 0ms możliwy deadlock
    jest.runAllTimers();
    await delay2;
});
```

Sposób na ukryte Promise pod spodem kodu, nie mamy do nich referencji

```js
// trik który powoduje że wszystkie promise które są gotowe, spływają
// jest to potrzebne kiedy nie mamy referencji to Promise, to się dzieje gdzieś pod spodem
const scheduler =
    typeof setImmediate === "function" ? setImmediate : setTimeout;
export function flushPromises() {
    return new Promise((res) => scheduler(res, 0));
}

const getJohn = () => {
    let john = {
        age: 39,
        name: "John Lennon",
    };
    Promise.resolve().then(() => john.age++);
    return john;
};

test("promise should resolve after time passed", async () => {
    // the problem: we've got nothing to await 😱
    const john = getJohn();
    await flushPromises(); // to powoduje że ukryte Promise zakończą się pod spodem
    expect(john.age).toEqual(40); // dzięki temu mutacja wykona się prawidłowo i mamy 40
});
```

### Data-driven tests: native JS

W przypadku kiedy mamy testy które są do siebie podobne ale różnia się inputem, to jest dobre miejsce na data-driven tests

W przpypadku kiedy chcemy wykonać kilka testów z różnym inputem możemy to zamknąć w petli:

```js
// jeśli chcemy coś dodać/wyrzucić robimy to poniżej
const testcases: TestCase[] = [
    { count: 2, salaryFrom: 100, salaryTo: 500 }
    ...
];
for (const (count, salaryFrom, salaryTo) of testcases) {
    // istotne aby parametryzować nazwe testu, to pomaga w późniejszym zrozumieniu który to zestaw danych
    it(`some test with ${count}`, (count, salaryFrom, salaryTo) => {
        ...
    })
}
```

Druga możliwa składania to it.each

```js
it.each([
    [2, 100, 500] // duży minus, wymusza na nas array!
    ...
])('something %s %s %s', (count, salaryFrom, salaryTo) => {
        ...
    }) // mamy tutaj składnie %d dla kolejnych argumentów
```

### Snapshot testy - komponenty

Snapshoty są potężne oraz upierdliwe.

Wychwytuja każda zmiane w generowanym kodzie komponentu. To jest plus i minus. Jak coś się często zmienia to powoduje wiele problemów z utrzymaniem testów.

problemy:

-   potencjalne bardzo częste zmiany i częste false-fail
-   ryzyko nawyku aktualizacji snapshotu bez analizy

    -   iluzja pokrycia testami (jest ich dużo ale kontrolujemy ich jakości)

-   toMatchInlineSnapshot -> porównuje z podanym stringiem
-   toMatchSnapshot -> porównuje z zapisanym snapshotem (w pliku). Jeśli nie ma pliku to go stworzy.

przykład snapshota

```js
import { render } from "@testing-library/react";
import { Editor } from "./Editor";

test("editor component snapshot", () => {
    const { container } = render(<Editor onChange={jest.fn()} />);
    expect(container).toMatchInlineSnapshot(`
    <div>
      <div>
        <textarea
          style="display: none;"
        />
        <div
          class="editor-toolbar"
        >
          <a
            class="fa fa-bold"
            tabindex="-1"
            title="Bold (Ctrl-B)"
          />
          <a
            class="fa fa-italic"
            tabindex="-1"
            title="Italic (Ctrl-I)"
          />
          <a
            class="fa fa-header"
            tabindex="-1"
            title="Heading (Ctrl-H)"
          />
          <i
            class="separator"
          >
            |
          </i>
          <a
            class="fa fa-quote-left"
            tabindex="-1"
            title="Quote (Ctrl-')"
          />
          <a
            class="fa fa-list-ul"
            tabindex="-1"
            title="Generic List (Ctrl-L)"
          />
          <a
            class="fa fa-list-ol"
            tabindex="-1"
            title="Numbered List (Ctrl-Alt-L)"
          />
          <i
            class="separator"
          >
            |
          </i>
          <a
            class="fa fa-link"
            tabindex="-1"
            title="Create Link (Ctrl-K)"
          />
          <a
            class="fa fa-picture-o"
            tabindex="-1"
            title="Insert Image (Ctrl-Alt-I)"
          />
          <i
            class="separator"
          >
            |
          </i>
          <a
            class="fa fa-eye no-disable"
            tabindex="-1"
            title="Toggle Preview (Ctrl-P)"
          />
          <a
            class="fa fa-columns no-disable no-mobile"
            tabindex="-1"
            title="Toggle Side by Side (F9)"
          />
          <a
            class="fa fa-arrows-alt no-disable no-mobile"
            tabindex="-1"
            title="Toggle Fullscreen (F11)"
          />
          <i
            class="separator"
          >
            |
          </i>
          <a
            class="fa fa-question-circle"
            href="https://simplemde.com/markdown-guide"
            tabindex="-1"
            target="_blank"
            title="Markdown Guide"
          />
        </div>
        <div
          class="CodeMirror cm-s-paper CodeMirror-wrap"
          translate="no"
        >
          <div
            style="overflow: hidden; position: relative; width: 3px; height: 0px;"
          >
            <textarea
              autocapitalize="off"
              autocorrect="off"
              spellcheck="false"
              style="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; min-height: 1em; outline: none;"
              tabindex="0"
            />
          </div>
          <div
            class="CodeMirror-vscrollbar"
            cm-not-content="true"
            tabindex="-1"
          >
            <div
              style="min-width: 1px;"
            />
          </div>
          <div
            class="CodeMirror-hscrollbar"
            cm-not-content="true"
            tabindex="-1"
          >
            <div
              style="height: 100%; min-height: 1px;"
            />
          </div>
          <div
            class="CodeMirror-scrollbar-filler"
            cm-not-content="true"
          />
          <div
            class="CodeMirror-gutter-filler"
            cm-not-content="true"
          />
          <div
            class="CodeMirror-scroll"
            tabindex="-1"
          >
            <div
              class="CodeMirror-sizer"
              style="margin-left: 0px;"
            >
              <div
                style="position: relative;"
              >
                <div
                  class="CodeMirror-lines"
                  role="presentation"
                >
                  <div
                    role="presentation"
                    style="position: relative; outline: none;"
                  >
                    <div
                      class="CodeMirror-measure"
                    >
                      <pre
                        class="CodeMirror-line-like"
                      >
                        <span>
                          xxxxxxxxxx
                        </span>
                      </pre>
                    </div>
                    <div
                      class="CodeMirror-measure"
                    />
                    <div
                      style="position: relative; z-index: 1;"
                    />
                    <div
                      class="CodeMirror-cursors"
                    />
                    <div
                      class="CodeMirror-code"
                      role="presentation"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              style="position: absolute; height: 50px; width: 1px;"
            />
            <div
              class="CodeMirror-gutters"
              style="display: none;"
            />
          </div>
        </div>
        <div
          class="editor-preview-side"
        />
        <div
          class="editor-statusbar"
        >
          <span
            class="autosave"
          />
          <span
            class="lines"
          >
            1
          </span>
          <span
            class="words"
          >
            0
          </span>
          <span
            class="cursor"
          >
            0:0
          </span>
        </div>
      </div>
    </div>
  `);
});
```

### Snapshot testy - stabilny refactor

Przypadek kiedy możemy wykorzystać snapshoty to w momencie większego refactoringu komponentów.

-   dodajemy nowe testy zawierające snapshoty komponentów w róznych stanach
-   commit, branch
-   rozpoczynamy refactor, nie zmieniamy snapshotów
-   analizujemy różnicę na snapshotach tak długo, aż uznamy, że zmiana jest stabilna
-   usuwamy snapshot testy, merge

### Snapshot testy - JSON-y

Snapshot testy mogą być bardzo przydatne do snapowania wyników komponentów logicznych w postaci JSON-ów (porównywanie wyniku)

Ma to ogromną korzyść w zrozumieniu co faktycznie się zmieniło. Snapshot nam wskazuje linijki zmian i różnice contentu

```js
import { LogStorageAssertObject } from "./assert-object";
import { logs } from "./data-logs";
import { countBy } from "./data-utils";

describe("countBy", () => {
    it("should count occurrences of log levels", () => {
        const result = countBy(logs, (log) => log.level);
        // zapisujemy oczekiwany rezultat
        expect(result).toMatchInlineSnapshot(`
      Object {
        "DEBUG": 263,
        "ERROR": 229,
        "INFO": 246,
        "WARN": 267,
      }
    `);
    });

    it("should count occurrences of accounts", () => {
        const result = countBy(logs, (log) => log.account);
        expect(result).toMatchInlineSnapshot(`
      Object {
        "3b392d64-8ffd-41e0-9873-8a49df028140": 335,
        "7deed88b-5a14-4836-8145-6cd273a66948": 335,
        "f80e65b7-6250-40ae-8a16-7c738aa70fd3": 335,
      }
    `);
    });
});
```

### Snapshot testy - podsumowanie

Zalecany gdy:

-   unit testy
    -   badanie regresji w przetwarzaniu danych (array, object...)
    -   badanie regresji reducerów itp.
-   integracyjne testy
    -   badanie regresji na integracji komponentów z serwisami(np. logowanie, M9)

Wątpliwości gdy:

-   badanie regresji markupu komponentów

### Wyciek szczegółów niskopoziomowych - czytelność testów

Problemem jest przemieszanie intencji testów wraz ze szczegółami implementacyjnymi

#### Assert Objecy Pattern - intencje

Wzorzec który polega na ukryciu szczegółów implemetacyjnych, jednocześnie udostępnia API które

Przykład:

```js
// przed
test("application should store certain logs (native)", () => {
    expect(logs).toHaveLength(1005);

    const debugLogs = logs.filter((log) => log.level === "DEBUG");
    expect(debugLogs).toHaveLength(263);

    const debugOfSpecificAccount = logs
        .filter((log) => log.level === "DEBUG")
        .filter(
            (log) => log.account === "f80e65b7-6250-40ae-8a16-7c738aa70fd3"
        );
    expect(debugOfSpecificAccount).toHaveLength(81);

    const errorLogs = logs.filter((log) => log.level === "ERROR");
    expect(errorLogs).toHaveLength(229);

    const errorOfSpecificAccount = logs
        .filter((log) => log.level === "ERROR")
        .filter(
            (log) => log.account === "f80e65b7-6250-40ae-8a16-7c738aa70fd3"
        );
    expect(errorOfSpecificAccount).toHaveLength(75);
});

// po
test("application should store certain logs (assert object)", () => {
    const logStorageShould = new LogStorageAssertObject(logs);
    logStorageShould
        .haveAllLogsCount(1005)
        .and.haveDebugLogsCount(263)
        .and.haveCountOnlyForAccountId(
            "f80e65b7-6250-40ae-8a16-7c738aa70fd3",
            81
        )
        .and.haveErrorLogsCount(229)
        .and.haveCountOnlyForAccountId(
            "f80e65b7-6250-40ae-8a16-7c738aa70fd3",
            75
        );
});
```
