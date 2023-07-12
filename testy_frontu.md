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
