3:52 5. Zakończenie 37. Podsumowanie

Testowanie aplikacji zwraca się, łapiemy głupie błędy, zyskujemy czas
2:28 5. Zakończenie 37. Podsumowanie

Po kursie:

    Przeczytanie dokumentacji Jest

        Artykuły itp.

        Przykłady (Guides)

    Dokumentacja React Testing Library

        Przykłady

        Cheatsheet

2:48 4. Testowanie prawdziwej aplikacji 35. Testowanie listy i przycisku

Sprawdzanie ilości dzieci (wewnętrznych elementów) komponentu

    ...
    test("X", () => {
        ...
        expect(list.children.length).toBe(exectedLength);
    })

3:46 4. Testowanie prawdziwej aplikacji 34. Sprawdzanie error

Symulowanie błędu zwrotki API

    test("should display error on API error", () => {
        ...
        fetch.mockResponseOnce(null, { status: 500 }); // symulujemy zwrotkę 500 od serwera
        act(() => {
            render(<App />)
        })
        expect(screen.getByText(/Error.../)).toBeTruthy(); // oczekujemy informacji o błędzie ładowania
        // lub
        expect.assertions(1); // oczekujemy błędu na stronie
    })

0:11 4. Testowanie prawdziwej aplikacji 33. Funkcja act

Przykład użycia act()

    const { act, waitForElement } from ...
    test("X", async () => {
        fetch.mockResponseOnce(...) // mockujemy na wywołanie danych
        act(() => {
            render(<App />) // renderujemy w act ponieważ posiada state
        })
        expect(screen.getByTestId('loading'),toBeTruthy()) // na początek mamy stan ładowania
        await waitForElement(() => screen.getByTestId('list')) // czekamy na pojawienie się elementów z API backendu
        expect(screen.queryByTestId('loading'),toBeFalsy()) // następnie sprawdzamy czy element już nie występuje (po ładowaniu elementów)
    })

10:20 4. Testowanie prawdziwej aplikacji 32. Testowanie parent component

Jeżeli chcemy testować komponent który posiada zmianę state to musimy go owrapowac w komponent act()
8:55 4. Testowanie prawdziwej aplikacji 31. Argumenty funkcji mock

Aby sprawdzić w jaki sposób została wywołana funkcja mockujaca

    test("X", () => {
        await wait(() => {
            expect(movieCreated.mock.calls[0][0]).toStringEqual(movie); // hardcorowe sprawdzenie przekazanej wartości
            expect(movieCreated).toHaveBeenCalledWith(movie); // ładniejsza wersja tego samego sprawdzenia
        })
    })

4:41 4. Testowanie prawdziwej aplikacji 31. Argumenty funkcji mock

W przypadki kiedy nie chcemy robić dekonsturkta z obiektu render to możemy użyć globalnej zmiennej screen

    const { screen } = jest...
    ...
    screen.getByLabelText("X")

2:27 4. Testowanie prawdziwej aplikacji 31. Argumenty funkcji mock

Przykład zmiany wartości inputa

    test("X", () => {
        ...
        fireEvent.change(titleInput, { target: { value: "Title" } })
    })

2:54 4. Testowanie prawdziwej aplikacji 30. Mocking fetch

Mokowanie fetch przy pomocy paczki

instalujemy nową paczkę

    yarn add --dev jest-fetch-mock

W praktyce

    global.fetch = require('jest-fetch-mock');
    ...
    test("x", () => {
        ...
        fetch.mockResponse(JSON.stingify(movie)); // lub mockResponseOnce
    })

Więcej info na GitHub w pakiecie jest-fetch-mock
2:43 4. Testowanie prawdziwej aplikacji 30. Mocking fetch

Jest możliwe zamocowanie na tylko jedno wywołanie

    .mockImplementationOnce()

5:00 4. Testowanie prawdziwej aplikacji 29. spyOn i wait

Testowanie API request

    const { wait } = ...jest

    test("test", async () => {
        const updatedMovie = jest.fn();
        // sposób na mockowanie globalnych funkcji JS! :0
        jest.spyOn(global, "fetch").mockImplementation(() => {
            return Promise.resolve({
                json: () => Promise.resolve(movie)
            })
        })

        const { getByRole } = render(<Element updatedMovie={updatedMovie} />)
        const submitButton = getByRole("button", { name: /update/i })
        fireEvent.click(submitButton);
        // czekamy na wykonanie funkcji! To istotne aby to zadziałało!
        await wait(() => {
            expect(updatedMovie).toBeCalledTimes(1)
        })
    })

0:00 4. Testowanie prawdziwej aplikacji 29. spyOn i wait

W momencie jak chcemy zobaczyć co zwraca element w teście używamy debug

    debug(getByLabelTest(/title/i))

0:33 4. Testowanie prawdziwej aplikacji 27. Form elements

Testowanie formularza, nic szczególnego

    test("should display form elements", () => {
        const { getByLabelText } = render(<Element />);
        expect(getByLabelText(/title/i)).toBeTruthy();
        expect(getByRole('button', {name: /update/i})).toBeTruthy(); // sprawdzenie czy element button ma odpowiednia nazwę
        ...
    })

1:27 4. Testowanie prawdziwej aplikacji 26. Mocking

Możemy mocować zależności (np. odpytanie API)

    const loadMovie = jest.fn();
    const { container } = render(<MovieDetails movie={selectedMovie} updateMovie={loadMovie} />)
    const starts = container.querySelectorAll('.selektor')
    stars.forEach(start => {
        fireEvent.click(star);
    })
    setTimeout(() => { // obejście problemu "javascript nie czeka na nikogo"
        expect(loadMovie).toBeCalledTimes(5);
    })

1:02 4. Testowanie prawdziwej aplikacji 25. Testowanie mouse events

testowanie eventów np. mouseover

    const stars = container.querySelectorAll('.jakas-klasa')
    stars.forEach((star, index) => {
        fireEvent.mouseOver(start);
        const hightlightedstars = container.querySelectAll('.jakas-klasa-oznaczonych-gwiazek')
        expect(hightlightedstars.lenght).toBe(index + 1)
    })

12:51 4. Testowanie prawdziwej aplikacji 24. Sprawdzanie ratings

Sprawdzenie po zawartości HTML

    expect(getByTestId('no_ratings').innerHTML).toBe('oczekiwany html')

4:09 4. Testowanie prawdziwej aplikacji 24. Sprawdzanie ratings

Możemy użyć selektora aby znaleść element przez klasę

    const ss = container.querySelectorAll('.orange') // szukamy po klasie orange, zwraca nam node
    expect(ss.length).toBe(selectedMovie.avg_rating)

2:33 4. Testowanie prawdziwej aplikacji 23. Powinien wyświetlić tekst

queryByText umożliwia sprawdzanie czy komponent zawiera tekst

exepct(queryByText(object.title)).toBe('Expected text')
10:12 4. Testowanie prawdziwej aplikacji 22. Snapshot testing

jest test --watchAll - aby odpalić lokalnie w tybie odpalania testów w momencie zmiany plików
8:28 4. Testowanie prawdziwej aplikacji 22. Snapshot testing

snapshoty sa generowane w ramach potrzeby lub możemy usunać snapshoty

Jeżeli przegenerujemy snapshoty to mozemy "zapisać" poprawny stan komponentu
2:07 4. Testowanie prawdziwej aplikacji 22. Snapshot testing

Przykład snapshotu:

    test("should match the snapshot", () => {
        const { container } = render(<MovieDetails />)
        expect(container).toMatchSnapshot();
    })

0:00 4. Testowanie prawdziwej aplikacji 22. Snapshot testing

UnitTest - testujemy jednostkowo (jednostkę)
IntegrationTest - integrujemy funkcjonalność która posiada wiele elementów
SnapShots - zapisujemy do pamięci i zakładamy że przy wykonaniu ponownego testu będzie taki sam wynik
4:03 4. Testowanie prawdziwej aplikacji 21. Testy dla component

Dobrą praktyką jest nazywanie plików \*.test.js mimo że sa w folderze **tests**, to pomaga w rozróżnieniu w momencie jak plik jest na tabie IDE
4:09 3. React Testing Library 19. Zmienianie state

Testowanie state (jak zmienia się komponent)

    const input = getByRole('textbox')
    expect(input).toHaveValue('')
    fireEvent.change(input, { target: { value: 'Moja wartość' } })
    expect(input).toHaveValue('Moja wartość')

3:25 3. React Testing Library 19. Zmienianie state

getByRole może nie znaleść elementu input, wystarczy sparawdzić w outpucie jaki to element np. textbox
3:15 3. React Testing Library 18. Fire Event

Możemy przetetować event (interakcje z elementem)

    import { fireEvent } from '@testing-library/react';
    ...
    button = getByRole('button')
    fireEvent.click(button)

7:20 3. React Testing Library 17. Metody zaznaczania elementów

getByTestId - szuka elementu który posiada data-testid="hello". Dzięki temu mozemy znaleść element nie zależenie jaki to element HTML. To taki niewidoczny znacznik
1:39 3. React Testing Library 17. Metody zaznaczania elementów

Mamy trzy możliwości zaznaczania elementów:

    getBy (getAllBy) - zwraca element / błąd (jeśli brak). Nie nadaje się do sprawdzenia że element nie istnieje

    queryBy (queryAllBy) - zwraca nam element lub null. Umożliwia sprawdzenie czy element nie istnieje

    findBy (queryAllBy) - podobne do query, natomiast jest asynchroniczne. Możemy użyć aby poczekać na załadowanie danych.

    Więcej info na oficjalnej dokumetacji https://testing-library.com/docs/react-testing-library/cheatsheet#queries

6:00 3. React Testing Library 16. Info dostępne dla elementu

Mozemy też dekonstruować funkcje render (dla wygody)

const { getByText } = render(<Hello />)
4:19 3. React Testing Library 16. Info dostępne dla elementu

Autorzy RTL odradzaja testowanie state aplikacji, a skupiać się na tym co widzi użytkownik (generowany JSX czyli widok)
2:00 3. React Testing Library 16. Info dostępne dla elementu

Znaleziony element za pomoca metody np. getByText, posiada wiele atrybutów np.

    element.tagName
    element.textContent
    ...

6:56 3. React Testing Library 15. Pierwszy test z render

wrapper udostępnia API do pobierania tekstu (ktory powinnienen znalesc sie w kodzie komponentu) np.

    const text = wrapper.getByText('Hello World')
    expect(text).toByTruthy()

3:07 3. React Testing Library 15. Pierwszy test z render

Aby mieć podpowiedzi w VS code potrzebujemy wykonać:

npm i -D @types/jest lub analogicznie dla yarna
1:11 3. React Testing Library 15. Pierwszy test z render

Możemy debugować komponenty w teście np.

     const wrapper = render(<MojKomponent />)
    wrapper.debug()

6:53 3. React Testing Library 14. Test component

Uwaga! jeśli używamy Next.js to skonfiugurowanie testów -> https://nextjs.org/docs/testing
4:30 3. React Testing Library 14. Test component

Do testowania reacta importujemy z biblioteki @testing-library/react
7:51 3. React Testing Library 13. Wstęp do React Testing Library

react-scripts przychodzi ze wszystkimi zależnościami, typu Jest itp.
4:38 3. React Testing Library 13. Wstęp do React Testing Library

Tryb Jest --watchAll wykonuje automatycznie testy w momencie jak zmienimy coś w naszych plikach (podobnie jak hot reloading)
1:01 3. React Testing Library 13. Wstęp do React Testing Library

React testing Library to aktualnie najbardziej popularna metoda testowania reacta

React testing Library jest domyślnie instalowane w przypadku stawiania aplikacji poprzez react-app
1:54 2. Jest 12. Testowanie błędu

Możemy sprawdzić czy kod wyrzuci nam Error (wyjątek), w tym przypadku tego oczekujemy

expect(X).toThrow()

expect(X).toThrow(Error)

expect(X).toThrow("Oczekiwany opis błedu")

expect(X).toThrow(/RegEx/)
6:32 2. Jest 11. Truthy i Falsy

możemy też zaprzeczyć test używajać składni:

expect(X).not.toBe(Y)
4:16 2. Jest 11. Truthy i Falsy

Kolejne Matchery:

-   toBeNull
-   toBeDefined

-   toBeUndefined

-   toBeFalsy

-   toBeTruthy
    1:11

2. Jest
3. Truthy i Falsy

W js mamy wartości truthy i falsy, truthy to coś co po zrzuceniu do boolean daje nam true, a falsy przeciwnie

np. wartości falsy: 0, null, undefined, NaN, ""
4:58 2. Jest 10. Matchers

Inne Matchery:

-   toBeGreaterThan
-   toBeLessThanOrEqual

-   toMatch(regex)

-   toContain(ArrayElement)
    2:08

2. Jest
3. Matchers

ToBe sprawdza też typ danych

ToEqual sprawdza tylko wartość
0:30 2. Jest 10. Matchers

.toBe(...)

Jest nazywany Matcherem, bo to grupa metod
6:50 2. Jest 9. Pętle testów

Mozemy też przekazać array[array] aby przygotować wartości oraz oczekiwany wynik!

    const l = [[1, 2, 3], [1, 2, 3]]
    test.each(l)('Dodaj %i do %i', (x, y, wynik) => {})

2:54 2. Jest 9. Pętle testów

Możemy wstawić argument do opisu testu, używajac składni znanej z sprintf

test.each(Array)("Test %i", ...)

Gdzie pod %i wstawi się wartość która będzie wstrzykiwana do testu
2:40 2. Jest 9. Pętle testów

test.each(Array)('Nazwa', ArrayElement => {})

Umożliwia wykonywanie testu w petli dla kolekcji danych, analogicznie jak w PHPUnit mamy DataProvider
3:38 2. Jest 8. Skip, only i timeout

Globalne ustawienie timeoutu (dla wszystkich testów)

jest.setTimeout(3000)
2:54 2. Jest 8. Skip, only i timeout

Trzeci parametr test(), it() określa limit czasu na wykonanie testu w milisekundach 1000ms = 1s

test('Nazwa', ()=>{}, 2000)
1:31 2. Jest 8. Skip, only i timeout

test.skip(...

Umożliwia omijanie tylko wybranego pliku, przeciwieństwo .only
4:29 2. Jest 7. Before i after w praktyce

Możemy dodać

test.only(...

aby oznaczyć że tylko ten test ma być wykonany, wszystkie inne testy zostana pominięte

Jest to przydatne jeśli chcemy szybko uruchomić tylko wybrany test, a w tym samym pliku mamy wiecej np. 20 inny testów
3:01 2. Jest 7. Before i after w praktyce

BeforeEach, AfterEach jest praktyczne do resetowania danych testowych (izolacja, brak wypływu jednego testu na następny)
2:37 2. Jest 7. Before i after w praktyce

Aby test był wiarygodny musi być odizolowany
6:33 2. Jest 6. Przed i po testach

Każdy plik testowy to osobny scope zmiennych, jest to odizolowane
5:51 2. Jest 6. Przed i po testach

BeforeEach, AfterEach jest idealnym sposobem na przygotowanie danych testowych (zresetowanie) przed i po każdym teście
4:09 2. Jest 6. Przed i po testach

beforeAll(() => {})

przed wszystkimi

AfterAll(() => {})

po wszystkich
1:37 2. Jest 6. Przed i po testach

afterEach(() => {})

Analogicznie, po każdym teście <3
0:52 2. Jest 6. Przed i po testach

BeforeEach(() => {})

Umożliwia wykonanie konkretnej funkcji przed każdym testem, podobnie jak w phpUnit setUp()
3:52 2. Jest 5. Testowanie zmiennych i funkcji

Należy dodać więcej wywołań aby testy były bardziej precyzyjne
2:37 2. Jest 5. Testowanie zmiennych i funkcji

w expect możemy umieścić wywołanie funkcji, toBe to będzie oczekiwany efekt
0:02 2. Jest 4. Słowa kluczowe

Dobrą praktyka jest używanie it() w grupowaniu poprzez describe(), oraz test() w przypadku braku grupowania
5:01 2. Jest 4. Słowa kluczowe

można też użyć zapisu:

describe("Moja grupa", () => { it('1', () => {}); it('2', () => {}); })
2:30 2. Jest 4. Słowa kluczowe

funkcja describe pozwala nam na zgrupowanie testów np.

describe("Moja grupa", () => { test('1', () => {}); test('2', () => {}); })
1:49 2. Jest 4. Słowa kluczowe

Jest nie liczy ilości assertów, tylko samych funkcji test()
0:47 2. Jest 4. Słowa kluczowe

Możemy dodawać dowolną ilość funkcji test()
4:14

1. Wprowadzenie
2. Tworzenie środowiska

"scripts": { "test": "jest" }
7:47 2. Jest 3. Test runner

można też folder **tests**
5:00 2. Jest 3. Test runner

index.test.js lub index.spec.js, to niezbędne aby wykryto nas plik do testów
4:13

1. Wprowadzenie
2. Tworzenie środowiska

npm install -D jest
3:33

1. Wprowadzenie
1. Narzędzia testowania

React Testing Library pomaga laczyc sie z narzedziem jakim jest Jest
3:23

1. Wprowadzenie
1. Narzędzia testowania

Enzine? Inne narzędzie, @todo sprawdzić?
2:23

1. Wprowadzenie
1. Narzędzia testowania

Jest, framework
