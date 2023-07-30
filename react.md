## Typowanie Reacta

-   natywne i oficjalne wsparcie składni JSX przez TS
    -   React tutaj ma przewagę nad np. Angular poniewż JSX jest natywnie kompilowany przez TS
-   przykłady
    -   JSX
    -   komponenty i generyki
    -   HOC-e
    -   render props + generyki
    -   union props

## React nodes vs JSXelements

-   React nodes akceptuje prymitywy, natomiast JSXelements tylko React nodes

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

-   Czym jest HOC? (Higher-Order Component)
    -   TL;DR; (OOP) jest fabryką innych komponentów
    -   (FP) jest jednym więcej poziomem domknięcia (closure)
    -   który pozwala sparametryzować inne komponenty
-   Przydatne kiedy chcemy zrobić coś wspólnego dla wielu komponentów np. logowanie, ładowanie, itp.

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

-   TL;DR; to forma odwrócenia kontroli w Reakcie, który i tak odwraca kontrolę 🤓
-   (bo zamiast bezpośrednio montować DOMa, produkuje VDOMa, a tym zajmuje się i później i kto inny)
-   większa elastyczność ponieważ parent przekazuje jak ma wyglądać item

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

-   UNION PROPS
    -   Czyli props, którego wartością jest UNIA (np. obiektów)
    -   Zastosowanie mają reguły kompatybilności unii - czyli
    -   wewnątrz komponent musimy sprawdzić, z którym elementem unii mamy faktycznie do czynienia

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

### Ogólnie

Wykorzystujemy Context API

-   do obsługi wide-state - globalny state w aplikacji
    -   komunikacja komponentów odległych w drzewie DOM
    -   ominięcie problemu props-drilling
-   jest to natywny mechanizm reacta
-   zwykle context zbieramy w folderze store (jako wydzielony store komponentów)

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
