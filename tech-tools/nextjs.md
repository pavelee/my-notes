## Routing

-   Next.js jest oparty o routing "plikowy"
-   Standardowo w reactie potrzebujemy dodatkowej logiki do obsługi routingu
    -   instalujemy react-router czy inna biblioteke
    -   definiujemy ścieżki w kodzie
-   Next.js skanuje folder **pages** i buduje routing za nas!
    -   /pages/index.js -> home.pl/
    -   /pages/about.js -> home.pl/about
    -   /pages/products/index.js -> home.pl/products
    -   /pages/procucts/[id].js -> home.pl/products/1
-   Plik strony oczekuje tylko zwykłego komponentu. Komponent musi być domyślnie wyeksportowany
```js

const MyPage = () => {
    return <div>Moja strona!</div>
}

export default MyPage;

```
-   Ścieżki można zagnieżdzać
    -   np. /portfoilio/index.js -> home.pl/portfolio
    -   np. /portfoilio/list.js -> home.pl/portfolio/list
-   Zagnieżone ścieżki są świetnym sposobem organizacji logiki routingu aplikacji
-   Dynamiczne ścieżki oznaczamy kwadratowymi bracketami
    -   np. /test/[testid].js -> home.pl/test/1
    -   Istotne! Next.js priorytezuje bardziej konretne ścieżki (kolejność szukania ścieżki)
        -   np. /test/list.js > test/[testid].js
-   Dynamiczne ścieżki można zagnieżdzać w folderach
    -   np. /[id]/[clientid].js -> home.pl/1/42
-   Dynamiczne ścieżki można zapisać jako kolejkcje dowolnych parametrów
    -   np. /blog/[...slug].js -> home.pl/blog/ala/ma/kota
        -   To nam umożliwa pobranie router.query -> ['ala', 'ma', 'kota']

## Routing - wyciąganie dynamicznych parametrów

Dynamiczne parametry możemy wyciągnąć za pomocą hooka useRouter

```js
import { useRouter } from 'next/router';

const SomePage = () => {
    const router = useRouter();
    const { myDynamicParam } = router.query;

    return (<div>param { myDynamicParam }</div>)
}

```

## Routing - Linkowanie

Używanie tradycyjnych linków

```html
<a href="/somepage">jakiś link</a>
```

Niesie za sobą wady:

-   Tracimy efekt Single Page Apliaction, strona zostanie przeładowania
-   Tracimy state aplikacji! Może to być spory problem dla naszych komponentów

Powinniśmy używać linków od Next.js

```js
import Link from 'next/link';

const SomePage = () => {
    return (<Link href="/somepage">jakiś link</Link>)
}
```

Dodatkowo mechanizm optymalizuje czas ładowania strony, np. prefetching w momencie jak najeżdzamy na link itp.

## Routing - Budowanie dynamicznie linku

Dyniamiczny link możemy zbudować na dwa sposoby

```js
<Link href={`/somepage/${id}`}>link</Link>
```

lub

```js
<Link href={{ pathname: '/somepage/[id].js', query: {id: 1} }}>link</Link>
``` 

## Nawigacja za pomocą motod routera

```js
import { useRouter } from "next/Router";

const MySomeComponent = () => {
    const router = useRouter();

    const redirectWithPossibleBack = (path) => {
        router.push(path); // przekierowujemy do strony, możliwość cofnięcia się standardowym przyciskiem
    };

    const redirectWithNoBack = (path) => {
        router.replace(path); // przekierowujemy, bez możliwości cofnięcia się standardowym przyciskiem
    };

    // w przypadku przekierowania z parametrami

    const redirectWithParams = () => {
        router.push({
            pathname: "/somerouter/{id}/{id2}",
            query: {
                id: "test1",
                id2: "test2",
            },
        });
    };

    return <div>render something</div>;
};
```

## API

Next.js umożliwa tworzenie API działającego po stronie serwera node.js

Umożliwa nam to budowanie full-stackowej aplikacji korzystając tylko z tego frameworka

Aby to zadziałało musimy dodawać nasze strony (page) w katalogu api

Musi to być ścieżka **pages/api**

## Dodanie customowej strony 404

W folderze pages dodajemy plik **404.js**

```js
const NotFoundPage = () => {
    <div>My Custom Not Found Page</div>;
};

export default NotFoundPage;
```

## Uwierzytelnianie

Rekomendowana paczka https://next-auth.js.org

Jest to gotowa bilbioteka, gotowa integracja z Next.js

Instalacja:
```bash
npm install next-auth
lub
yarn add next-auth
```

## Baza danych - MongoDB

### Instalacja

Instalujemy paczke mongodb

```bash
npm install mongodb
lub
yarn add mongodb
```

### Definiowanie konektora

Dodajemy w projekcie plik db.js (lub dowolna inna nazwa)

```js
import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
    return async MongoClient.connect('connection string');
}
```

### Polaczenie w handlerze API

```js

import { connectToDatabase } from 'sciezka_do_pliku_dbjs';

async function handler(req, res) {
    const client = await connectToDatabase();
}

```

### Dodanie rekordu

```js

import { connectToDatabase } from 'sciezka_do_pliku_dbjs';

async function handler(req, res) {
    const client = await connectToDatabase();

    const db = client.db;

    db.collection('nazwa_kolekcji'); // tworzy się w locie jeśli nie istnieje
}

```