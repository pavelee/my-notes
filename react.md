## Typowanie Reacta

- natywne i oficjalne wsparcie składni JSX przez TS
  - React tutaj ma przewagę nad np. Angular poniewż JSX jest natywnie kompilowany przez TS
- przykłady
  - JSX
  - komponenty i generyki
  - HOC-e
  - render props + generyki
  - union props

## React nodes vs JSXelements

- React nodes akceptuje prymitywy, natomiast JSXelements tylko React nodes

```js
const JSXElements: JSX.Element[] = [
  123, // bład kompilacji
  "label", // bład kompilacji
  <div />,
];

const ReactNodes: React.ReactNode[] = [
  123, // ok
  "label", // ok
  <div />,
];
```

## Typescript opcjonalne/wymuszone children w komponencie

```js
const WithoutChildren = ({ data }: MyProps) => <>{data}</>;
const without1 = <WithoutChildren data={123} />;
const without2 = <WithoutChildren data={123}>siema!</WithoutChildren>; // bła kompilacji
// np memo()

const RequiredChildren = ({
  data,
}: MyProps & { children: React.ReactNode }) => <>{data}</>;
const required1 = <RequiredChildren data={123} />; // bład kompilacji
const required2 = <RequiredChildren data={123}>siema!</RequiredChildren>;
```

## HOC - Higher Order Components

- Czym jest HOC? (Higher-Order Component)
  - TL;DR; (OOP) jest fabryką innych komponentów
  - (FP) jest jednym więcej poziomem domknięcia (closure)
  - który pozwala sparametryzować inne komponenty
- Przydatne kiedy chcemy zrobić coś wspólnego dla wielu komponentów np. logowanie, ładowanie, itp.

### w wersji TS / KLASA

```js
const _WithLoading = <P extends object>(Component: React.ComponentType<P>) =>
  class WithLoading extends React.Component<P & WithLoadingProps> {
    render() {
      const { loading, ...props } = this.props;
      return loading ? <Loader /> : <Component {...props as P} />;
    }
  };
```

### w wersji TS / FUNKCJA

```js
export const WithLoading = <P extends object>(Component: React.ComponentType<P>) => {
    const withLoading = (wrapperProps: P & WithLoadingProps) => {
        const { loading, ...props } = wrapperProps;
        return loading ? <Loader /> : <Component {...props as P} />;
    }
    withLoading.displayName = "WithLoading"
    return withLoading
}
```

## Render props

- TL;DR; to forma odwrócenia kontroli w Reakcie, który i tak odwraca kontrolę 🤓
- (bo zamiast bezpośrednio montować DOMa, produkuje VDOMa, a tym zajmuje się i później i kto inny)
- większa elastyczność ponieważ parent przekazuje jak ma wyglądać item

```js
interface ItemsListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode // 🔥 RENDER PROP
}

export function ItemsList<T extends { id: string | number }>(props: ItemsListProps<T>){
  const { items, renderItem } = props
  return <ul>
    // istotne tutaj to że item musi posiadać pole id bo extendujemy go w definicji
    { items.map( item => <li key={item.id}>{ renderItem(item) }</li> ) }
  </ul>
}
```

## Union props

- UNION PROPS
  - Czyli props, którego wartością jest UNIA (np. obiektów)
  - Zastosowanie mają reguły kompatybilności unii - czyli
  - wewnątrz komponent musimy sprawdzić, z którym elementem unii mamy faktycznie do czynienia

```js
export type CompanyEmployee = Manager | Developer;

interface EmployeeListingProps {
  employees: CompanyEmployee[];
}
export const CompanyEmployeeList = (props: EmployeeListingProps) => {
  const { employees } = props;
  return (
    <ul>
      {employees.map((e) => {
        if (e.type === "DEVELOPER") {
          return (
            <li key={e.id}>
              <DeveloperView developer={e} />
            </li>
          );
        } else if (e.type === "MANAGER") {
          return (
            <li key={e.id}>
              <ManagerView manager={e} />
            </li>
          );
        } else {
          return exhaustiveCheck(e, "Employee"); // SUPER! w ten sposób zabezpieczamy się przed niekompletną obsługą unii
        }
      })}
    </ul>
  );
};
```

## Inicjowanie stanu w komponencie i TS

W przypadku kiedy iniciujemy stan komponentu w hooku, np, useState. To jeśli w jakimś czasie jest pusty to lepiej go zdefiniować jako undefined zamiast używać np. pustego stringa

```js
const Component1 = () => {
  // const [value, setValue] = useState("")
  // const [value, setValue] = useState<string>("")
  const [value, setValue] = useState<string | undefined>() // może być undefined, to istotne!
}
```

## konwencje kodu w react

### Type vs Interface jako propsy

Powinniśmy używać inteface ponieważ jest bardziej wydajny

### (props) vs ({ rozpakowany_props })

Powinniśmy używać props ponieważ jest krótszy i łatwiej utrzymać spójność we wszystkich komponentach

### export vs export default

Odradza się export default. Default powoduje że zmieniamy nazwę komponetu w momencie importu, co jest niepożądane. Potem mamy różne nazwy w różnych komponentach.

Co istotnie ułatwia refactor!

## Snippety React w vsCode

wyszukiwarka -> snippets -> Snippets: Configure User Snippets -> typescript / react etc.

przykłady snippetów

```json
{
  "Import": {
    "prefix": "im",
    "description": "🙈 dawaj import!",
    "body": ["import { ${2} } from './${1}';", "$0"]
  },
  "Reducer-Arrow": {
    "prefix": "red",
    "description": "🙈 dawaj array.reduce/arrow!",
    "body": [
      "${1:collection}.reduce((${3:aggr}, ${2:item}) => ${5:newAggr}, ${4:initial})",
      "$0"
    ]
  },
  "Reducer-Return": {
    "prefix": "red-fn",
    "description": "🙈 dawaj array.reduce/return!",
    "body": [
      "${1:collection}.reduce((${3:aggr}, ${2:item}) => {",
      "  return ${5:newAggr}",
      "}, ${4:initial})",
      "$0"
    ]
  },
  "StyledComponent": {
    "prefix": "styl-comp",
    "description": "💅 styled-components",
    "body": [
      "import styled from 'styled-components';",
      "",
      "export const ${1:Component} = styled.${2:tag}`",
      "  $0color: green;",
      "`;",
      ""
    ]
  },
  "StyledComponentWithProps": {
    "prefix": "styl-comp-props",
    "description": "💅 styled-components with props",
    "body": [
      "import styled from 'styled-components';",
      "",
      "interface ${TM_FILENAME_BASE}Props {",
      "  ${3:color: string}",
      "}",
      "",
      "export const ${TM_FILENAME_BASE} = styled.${2:tag}<${TM_FILENAME_BASE}Props>`",
      "  $0color: ${props => props.color};",
      "`;",
      ""
    ]
  },
  "FunctionComponent": {
    "prefix": "func-comp-name",
    "description": "📦 function component (custom name)",
    "body": [
      "import React from 'react';",
      "",
      "  ${2:...}",
      "interface ${1:Component}Props {",
      "}",
      "",
      "export const ${1:Component}: React.FC<${1:Component}Props> = (${3:props}) => {",
      "  const ${4:{}} = props",
      "  return <>${5}</>",
      "}",
      "$0"
    ]
  },
  "FunctionComponentFileName": {
    "prefix": "func-comp-by-file",
    "description": "📦 function component (name from file)",
    "body": [
      "import React from 'react';",
      "",
      "interface ${TM_FILENAME_BASE}Props {",
      "  ${2:...}",
      "}",
      "",
      "export const ${TM_FILENAME_BASE}: React.FC<${TM_FILENAME_BASE}Props> = (${3:props}) => {",
      "  const ${4:{}} = props",
      "  return <>${5}</>",
      "}",
      "$0"
    ]
  }
}
```

## React cheatsheet

https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks

## CRA & App setup

### Cele setupu

- redukować pracę manualną
  - jeżeli są rzeczyw które mogę zautomatyzować, warto to zautomatyzować
- maksymalna automatyzacja
- łatwe aktualizacje w przyszłości
  - warto poczekać aż nowa wersja np. react wygrzeje się i będzie stabilna

### Co daje CRA

- scaffolding projektu oraz przyszłe aktualizacje
- oszczędność czasu
- projekt dojrzały, wspierany przez FB (meta)
  - nie chcemy opierać struktury komercyjnego projektu na jakimś projekcie z githuba
- optymalizacje produkcyjne
- optymalizacje developerskie (React Fast Refresh)
- minus: config webpacka jest ukryty
  - ale react-app-rewired/craco/customize-cra rozwiązują problem (CRACO = create-react-app-config-overrides)

### Webpack-bundle-analyzer

- wizualizacja codebase
  - pliki, rozmiary, bundle
- cele
  - monitorowanie zawartosci paczek
  - monitorowanie granic pomiędzy bundlami
  - weryfikowanie, czy dany import jest według zamierzeń dynamiczny
- setup
  - środowisko
  - numer/nazwa bundle

### Sprawdzenie skad mam zależność (pakiet)

```bash
npm ls NAZWA_PAKIETU
```

To pozwala zrozumieć skąd mam ten pakiet w node_modules (który pakiet go używa)

### Przeanalizowanie zależności przy pomocy madge

```bash
npx madge --json src/index.tsx
```

aby dodać też zależności node_modules

```bash
npx madge --json --include-npm src/index.tsx
```

### Struktura folderów, plików

- czynniki
  - szybkość znalezienia danego elementu w całym codebase
  - kolokacja: pliki które ze sobą współpracują powinny być blisko siebie (zmieniąją się razem)
    - wszystkie elementy obsługujące model biznesowy mieszkają razem
    - edytując konkretną funkcjonalność obszar po którym się poruszamy jest jak najmniejszy
    - mamy podpowiedź co również może wymagać zmiany
  - ile komponentów w jednym pliku?
    - jeżeli dany komponent występuje tylko w jednym większym komponentcie to dobrym pomysłem jest trzymanie go razem w tym samym pliku
  - lazy loading
    - jeśli pliki są rozrzucone po całym codebase to ładowanie ich na starcie aplikacji może być kosztowne
    - zawartość folderu pokrywa się z tym co jest ładowane w danym momencie

### Git hooks & husky

- cele

  - wyręczenie programisty w czynnościach powtarzalnych
  - fail-fast - szybkie wykrywanie błędów, kod z failującymi testami nie nadaje się na produkcję

- automatyczne uruchamianie dowolnych komend
  - testy auomatyczne
  - prettier
  - madge (cykliczne zależności)

#### Husky - super łatwy sposób na wymuszenie odpalenia testów przed commitem

Zainstaluj Husky jako zależność deweloperską:

```bash
npm install husky --save-dev
```

dev
Dodaj skrypt do pliku package.json, który będzie uruchamiał testy przed zatwierdzeniem zmian w kodzie:

````js
{
  "scripts": {
    "precommit": "npm run test"
  }
}
```

Dodaj konfigurację Husky do pliku package.json:

```js
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run precommit"
    }
  }
}
````

Ta konfiguracja uruchomi skrypt precommit przed każdym zatwierdzeniem zmian w kodzie.

Teraz, kiedy programista spróbuje zatwierdzić zmiany w kodzie, Husky uruchomi skrypt precommit, który z kolei uruchomi testy. Jeśli testy nie przejdą, Husky uniemożliwi zatwierdzenie zmian w kodzie.

Można również skonfigurować Husky do uruchamiania innych skryptów, takich jak formatowanie kodu lub sprawdzanie zależności.

## NVM - Node Version Manager

- pozwala na łatwe przełączanie się pomiędzy wersjami node
- przydatne kiedy obsługuje się wiele projektów z różnymi wersjami node

Musimy zainstalować nvm na naszym komputerze

Następnie poleceniem

```bash
nvm ls
```

możemy sprawdzić jakie wersje node mamy zainstalowane

i przełączyć się na inną wersje node

```bash
nvm use 14.15.4 # tutaj podajemy wersje którą chcemy użyć
```

oraz zainstalować nową wersje node

```bash
nvm install 14.15.4 # tutaj podajemy wersje którą chcemy zainstalować
```

przestawienie defaultowej wersji node

```bash
nvm alias default 14.15.4 # tutaj podajemy wersje którą chcemy ustawić jako default
```

## Storybook

- demo & dokumentacja użycia komponentu i jego wariantów
- story - pojdeynczy przykład użycia komponentu
- addons: interaktywność, testy, itp.

Nie jest to element aplikacji tylo katalog komponentów i dodatkowo narzędziem deweloperskim

Odpala nam się aplikacja w której możemy przeglądać komponenty z naszej aplikacji, bardzo wygodne to prezentacji i testowania

story book dla komponentu wygląda tak:

```js
import React, { ComponentProps } from 'react';

import { StoryFn, Meta } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'click' },
    disabled: { control: 'boolean' },
    variant: {
      table: {
        disable: true
      }
    }
  },
} as Meta;

const Template: StoryFn<ComponentProps<typeof Button>> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "PRIMARY",
  children: "Primary action",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "SECONDARY",
  children: "Secondary action",
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: "PRIMARY",
  disabled: true,
  children: "Primary action",
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: "OUTLINED",
  children: "Outlined action",
};
```

### Po co storybook

- implementacja komponentów w spearacji (Component-driven UI, bootom-up)
- wizualny, manualny osąd poprawności funkcjonalnej
- dokumentacja komponentów
- łatwiej wyelminować błedy w designie komponentów
- ułatwia ad-hoc testy na urządzeniach mobilnych
- ułatwia prace z UX oraz biznesem, bo możemy pokazać komponenty w izolacji i w czasie developmentu

### Koszty i trudności storybook'a

- config, deploy, aktualizacje
- porządkowanie, utrzymanie
- mockowanie zależności
- CPU

## Design system

- Atomic Design - taksonomia komponentów
  - atoms, molecules, organisms, templates, pages
  - atomy - najmniejsze elementy o jednej odpowiedzialności (np. button, label, ikona)
  - molekuły - grupy atomów (input + label)
  - oranizmy - grupy atomów i molekuł (formularz)

### Feature-Based Development

- grupowanie komponentów w oparciu o funkcjonalność np. formularz logowania

### Więcej na temat design systemów

https://www.componentdriven.org/
https://github.com/alexpate/awesome-design-systems
https://bradfrost.com/blog/post/atomic-web-design/

### Design komponentów - reużywalność

- reużywalny - używalny w wielu róznych miejscach
- reużywalność = mało odpowiedzialności
- reużywalność powinna wynikać z designu a nie być celem samym w sobie

### Design komponentów - błedy

- wiele odpowiedzalności
- za duży rozmar (performance)
  - przez to że jest duży to ma wiele powódów do re-renderu i jednocześnie duzy koszt renderowania
- wyciek obsługi stanu
  - przekazywanie settera do stanu zamiast callbacka który enkapsuluje logikę
- chaos w zależnościach
  - mieszanie danych z propsów, contextu, stanu, itp.
- wyciek stylów z rodzica do dziecka
  - np. przez użycie globalnych styli

## React & CSS

### Inline Styles

- plusy
  - prostota
  - brak zależności
- minusy
  - brak abstrakcji
  - duplikacja, wiele miejsc do zmiany
  - mieszany style, markup i logika

### Inline classes

- plusy
  - prostota
- minusy
  - globalne style albo BEM
  - nadal duplikacja
  - mieszanie styli, markupu i logiki

### CSS Modules

- plusy
  - lokalne style
  - łatwe do zaimplementowania
  - łatwe do zrozumienia
- minusy
  - ?

### CSS in JS

- plusy
  - abstrakcja: ostylowany komponent
  - osobno: style, markup, logika
- minusy
  - zależność 3-rd party
  - podnosi próg wejścia (nieznacznie)

## Optymalizacja Reacta

### Pamiętaj!

- Make it work - najpierw zrób to działa
- Make it right - dopiero potem zrób to dobrze
- Make it fast - dopiero potem zrób to szybko

### 3 powody renderowania komponentów

- zmiana stanu
- renderowanie rodzica
- zmiana kontekstu

### Children - najważniejsza optymalizacja

- Poprzez przekazywanie children możemy uniknąć niepotrzebnych re-renderów
  - ponieważ children jest renderowany wewnątrze komponentu rodzica

### Memo

- Memo powstrzymuje rendery przychodzące od rodzica jeśli NIE zmieniły się propsy
- memo w połaczeniu z "children" często nie działa (zmiana refencji obiektu)
- memo wobec zmian kontekstu i stanu lokalnego nie działa
- jeśli rodzic nie zapewnia "refential equality" to memo nie zadziała
- przekazywane do memo propsy zmieniają się w trakcie developmentu (trudne do śledzenia)

- Dobrzy kandydaci na memo
  - komponenty zawierające sporo markupu
  - statyczne komponenty typu Header, Fotter, itp.

### useMemo - memoizacja wartości

- unikanie zbędnych obliczeń poprzez zapamiętywanie wyników
- unikanie zbędnych re-renderów poprzez stabilne referencje (refential equality)

### useCallback - memoizacja funkcji

Analogicznie do useMemo, ale dla funkcji

### Używanie key jako tożsamości komponentu

kiedy chcemy wymusić re-render komponentu, np. po zmianie stanu

```js
<TextTaskView
  key={currentTask.id} // przekazanie key spowoduje zmiane tożsamości komponentu i zresetowanie stanu
  task={currentTask}
  onAnswerChange={action("answer changed")}
/>
```

### Lazy loading

- dynamic import + ewentualne kombinacje na promisach

```js
if (condition) {
  import("plik").then((module) => {
    // ...
  });
}
```

- React.lazy + Suspense

```js
const Component = React.lazy(() => import("./Component"));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);
```

### Analiza i profilowanie

- react dectools components: hilghlight updates
- react dectools profiler
- CPU throttling
- newtwork throttling

## Testowanie reacta

### JS dom

- emulowane środowisko DOM w node.js
- DOM jest resetowany per plik a nie per test
  - wynika to z faktu że wygenerowanie DOMa jest kosztowne (nawet 100ms)
- JS dom nie obsługuje
  - multimedia: audio, video
  - nawigacja klawiaturą
  - nawigacja (location.href)
  - layout/CSS (np. getBoundingClientRect, offsetTop)

### Filizofia RTL - React Testing Library

- Publicznym API komponentu:
  - nie są metody, propsy, stan, refy
  - jest to co widzi użytkownik
- Testowanie szczegółów implementacyjnych prowadzi do częstych zmian testów (strata czasu)
- Wrappery zbędne - posługujemy się natywnym API DOMa

### Przykładowy test

```js
test.skip("ExamView", () => {
  it("should display exam content", async () => {
    // given
    const {
      findByText,
      findByRole,
      getByText,
      getByLabelText,
      debug,
      container,
    } = render(<ExamProcess />);

    await findByText("Please click start to begin your exam.");
    const startBtn = await findByRole("button", { name: "Start exam" });

    // when
    fireEvent.click(startBtn);

    // pojechali!

    getByText("Czy chrapiesz w nocy?");
    // debug() // Uwaga! Tutaj możemy zdebugować co zwraca komponent! Sweet!

    const nextBtn = await findByRole("button", { name: "Next task" });
    fireEvent.click(nextBtn);

    // następne pytanie - proszę!

    const kacInput = getByLabelText("Kiedy ostatni raz miałeś kaca?");
    fireEvent.change(kacInput, { target: { value: "ło panie!" } });

    fireEvent.click(nextBtn);

    getByText("Gdybyś miał być psem, to jakim?");

    const finishBtn = await findByRole("button", { name: "Finish exam" });
    fireEvent.click(finishBtn);

    expect(container).toHaveTextContent("Exam completed!");
  });
});
```

### RTL API - konwencja nazewnictwa

- getByRole - szukanie po roli
- getByLabelText - szukanie po labelu
- getByText - szukanie po tekście
- getByPlaceholderText - szukanie po placeholderze
- getByAltText - szukanie po alt
- getByTitle - szukanie po title
- getByDisplayValue - szukanie po wartości pola formularza
- getByTestId - szukanie po atrybucie data-testid
- getBy - szukanie po selektorze CSS
- queryBy - to samo co getBy ale zwraca null jeśli nie znajdzie
- findBy - to samo co getBy ale zwraca promise
- getAllBy - to samo co getBy ale zwraca tablicę
- queryAllBy - to samo co getAllBy ale zwraca null jeśli nie znajdzie
- findAllBy - to samo co getAllBy ale zwraca promise

https://testing-library.com/docs/dom-testing-library/cheatsheet/

### Testowanie DOM - typowe błędy

- test usztywnający się na konkretną strukturę DOM
- test usztywnający się na jakiekolwiek niepubliczne detale implementacyjne
- nawanie tego samego test-id w wielu miejscach

### Testowanie DOM - tips

- get*/query*/find\* - jako implicite asercje

```js
expect(getByText("siema")).toBeInTheDocument();
getByText("siema"); // zwraca element lub rzuca wyjątek
```

- "wyrywkowe" wyszukiwanie tekstu

```js
getByTest("siema", { exact: false }); // szuka tekstu który zawiera "siema"
```

- role zamiast test-id

```js
getByRole("button", { name: "siema" });
```

- @testing-library/user-event zamiast natywnych fireEvent

```js
fireEvent.change(input, { target: { value: "siema" } });
userEvent.type(input, "siema");
```

### TDD a react

TDD - Test Driven Development (red-green-refactor)

- red - napisz test który nie przechodzi
- green - napisz kod który sprawi że test przejdzie
- refactor - popraw kod
- repeat

## Zarządzanie stanem - hooki i context

### Model aktywny vs reaktywny

- Aktywny - zmiana stanu jest inicjowana przez programistę
- Reaktywny - zmiana stanu jest inicjowana przez framework

Użycie zależy od przypadku. Jeśli mamy mało zależności możemy użyć aktywnego modelu ale z rozrostem aplikacji lepiej użyć reaktywnego

### Stan współdzielony vs prywatny

- Stan współdzielony - stan który jest współdzielony przez wiele komponentów
- Stan prywatny - stan który jest używany tylko wewnątrz komponentu

Jeśli to możliwe lepiej używać stanu prywatnego, ponieważ jest to łatwiejsze do zrozumienia i testowania. Powoduje że komponent posiada mniej zależności.

### Stan centralizowany vs rozproszony

- Stan centralizowany - stan który jest przechowywany w jednym miejscu
  - single source of truth
  - wiadomo kogo subskrybować
  - wiele miejsc od niego zależy
- Stan rozproszony - stan który jest przechowywany w wielu miejscach
  - jedna odpowiedzialność
  - konsument może potrzebować subksrybować wiele źródeł
  - mniej miejsc od niego zależy

### Zmiana stanu direct (update) vs indirect (event)

- Direct
  - wiem co się stało i jak to obsłużyć
    - useState
    - callbacks
- Indirect - zmiana stanu jest inicjowana przez użytkownika
  - wiem co się stało ale nie wiem jak to obsłużyć (ktoś inny to robi)
    - useReducer
    - redux
    - xstate

## Reacktowe hooki

### Reguły hooków

- hooki tylko w komponentach funkcyjnych
- hooki muszą być wywoływane na samej górze funkcji komponentu
- komponent musi mieć stałą ilość i kolejność hooków

### Hooki

- Hooki nie mogą blokować renderowania ale rerendry mogą wymuszać

- UseState
  - zmiana stanu direct
  - aktualizacja stanu do nowej wartości
    - ```js
      const [state, setState] = useState(initialState);
      setState(value);
      ```
  - aktualizacja stanu w oparciu o poprzednią wartość
    - jest to zalecane kiedy wykonujemy wiele aktualizacji stanu w jednym renderze, to się kolejkuje i nie mamy buga z nieaktualnym stanem
    - kiedy budujemy stan na podstawie poprzedniego stanu
    - ```js
      const [state, setState] = useState(initialState);
      setState((prevState) => {
        return prevState + 1;
      });
      ```
  - liczaba potencjalnych callbacków jest spora, więc jesli chcemy zrobić coś w stylu redux thunk to lepiej użyć useReducer
  - Dobry kiedy mamy przypięty do komponentu mały stan (prymityw)
- UseReducer
  - zmiana stanu indirect (obiekt akcji)
    - aktualizacja stanu do nowej wartości
      - ```js
        const [state, dispatch] = useReducer(reducer, initialState);
        dispatch({ type: "increment" });
        ```
  - liczba callbacków jest zawsze stała (1), więc jeśli mamy dużo akcji to lepiej użyć useReducer -> dispatch
  - Dobry kiedy mamy przypięty do komponentu duży stan (obiekt)
- useMemo
  - unikanie drogich obliczeń
  - unikanie rerenderów w skutek zmiany referencji
- useCallback
  - unikanie rerenderów w skutek zmiany referencji
- useEffect
  - wykonywanie efektów ubocznych (side effects)
  - reakcje na zmiany wartości (np. data sync / reset innego lokalnego stanu)
  - unsubscribe / cleanup
  - ```js
    useEffect(() => {
        const subscription = props.source.subscribe();
        return () => { // ISTOTNE! clean up np. zamknięcie subskrypcji
            subscription.unsubscribe();
        };
    }); // przy KAŻDYM renderze
    }[]); // tylko INICJALNIE
    }[dependecy]); // po ZMIANIE zależności
    ```
- useLayoutEffect
  - to samo co useEffect ale synchronicznie (blokuje render)
  - używamy kiedy chcemy coś zrobić synchronicznie przed renderem
  - wąskie zastosowanie np. mierzenie szerokości elementu, animacje
- useRef
  - referencja do elementu DOM
  - referencja na mutwalne wartości
  - ucieczka z reaktywności, react nie zareaguje na zmiany
  - pozwalają np. na focus na input
  - aby zintegrować się z bibliotekami 3rd party (pomost pomiedzy react a biblioteką)
  - ```js
    const ref = useRef(initialValue);
    ```
- forwardRef
  - przekazywanie refa do komponentu funkcyjnego
  - ```js
    const component = React.FrowardRef((props, ref) => {
      return <div ref={ref} />;
    });
    <Component ref={ref} />; // ten ref trafi do komponentu rodzica
    ```

### Uwagi do hooków!

- W przpyadku useEffect pierwszy odpali się u dzieci a potem u rodzica!

### Co to stan?

Stan jest zależnością dla komponentu. Jest powodem, dla którego komponent się renderuje.

### Wzroce projektowe

- provider-consumer
- publisher-subscriber
- mediator

## Dobieraine kolorów (wsparcie)

https://colorhunt.co/
https://coolors.co/
https://color.adobe.com/pl/create/color-wheel
https://www.npmjs.com/package/color

## React Portals

### Ogólnie

W przypadku kiedy chcemy wyrenederować JSX w dowolnym miejscu aplikacji ale bez potrzeby wstrzykiwania tam komponentu

Przydatne w przypadku jakiś globalnych komponentów

### Wykrzytanie

W dowolnym miejscu aplikacji możemy dodać element root'owy dla Portalu

```js

...
<div id="modals"></div>
...

```

Natępnie tworzymy nasz Portal, w tym przypadku miechanizm popup'u

```js

const ReactDOM from 'react'

const Popup = () => {

    return ReactDOM.createPortal((
        <SomeModalComponent />
    ), document.getElementById('modals')) // drugi argument to wskaźnik na element do którego tworzymy portal

}

```

## Context

### Do czego context?

- Context-Provider-Sate
- Context jako stan
- stan
  - natwyny useReducer lub useState
  - właność: Context.Provider

### React Context API

- eleminacja props drilling
- zmniejszenie copulingu pomiędzy komponentami
- mockowanie pod testy potencjalnie kosztowne
- performence - częstę/nadmiariowe renderowanie

### Błedne wykorzystanie Context API

- Context z własnymi komponentami (w środku) - niewydajne - zawsze rerender w momecnie zmiany kontekstu
  - rozwiązaniem jest przekazywanie children do Context.Provider
    - children jest rerenderowany tylko jeśli subksrybuje kontekst!

### Context scope

- kontekst globalny
  - dostępne globalnie dla wszystkich
- kontekst modułowy
  - dostępne dla wszystkich komponentów w module (jakiś obszar)
- kontekst zależny
  - kontekst zależny od innego kontekstu, np. modułowy od typu konta

### Domyślna wartość contextu

- wykorzystywana gdy subksrybujący komponent jest poza providerem
- na ile jest przydatna?
  - rzadko udaje się stworzyć sensowne defaulty
  - zazwyczaj nie ma gdzie ich podpiąć
- zalecane rozwiązanie ustawić domyślną wartość na undefined, dzięki temu komponent poza providerem nie dostanie niczego sensowego

### Dedykowany hook do użycia contextu

```js
const useMyContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    // dzięki temu nie dostaniemy undefined tylko error <3
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
```

### Performance

- problem
  - context powoduje rerender wszystkich subskrybujących komponentów, częściej niż potrzeba
- dodatkowo
  - destructuring contextu nie blokuje renderu
  - memo nie obroni konsumenta przed rerenderem
- rozwiazania
  - memoizacja zawartości kontekstu
  - rozbicie kontekstów techniczne, np. osobne providery na settery i gettery
  - rozbicie komponentów na mniejsze, connected, memoizowane (presentional)
  - rozbicie konekstów, klucz: oddzielić dane zmieniające się razem i/lub często
  - useMemo/ReactNode
    - rodzic subskrybuje kontekst, dziecko cachuje przy pomocy useMemo
- Kiedy warto optymalizować?
  - da się zauważyć że aplikacja działa wolno
  - profiler pokazuje że to problem rerenderu powiazanego z kontekstem
  - kontekst ma wielu subskrybentów

### Testowanie Context API

- testowanie kontekstu jest trudne

#### W jaki sposób możemy testować kontekst?

- testowanie komponentów subskrybujących kontekst

  - starajmy się używać realnych komponentów z aplikacji, w kontekście jakieś funkcjonalności

- testujemy konteksty, faktycznie tak jak są używane
- testujemy konteksty integracyjnie

### Context-Provider-State vs Redux

- Redux
  - scentralizowany
  - single source of truth
    - to ogranicza na przyszłość
  - bardzo wydajny out-of-the-box
  - narzuca ścisłą konwencje
  - narzauca event storming
  - debugowalność + redux-devtools
  - narzut kodu na obsługę kodu, reducerów, selektorów
    - Tutaj możemy użyć redux-toolkit aby było mniej bolierplaitu
  - częste błędy
    - wrzucanie zbyt dużo info do reduxa
    - niewłaściwa granualność akcji/częstotliwość akcji
    - "you might not need Redux" (w przyszłości chcesz zmiana architektury)
- Context-Provider-State
  - rozproszony
  - pełna dowolność
  - o wydajność trzeba zadbać samemu
  - nie narzuca stylu ani rozwiązania
  - brak narzędzi do debugowania
  - narzut kodu na pisanie rozwiązać from scratch
  - częste błędy
    - kontekst o zbyt wielu odpowiedzalnościach
    - chaos w organizacji i zarządzaniu zależnościami
    - choos w testach

### Ogólnie

Wykorzystujemy Context API

- do obsługi wide-state - globalny state w aplikacji
  - komunikacja komponentów odległych w drzewie DOM
  - ominięcie problemu props-drilling
- jest to natywny mechanizm reacta
- zwykle context zbieramy w folderze store (jako wydzielony store komponentów)

### Wykorzystanie

dodajemy context, najlepiej w osobnym pliku

```js
import { createContext, useState, useEffect } from 'react';

// tworzymy kontest, gdzie argumentem jest domyślny stan kontekstu
// w przypadku przekazywanych funkcji dajemy tylko sygnature aby mieć przydatne podpowiedzi od IDE
const MyContext = createContext({
    test: null,
    doSomething: (value) => {} // wystarczy sama sygnatura, bez ciała
});

// tworzymy funkcje, providera contextu. Jest to wygodny sposób na stworzenie "warstwy" dostarczenia kontekstu.
// możemy tutaj dodać funkcje które operują na kontekście lub nawet hooki typu useEffect (w momencie jak coś się zmieni)
export const MyContextProvider = ({ children }) => {
    const [test, setTest] = useState();

    const doSomething = function(value) {
        return value;
    }

    // możemy tutaj zapiąć jakieś funkcjonalności jeśli zmienia się context! fajne!
    useEffect({
        console.log('changed!');
    }, [
        test
    ])

    return (
        <MyContext.Provider value={
            test,
            doSomething
        }>
            { children }
        <MyContext.Provider/>
    )
}

export default MyContext;
```

Wrapujemy komponenty, tak wysoko jak to potrzebne, np. cała aplikacja

```js
import { MyContextProvider } from './store/MyContext';

...

<MyContextProvider>
    <App />
</MyContextProvider>

```

Następnie zaczynamy używać kontekstu w zaintersowanych komponentach

```js
import { useContext } from 'react'
import MyContext from './store/MyContext';

const SomeComponent = () => {
    const mc = useContext(MyContext);

    const executeDoSometing = () => {
        mc.doSomething();
    }

    ...
}

```
